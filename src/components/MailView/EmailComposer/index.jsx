import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { getS3Url } from '../../../utils/teacherApplication';
import { FilePicker } from 'react-file-picker';
import { toast } from 'react-toastify';
import arrayMutators from 'final-form-arrays';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Field, Form, useForm } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  getAllEmailDraftsOfUser,
  getAllEmailThreadsByUser,
  saveEmailDraft,
  sendEmail
} from '../../../api/emailMessaging';
import useValidationSchema from '../../../hooks/use-validation-schema';
import AutocompleteInput from '../AutocompleteInput';
import editorProps from './editorProps';
import { fields } from './fields';
import SelectedRecipients from './SelectedRecipients';
import validator from './validator';
import { ContentState } from 'draft-js';
import { setActiveDraft, toggleEmailComposer } from 'redux/actions/mailView';
import { FieldArray } from 'react-final-form-arrays';
import S3 from 'aws-s3-pro';
import { s3Config } from '../../../config';
const s3Client = new S3(s3Config);

const FileAttachmentWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  grid: 1fr / auto-flow 1fr auto;
  & > div:first-child {
    display: grid;
    gap: 0.5rem;
  }
  & > *:nth-child(2) {
    margin-top: auto;
  }
`;
export const FileAttachment = props => {
  const { fields, viewOnly = false } = props;

  const handleChange = async f => {
    console.log(f);
    try {
      fields.push(f);
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 44 ~ handleChange ~ error', error);
    }
  };

  const handleClickRemoveFile = async i => {
    fields.remove(i);
  };

  return (
    <FileAttachmentWrapper>
      <div>
        {fields?.value?.map((val, i) => (
          <a
            href={val.name ? URL.createObjectURL(val) : getS3Url(val)}
            target="_blank"
            rel='noreferrer'
            download={val.name || val}
            key={val.name || val}
            style={{
              display: 'grid',
              grid: '1fr / minmax(100px, 200px) min-content',
              gap: '0.5rem',
              minWidth: 0
            }}
          >
            <div
              style={{ minWidth: 0 }}
              className='badge badge-secondary d-flex align-items-center justify-content-left text-truncate text-nowrap btn'
            >
              {val.name || val}
            </div>
            {!viewOnly && (
              <button
                onClick={e => {
                  e.preventDefault();
                  handleClickRemoveFile(i);
                }}
                type='button'
                style={{ minWidth: 0 }}
                className='btn btn-sm btn-light'
              >
                <i className='fa fa-close' aria-hidden='true' />
              </button>
            )}
          </a>
        ))}
      </div>

      {!viewOnly && (
        <FilePicker maxSize={25} onChange={handleChange} onError={() => {}}>
          <button
            onClick={e => e.preventDefault()}
            type='button'
            disabled={fields?.value?.length > 4}
            className='btn btn-sm btn-info'
          >
            <i className='fa fa-paperclip mr-2' aria-hidden='true' />
            Attach files
          </button>
        </FilePicker>
      )}
    </FileAttachmentWrapper>
  );
};

const LoadingIndicatorContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  z-index: 100;
  display: ${({ show }) => !show && 'none'};
  pointer-events: ${({ show }) => !show && 'none'};
`;
const LoadingIndicator = ({ show }) => {
  return (
    <LoadingIndicatorContainer show={show}>
      <div className='spinner-border text-secondary' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </LoadingIndicatorContainer>
  );
};

export const Container = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  /* padding: 10px 20px; */
  gap: 20px;
  position: relative;
`;

// todo control editor input
// todo control editor input

export const EmailComposerInputFields = styled.div`
  /* padding: 10px 20px; */
  display: grid;
  gap: 10px;
  flex-grow: 0;
  & input {
    height: 34px;
    border: none;
    border-radius: 4px;
    background-color: white;
    box-shadow: none;
    /* z-index: 2; */
  }
`;

const StyledButton = styled.button`
  width: min-content;
  white-space: nowrap;
`;
const EditorContainer = styled.div`
  position: relative;
`;
const ButtonContainer = styled.div`
  display: grid;
  grid: 1fr / auto-flow;
  & > button:nth-child(2) {
    margin-left: auto;
  }
`;

const AutocompleteResultWrapper = styled.div`
  display: grid;
  grid: 1fr / auto-flow auto 1fr;
  gap: 0.5rem;
  align-items: center;
  img {
    object-fit: cover;
    object-position: center;
    height: 2rem;
    width: 2rem;
    border-radius: 9999px;
  }
`;
const StyledInput = styled.input`
  padding: 10px;
`;

const CustomEditor = ({ input, activeDraft }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(''))
  );

  useEffect(() => {
    if (activeDraft)
      setEditorState(
        EditorState.createWithContent(convertFromRaw(activeDraft.mailContent))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDraft?.mailContent]); // add 'value' to the dependency list to recalculate state when value changes.

  const { change } = useForm();

  const handleEditorStateChange = newState => {
    setEditorState(newState);
    change(input.name, newState);
  };

  return (
    <Editor
      defaultEditorState={editorState}
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      {...editorProps}
    />
  );
};
export const formatEmailFormValues = values =>
  values
    ? {
        ...values,
        [fields.mailReceiver.name]: values[fields.mailReceiver.name]?.map(
          mr => mr?.senderId
        ),
        [fields.mailContent.name]: convertToRaw(
          values[fields.mailContent.name].getCurrentContent()
        )
      }
    : null;

function EmailComposer({
  initialValues = {
    [fields.mailSubject.name]: '',
    [fields.mailReceiver.name]: [],
    [fields.carbonCopy.name]: [],
    [fields.blindCarbonCopy.name]: [],
    [fields.mailAttachments.name]: []
  },
  handleSuccess
}) {
  const [savingDraft, setSavingDraft] = useState(false);
  const autocompleteSuggestions = useSelector(state => state.mailView.emailThreads.data);
  const dispatch = useDispatch();

  const fetchAutocompleteSuggestions = () => {
    if (!autocompleteSuggestions.length) getAllEmailThreadsByUser(dispatch);
  };
  const FieldLabel = styled.h5``;

  const validate = useValidationSchema(validator);

  const submitDraft = async (values, initialize) => {
    let requestPayload = formatEmailFormValues(values);
    let mailAttachments = [];
    try {
      setSavingDraft(true);
      if (values.mailAttachments && values.mailAttachments.length)
        mailAttachments = await Promise.all(
          values.mailAttachments.map(file =>
            file.name ? s3Client.uploadFile(file, file.name).then(({ key }) => key) : file
          )
        );
      console.log(
        '🚀 ~ file: index.jsx ~ line 247 ~ submitDraft ~ mailAttachments',
        mailAttachments
      );
      requestPayload = { ...requestPayload, mailAttachments };
      const { threadId, messageId } = await saveEmailDraft(dispatch, requestPayload);
      toast('Draft Saved.', { type: 'info' });
      initialize({
        ...values,
        mailAttachments: [mailAttachments],
        [fields.threadId.name]: threadId,
        [fields.messageId.name]: messageId
      });
      getAllEmailDraftsOfUser(dispatch);
    } catch (error) {
      let errMsg = '';
      if (error.response) {
        errMsg = `Error: invalid request (${error.response.status})`;
      } else if (error.request) {
        errMsg = 'Error: no response from the server';
        console.log(error.request);
      } else {
        errMsg = 'An unexpected error occurred';
      }
      console.log(error);
      toast(errMsg, { type: 'info' });
    } finally {
      setSavingDraft(false);
      dispatch(setActiveDraft(null));
      dispatch(toggleEmailComposer(false));
    }
  };

  const submit = async values => {
    let requestPayload = formatEmailFormValues(values);
    let mailAttachments = [];
    try {
      if (values.mailAttachments && values.mailAttachments.length)
        mailAttachments = await Promise.all(
          values.mailAttachments.map(file =>
            file.name ? s3Client.uploadFile(file, file.name).then(({ key }) => key) : file
          )
        );
      requestPayload = { ...requestPayload, mailAttachments };
      await sendEmail(dispatch, requestPayload);
      if (handleSuccess) handleSuccess(requestPayload);
      else {
        getAllEmailThreadsByUser(dispatch);
      }

      toast('Email Sent Successfully', { type: 'success' });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 305 ~ error', error);
      let errMsg = '';
      if (error.response) {
        errMsg = `Error: invalid request (${error.response.status})`;
      } else if (error.request) {
        errMsg = 'Error: no response from the server';
        console.log(error.request);
      } else {
        errMsg = 'An unexpected error occurred';
      }

      toast(errMsg, { type: 'error' });
    }
  };
  const userAccountId = useSelector(state => state.auth?.user?.accountId);
  // eslint-disable-next-line eqeqeq
  const isNotLoggedInUser = ({ senderId }) => senderId != userAccountId;
  const activeDraft = useSelector(state => state.mailView.activeDraft);

  return (
    <Form
      validate={validate}
      mutators={{
        // potentially other mutators could be merged here
        ...arrayMutators
      }}
      initialValues={{
        ...initialValues,
        [fields.mailContent.name]: EditorState.createEmpty()
      }}
      onSubmit={submit}
      render={({
        handleSubmit,
        hasValidationErrors,
        submitting,
        form: { initialize },
        dirty,
        values
      }) => (
        <Container onSubmit={handleSubmit}>
          <LoadingIndicator show={submitting} />
          <EmailComposerInputFields>
            <FieldLabel>{fields.mailReceiver.label}</FieldLabel>
            <AutocompleteInput
              items={_.filter(
                _.uniqBy(autocompleteSuggestions, 'senderId'),
                isNotLoggedInUser
              )}
              formatResult={item => (
                <AutocompleteResultWrapper>
                  <img
                    alt={item.sender}
                    src={
                      (item.senderPhoto?.length && item.senderPhoto) ||
                      './assets/images/image-placeholder.jpg'
                    }
                  />
                  <div>{item.sender}</div>
                </AutocompleteResultWrapper>
              )}
              fuseOptions={{ keys: ['sender'] }}
              onFocus={fetchAutocompleteSuggestions}
              resultStringKeyName='sender'
              styling={{
                height: '34px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: 'white',
                boxShadow: 'none'
              }}
              {...fields.mailReceiver}
            />
            <SelectedRecipients />
            <FieldLabel>{fields.mailSubject.label}</FieldLabel>
            <Field name={fields.mailSubject.name}>
              {props => <StyledInput {...props.input} {...fields.mailSubject} />}
            </Field>
          </EmailComposerInputFields>
          <EditorContainer>
            <Field
              name={fields.mailContent.name}
              activeDraft={activeDraft}
              component={CustomEditor}
            />
          </EditorContainer>
          <FieldArray name={fields.mailAttachments.name} component={FileAttachment} />
          <ButtonContainer>
            <StyledButton
              disabled={submitting || !dirty}
              className='btn btn-info'
              type='button'
              onClick={_ => submitDraft(values, initialize)}
            >
              Save Draft
            </StyledButton>
            <StyledButton
              disabled={hasValidationErrors || submitting || savingDraft}
              className='btn btn-info btn-small'
              type='submit'
            >
              Send Email
            </StyledButton>
          </ButtonContainer>
        </Container>
      )}
    />
  );
}

export default EmailComposer;

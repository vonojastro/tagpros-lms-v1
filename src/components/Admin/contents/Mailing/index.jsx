import {
  ControlledEditor,
  InputControl,
  InputLabel
} from 'components/common/Form/Inputs';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Button, Card, Modal, Spinner } from 'react-bootstrap';
import UsersSelector from 'components/UsersSelector';
import UsersTable from 'components/UsersTable';
import _ from 'lodash';
import { ArrowLeftCircle, Mail, X } from 'react-feather';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { OnChange } from 'react-final-form-listeners';
import useValidationSchema from 'hooks/use-validation-schema';
import schema from '../../../../validators/admin-mailing';
import { api } from 'api';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

const Wrapper = styled.div`
  body {
    overflow: hidden; /* Hide scrollbars */
  }
  color: black !important;
  display: grid;
  @media (min-width: 1425px) {
    grid-template-columns: auto 1fr;
    .submit-btn {
      width: 25%;
      margin-left: auto;
    }
  }
  grid-template-columns: 1fr;
  gap: 2rem;
  height: 100%;
`;

const StyledForm = styled.form`
  width: 100%;
  height: min(100%, 800px);
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;
const emailsSentColumns = [
  {
    name: 'Sent to',
    cell: row => {
      // console.info(row.TO)
      let v = '';
      for (let i = 0; i < 3; ++i) {
        if (i === row.TO.length) break;
        if (i === 0) v = row.TO[i];
        else v = `${v}, \n${row.TO[i]}`;
      }
      const remaining = row.TO.length - v.split(',').length;
      if (remaining) v = `${v} \n\nand ${remaining} other${remaining > 1 ? 's' : ''}.`;
      return <div style={{ whiteSpace: 'pre-wrap' }}>{v}</div>;
    },
    wrap: true
  },
  {
    name: 'Subject',
    selector: row => row.SUBJECT,
    sortable: true,
    wrap: true
  },
  {
    name: 'Date sent',
    selector: row => row.CREATED_DATETIME,
    format: row =>
      new Date(row.CREATED_DATETIME).toLocaleString([], {
        day: '2-digit',
        year: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
    sortable: true,
    wrap: true
  }
];
// const EmailContentPreview = ({ subject, content }) => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);

//   useEffect(() => {
//     if (!!content) setShow(true);
//   }, [!!content]);

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{subject}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body dangerouslySetInnerHTML={{ __html: content }} />
//       <Modal.Footer />
//     </Modal>
//   );
// };
const ModalWrapper = styled.span`
  .modal-width {
    max-width: 80vw !important;
  }
`;
const EmailsSentButton = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClose = () => setShow(false);
  const loadData = () => {
    setLoading(true);
    api
      .get('/admin/mail')
      .then(({ data }) => setData(data))
      .finally(() => setLoading(false));
  };
  const handleShow = async () => {
    loadData();
    setShow(true);
  };
  // const [activeEmailContent, setActiveEmailContent] = useState(null);
  return (
    <Fragment>
      <Button
        variant='outline-info'
        type='button'
        className='ml-auto'
        size='sm'
        onClick={handleShow}
      >
        <Mail className='mr-2' />
        Emails sent
      </Button>
      <ModalWrapper>
        <Modal show={show} onHide={handleClose} dialogClassName='modal-width'>
          <Modal.Header closeButton>
            <Modal.Title>Emails sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataTable
              // onRowClicked={setActiveEmailContent}
              progressPending={loading}
              keyField='ID'
              columns={emailsSentColumns}
              pagination
              data={data}
              progressComponent={<Spinner animation='border' role='status' />}
            />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </ModalWrapper>
      {/* <EmailContentPreview
        subject={activeEmailContent?.SUBJECT}
        content={activeEmailContent?.HTML}
      /> */}
    </Fragment>
  );
};
function AdminMailing() {
  const [usersLoaded, handleUsersLoadedChange] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [to, setTo] = useState([]);

  const setChecked = n => {
    const newValues = usersLoaded.map(e => ({
      ...e,
      IS_CHECKED: !!n.find(EMAIL_ADD => EMAIL_ADD === e.EMAIL_ADD)
    }));
    handleUsersLoadedChange(newValues);
  };
  const validate = useValidationSchema(schema);

  const submit = async ({ html, to, subject }, form) => {
    const parsedHtml = draftToHtml(convertToRaw(html.getCurrentContent()));
    try {
      await toast.promise(
        api.post('/admin/mail', {
          html: parsedHtml,
          to,
          subject
        }),
        {
          pending: 'Sending...',
          success: 'Email Sent',
          error: 'Server error'
        }
      );
      window.location.reload() // force reload wyswyg editor // temp
      // form.reset({ subject: '', to: [] });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    // document.querySelector('body').style.overflow = 'hidden';
    document
      .querySelector(
        'iframe[style*="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: medium none; z-index: 2147483647;"] '
      )
      ?.remove();
  }, []);

  const [step, setStep] = useState(0);

  return (
    <Card
      style={{
        height: 'calc(100vh - 245px)'
      }}
    >
      <Card.Body>
        <Wrapper
          style={{
            ...(step === 1 && { display: 'none' })
          }}
        >
          <div style={{ overflowY: 'auto' }}>
            <UsersSelector
              onChange={handleUsersLoadedChange}
              selectedEmails={to}
              onLoadingChange={setUsersLoading}
            />
          </div>
          <div style={{ overflowY: 'auto' }}>
            <div className='d-flex align-items-center'>
              <EmailsSentButton />
            </div>
            <UsersTable
              data={usersLoaded}
              to={to}
              handleSelectedRowsChange={({ selectedRows }) => {
                setTo(selectedRows.map(({ EMAIL_ADD }) => EMAIL_ADD));
              }}
              progressPending={usersLoading}
            />
          </div>
          <div />
          <Button
            className='submit-btn'
            type='submit'
            variant='outline-info'
            onClick={() => setStep(1)}
            disabled={!to.length}
          >
            Compose email
          </Button>
        </Wrapper>
        {/* {step === 1 && ( */}
        <div
          style={{
            overflowY: 'auto',
            height: '100%',
            ...(step === 0 && { display: 'none' })
          }}
        >
          <Button
            type='button'
            style={{ borderRadius: 99999 }}
            variant='info'
            onClick={() => {
              setStep(0);
            }}
            className='d-flex justify-content-center align-items-center mb-2'
          >
            <ArrowLeftCircle size={25} className='mr-2' />
            <span style={{ fontSize: 13 }}>Select recipients</span>
          </Button>
          <Form
            initialValuesEqual={(a, b) => _.isEqual(a, b)}
            initialValues={{ to }}
            mutators={{
              ...arrayMutators
            }}
            validate={validate}
            onSubmit={submit}
            subscription={{
              initialValues: true,
              values: true,
              invalid: true,
              submitting: true,
              submitSucceeded: true
            }}
            render={({ handleSubmit, values, invalid, submitting }) => (
              <StyledForm onSubmit={handleSubmit} className='form-material'>
                <OnChange name='to'>
                  {value => {
                    setChecked(value);
                    if (!value.length) setStep(0);
                  }}
                </OnChange>
                {/* <pre>{JSON.stringify(values.to)}</pre> */}
                <FieldArray
                  name='to'
                  render={({ fields }) => (
                    <div
                      style={{
                        minHeight: 100,
                        background: 'whitesmoke',
                        padding: '1rem',
                        maxHeight: 224,
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateRows: 'min-content 1fr min-content 1fr',
                        gap: '1rem'
                      }}
                    >
                      <InputLabel label='Recipients' required />
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                          gap: '1.5rem'
                        }}
                      >
                        {fields?.value?.map((EMAIL_ADD, i) => (
                          <div
                            style={{
                              display: 'grid',
                              alignItems: 'center',
                              gridTemplateColumns: '20ch min-content',
                              gap: 10
                            }}
                            key={EMAIL_ADD}
                          >
                            <div className='text-truncate font-14'>{EMAIL_ADD}</div>
                            <Button
                              size='sm'
                              variant='light'
                              onClick={() => fields.remove(i)}
                            >
                              <X size={15} color='red' />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <InputControl name={'subject'} label='Subject' required />
                    </div>
                  )}
                />
                <ControlledEditor name='html' placeholder='Write something...' />
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <Button
                  variant='info'
                  size='md'
                  style={{ marginTop: 200, whiteSpace: 'nowrap' }}
                  className='ml-auto col col-xl-2 mb-3'
                  type='submit'
                  value='Send'
                  disabled={
                    !values.html?.getCurrentContent()?.hasText() || invalid || submitting
                  }
                >
                  Send
                </Button>
              </StyledForm>
            )}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default AdminMailing;

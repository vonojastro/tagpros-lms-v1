import React, { Fragment, useRef } from 'react';
import schema from '../../validators/learnerInfo';
import { Form } from 'react-final-form';
import Popup from 'reactjs-popup';
import FIELDS from './fields';
import { toast } from 'react-toastify';
import {
  SelectControl,
  InputControl,
  ImageInputControl
} from 'components/common/Form/Inputs';
import useValidationSchema from 'hooks/use-validation-schema';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLearner as fetchAddLearner,
  updateLearner as fetchUpdateLearner,
  deleteLearner as fetchDeleteLearner
} from '../../redux/actions/learnerInfo';
import './index.css';

export default function LearnerInfoModal({
  trigger,
  mode,
  info = null,
  customCloseModalHandler,
  customIsOpen,
  shouldForceToAddLearner
}) {
  const dispatch = useDispatch();
  const modalTitles = {
    add: 'Add Learner',
    update: 'Update Learner',
    view: 'View Learner'
  };
  const contentStyle = {
    padding: 0,
    background: '#fff0',
    border: 0
  };
  const closeButtonRef = useRef(null);
  const primaryColor = '#00897B';
  const closeModal = () => {
    closeButtonRef?.current?.click();
  };

  const handleUpdateSuccess = () => {
    toast.success('Learner successfully updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleAddSuccess = () => {
    toast.success('Learner successfully added', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleDeleteSuccess = () => {
    toast.success('Learner successfully deleted', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleDeleteFailure = () => {
    toast.error('Cannot delete learner. Learner is enrolled to a class', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const addLearner = async values => {
    dispatch(fetchAddLearner({ values, closeModal, handleSuccess: handleAddSuccess }));
  };
  const updateLearner = values => {
    dispatch(
      fetchUpdateLearner({ values, closeModal, handleSuccess: handleUpdateSuccess })
    );
  };

  const deleteLearner = async id => {
    dispatch(
      fetchDeleteLearner({
        id,
        closeModal,
        handleSuccess: handleDeleteSuccess,
        handleFailure: handleDeleteFailure
      })
    );
  };

  const validate = useValidationSchema(schema);

  let initialValues = info;

  const loading = useSelector(state => state.learnerInfo[mode]?.loading);

  const error = useSelector(state => state.learnerInfo[mode]?.error);

  const errorMessage = error
    ? {
        add: {
          400: {
            title: 'Failed to Add Learner',
            body:
              "We couldn't add the learner. \n Please make sure that your inputs are valid."
          },
          500: {
            title: 'Network Error',
            body:
              "We couldn't connect you to the server. Please reload the page, or try again later."
          }
        },
        update: {
          400: {
            title: 'Failed to Update Learner',
            body:
              "We couldn't update the learner's inforrmation. \n Please make sure that your inputs are valid."
          },
          500: {
            title: 'Network Error',
            body:
              "We couldn't connect you to the server. Please reload the page, or try again later."
          }
        }
      }[mode][error.status]
    : null;

  if (mode === 'view')
    return (
      <Popup
        open={customIsOpen}
        closeOnDocumentClick
        onClose={customCloseModalHandler}
        {...{ contentStyle }}
        lockScroll
      >
        <div className='modal-dialog modal-xl ' role='document' style={{ margin: 0 }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>{modalTitles[mode]}</h4>
              <button
                onClick={customCloseModalHandler}
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                ref={closeButtonRef}
              >
                <span aria-hidden='true'>×</span>{' '}
              </button>
            </div>
            <div
              className='modal-body'
              style={{ maxHeight: 'calc(101vh - 160px)', overflowY: 'auto' }}
            >
              <div className='card-body'>
                <div className='form-body'>
                  <div class='d-flex flex-row'>
                    <div class='p-2'>
                      <h3 className='box-title'>Learner Info</h3>
                    </div>
                  </div>

                  <hr className='m-t-0 m-b-40' />

                  <Form
                    validate={validate}
                    onSubmit={mode === 'add' ? addLearner : updateLearner}
                    initialValues={initialValues}
                    subscription={{
                      values: true,
                      initialValues: true,
                      modifiedSinceLastSubmit: true
                    }}
                    render={({ handleSubmit, modifiedSinceLastSubmit }) => (
                      <form
                        id='myForm'
                        onSubmit={handleSubmit}
                        className='form-material form-horizontal form-teacher'
                        style={{ pointerEvents: 'none' }}
                      >
                        <ImageInputControl
                          {...FIELDS.find(({ name }) => name === 'photo')}
                          mode={mode}
                        />
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fill,minmax(min(500px, 100%),1fr))',
                            gridGap: 10,
                            gridRowGap: 40
                          }}
                        >
                          {FIELDS.filter(({ name }) => !['photo'].includes(name)).map(
                            props =>
                              (props.type === 'select' && (
                                <SelectControl {...props} disabled={loading} />
                              )) || <InputControl {...props} disabled={loading} />
                          )}
                        </div>
                        {error && !modifiedSinceLastSubmit && !loading && (
                          <div className='alert alert-warning mt-5' role='alert'>
                            <h4 className='alert-heading font-weight-bold'>
                              {errorMessage['title']}
                            </h4>
                            <p>{errorMessage['body']}</p>
                          </div>
                        )}
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={e => {
                  e.preventDefault();
                  customCloseModalHandler();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Popup>
    );

  return (
    <Popup trigger={trigger} modal {...{ contentStyle }} closeOnDocumentClick={!shouldForceToAddLearner} closeOnEscape={!shouldForceToAddLearner} onClose={shouldForceToAddLearner ? null : closeModal}>
      {close => (
        <div className='modal-dialog modal-xl ' role='document' style={{ margin: 0 }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>{modalTitles[mode]}</h4>
              <button
                onClick={shouldForceToAddLearner ? null : close}
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                ref={closeButtonRef}
              >
                <span aria-hidden='true'>×</span>{' '}
              </button>
            </div>
            <div
              className='modal-body'
              style={{ maxHeight: 'calc(101vh - 160px)', overflowY: 'auto' }}
            >
              <div className='card-body'>
                <div className='form-body'>
                  {shouldForceToAddLearner && (
                    <div className='alert alert-warning text-center text m-t-20'>
                      <span>
                        Hooray! Last step is to add your first learner to enroll to a
                        class.
                      </span>
                    </div>
                  )}
                  <div class='d-flex flex-row'>
                    <div class='p-2'>
                      <h3 className='box-title'>My Learner Info</h3>
                    </div>
                    <div class='p-2 ml-auto'>
                      {mode !== 'add' && (
                        <button
                          className='btn btn-danger'
                          onClick={() => deleteLearner(initialValues.id)}
                        >
                          <i class='fa fa-trash' aria-hidden='true' /> Delete Learner
                        </button>
                      )}
                    </div>
                  </div>

                  <hr className='m-t-0 m-b-40' />

                  <Form
                    validate={validate}
                    onSubmit={mode === 'add' ? addLearner : updateLearner}
                    initialValues={initialValues}
                    subscription={{
                      values: true,
                      initialValues: true,
                      modifiedSinceLastSubmit: true
                    }}
                    render={({ handleSubmit, modifiedSinceLastSubmit }) => (
                      <form
                        id='myForm'
                        onSubmit={handleSubmit}
                        className='form-material form-horizontal form-family'
                      >
                        <ImageInputControl
                          {...FIELDS.find(({ name }) => name === 'photo')}
                        />
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fill,minmax(min(500px, 100%),1fr))',
                            gridGap: 10,
                            gridRowGap: 40
                          }}
                        >
                          {FIELDS.filter(({ name }) => !['photo'].includes(name)).map(
                            props =>
                              (props.type === 'select' && (
                                <SelectControl {...props} disabled={loading} />
                              )) || <InputControl {...props} disabled={loading} />
                          )}
                        </div>
                        {error && !modifiedSinceLastSubmit && !loading && (
                          <div className='alert alert-warning mt-5' role='alert'>
                            <h4 className='alert-heading font-weight-bold'>
                              {errorMessage['title']}
                            </h4>
                            <p>{errorMessage['body']}</p>
                          </div>
                        )}
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={e => {
                  if(shouldForceToAddLearner) return;
                  e.preventDefault();
                  close();
                }}
              >
                Close
              </button>
              <button
                style={{ background: primaryColor, border: primaryColor }}
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                onClick={() =>
                  document
                    .getElementById('myForm')
                    .dispatchEvent(
                      new Event('submit', { cancelable: true, bubbles: true })
                    )
                }
                disabled={loading}
              >
                {loading && mode === 'add' ? (
                  <Fragment>
                    <div
                      class='spinner-border text-light mr-2'
                      role='status'
                      style={{ height: 20, width: 20 }}
                    >
                      <span class='sr-only'>Loading...</span>
                    </div>
                    Submitting
                  </Fragment>
                ) : loading && mode === 'update' ? (
                  <Fragment>
                    <div
                      class='spinner-border text-light mr-2'
                      role='status'
                      style={{ height: 20, width: 20 }}
                    >
                      <span class='sr-only'>Loading...</span>
                    </div>
                    Saving
                  </Fragment>
                ) : (
                  ''
                )}
                {!loading && mode === 'add'
                  ? 'Submit'
                  : !loading && mode === 'update'
                  ? 'Save'
                  : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

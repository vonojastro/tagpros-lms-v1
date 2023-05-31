import { resendVerificationEmail } from 'api/account';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import Modal from 'react-responsive-modal';
import { useTimer } from 'react-timer-hook';

export default function VerifyAccountModal({ email: EMAIL_ADD, open, onClose }) {
  const { seconds, restart, isRunning } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date()
  });
  const submit = async ({ EMAIL_ADD }) => {
    resendVerificationEmail(null, { EMAIL_ADD });
  };

  return (
    <Form
      initialValues={{ EMAIL_ADD, lastSubmitted: new Date() }}
      onSubmit={submit}
      render={({ handleSubmit, submitSucceeded, submitting, values, form }) => (
        <Modal open={open} onClose={onClose} center>
          <form
            onSubmit={e =>
              handleSubmit(e).then(() => {
                const nextTime = new Date();
                nextTime.setSeconds(60 + nextTime.getSeconds());
                restart(nextTime);
              })
            }
          >
            <div className='px-2'>
              <div className='text-info font-weight-bold mb-2 font-18'>
                Verify Your Account
              </div>
              <div className='dropdown-divider' />
              <div className='m-t-15'>
                <span className='font-14'>{`We've already sent a confirmation link to`}</span>
                <br />
                <span className='font-14 text-info text-center'>{EMAIL_ADD}</span>
              </div>
              <Button
                variant='info'
                size='sm'
                className='float-right mt-4'
                disabled={submitting || isRunning}
                type='submit'
              >
                Resend {isRunning && `${seconds}s`}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    />
  );
}

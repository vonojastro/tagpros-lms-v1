import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from '../common/Register/Input';
import Modal from '../common/Register/Modal';
import { createBrowserHistory } from 'history';


import { saveAdminPassword } from "api/admin";

import './index.css';

let history = createBrowserHistory();



export default function AdminSetPasswordPage() {
  const errorMessageList = [
    'Account not permitted to perform action.',
    'Password is Empty',
    'Confirm Password is Empty',
    'Passwords does not match',
    'The link is expired. Please contact your adminstrator for a new link'
  ];

  const [credentials, setCredentials] = useState({newPassword: '', confirmPassword: ''});
  const [token, setToken] = useState('');
  const [errorList, setErrorList] = useState([{newPassword: false}, {confirmPassword: false}]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showModal, setShowModal] = useState({display: false, message:'', title:'', type: false});

  const dispatch = useDispatch();

  const handleChange = (e) =>{
    onInputChange(e.target.name, e.target.value);
  };

  const onInputChange = async (name, value) =>{
    await setCredentials((prevState) =>({
        ...prevState,
        [name]: value
    }));
  };

  const handleValidationList = (event) =>{
      let { name, isValid } = event;
      setErrorList((prevState)=>{
        return prevState.map((fieldObj) =>
          fieldObj.hasOwnProperty(name) ? { ...fieldObj, [name]: isValid } : fieldObj
        );
      });
  };

  const isFormValid = () =>{
    let isValid = true;
    // if blank
    if(credentials.newPassword === '' || credentials.confirmPassword === '')
      isValid = false;

    // eslint-disable-next-line array-callback-return
    errorList.map((item)=>{
      if (Object.values(item).includes(false))
        isValid = false;
    });
    return isValid;
  };

  const setPasswordPOST = async (event) =>{
    setSubmitLoading(true);
    const args = {
        newPassword: credentials.newPassword,
        confirmPassword: credentials.confirmPassword,
        token
    };
    console.log(args);
    await saveAdminPassword(dispatch, args, (status, data)=>{
        if(!status){
            // toast error
            // toast.error("Oh no! Unable to Create an Account. Please Try Again.");
            let message = "Saving of Admin Account Password Failed. Please contact Your Administrator for instructions";
            if (errorMessageList.indexOf(data.response.data.message) > -1){
              message = data.response.data.message;
            }
            if (!!data.response.data.type &&
              (data.response.data.type === "token_invalid" ||
              data.response.data.type === "blank_token"))
            {
              message = "The link is expired. Please contact your adminstrator for a new link";
            }
            displayModal("Oh No!", message, false);
        }
        else
        {
            // toast success
            // toast.success("Account Details Successfully Saved!");
            console.log(data);
            displayModal("Great!", "You can now login", true);
        }
    });
    setSubmitLoading(false);

  };

  const validateTokenPOST = async () =>{
    
  };

  const setTokenFA = async () =>{
    if (token === '')
    {
      const pathname = history.location.pathname.split('/');
      const tokenDummy = pathname.pop();
      if (!!tokenDummy && tokenDummy !== '')
      {
        await setToken(tokenDummy);
      }
      else
      {
        window.location.pathname="/landing";
        localStorage.clear();
      }
    }
  };

  setTokenFA();

  const closeModal = async () =>{
    await setShowModal((prevState)=>({
      ...prevState,
      display: false
    }));

    if (showModal.message === errorMessageList[0] || showModal.message === 'You can now login' || showModal.message === errorMessageList[errorMessageList.length-1])
    {
      window.location.pathname="/admin-login";
      localStorage.clear();
    }
  };


  const displayModal = async (titleParam, messageParam, success) =>{
    await setShowModal({
      display: true,
      title: titleParam,
      message: messageParam,
      type: success
    });
  };

  React.useEffect(() => {
    validateTokenPOST();
  }, []);

  return(
    <section
        id="wrapper"
        className="login-register login-sidebar"
        style={{
            backgroundImage: "url(./assets/images/loginbg01.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
          <div className='login-box-left login-box card p-2'>
            <div className='card-body'>
              <div className='row w-100 h-100' style={{ margin: '0 auto' }}>
                <div className='col-lg-12 col-xl-12'>
                  <form
                    className='form-horizontal floating-labels'
                  >
                    <a href='#/' className='text-center db'>
                      <img src='./assets/images/logo-icon.png' alt='Home' />
                      <br />
                      <img src='./assets/images/logo-text.png' alt='Home' />
                    </a>

                    <div className="text-center db">
                      <h2><span class="badge badge-info">ADMIN</span></h2>
                    </div>

                    <Input
                      type={'password'}
                      placeholder={'New Password'}
                      name={'newPassword'}
                      autoComplete={false}
                      required={true}
                      topStyle={'m-t-40'}
                      handleChange={handleChange}
                      password={credentials.newPassword}
                      handleValidationList={handleValidationList}
                    />

                    <Input
                      type={'password'}
                      placeholder={'Confirm Password'}
                      name={'confirmPassword'}
                      autoComplete={false}
                      required={true}
                      handleChange={handleChange}
                      password={credentials.confirmPassword}
                      handleValidationList={handleValidationList}
                    />

                <div className='form-group text-center m-t-20'>
                  <div className='col-xs-12'>
                    <button
                      className='btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light'
                      type='button'
                      onClick={(e) => setPasswordPOST(e)}
                      disabled={submitLoading || !isFormValid()}
                    >
                      <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>

                      SET PASSWORD <i className='fa fa-arrow-right m-l-5'></i>
                    </button>
                  </div>
                </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {showModal.display && 
          <Modal
            content={{ title: showModal.title, message: showModal.message }}
            isSuccess={showModal.type}
            onClose={() => closeModal()}
          />
        }
        </section>
    );
};
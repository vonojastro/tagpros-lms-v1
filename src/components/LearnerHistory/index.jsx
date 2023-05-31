import React, { Fragment, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEnrollmentHistory } from 'api/classEnroll';
import { useDispatch } from 'react-redux';
import Table from 'components/Admin/contents/Table';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { api } from 'api';
import { PAYMENT_STATUS, ENROLLMENT_STATUS } from 'utils/constants';
import { LEARNER_HISTORY_TABS } from '../../utils/constants';
import { toMoneyFormat } from "utils/utils";
import { s3Config } from "../../config";
import S3 from "aws-s3-pro";

const s3Client = new S3(s3Config);

export default function LearnerHistory() {
  const uploaderRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState({
    cancel: false,
    refund: false,
    verify: false
  });
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [history, setHistory] = useState([]);
  const [reason, setReason] = useState("");
  const [fileAttached, setFileAttached] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState({
    hasError: false,
    isDataLoading: true,
    isSubmitLoading: false,
    loadingPayment: false,
    errorPayment: false
  });

  const maxDate = moment().format('YYYY-MM-DD')

  const columns = [
    {
      Header: 'Enrollment History',
      columns: [
        {
          Header: 'No.',
          accessor: 'classId',
          Cell: ({ row }) => <div>{row.index + 1}</div>
        },
        {
          Header: 'Transaction Ref',
          accessor: 'transactionId'
        },
        {
          Header: 'Class Title',
          accessor: 'classTitle',
          Cell:({row, value}) => (
            <a href={`/class/enroll/${history[row.index].classId}`} target="_blank" rel="noreferrer">{value}</a>
          )
        },
        {
          Header: 'Price',
          accessor: d => `${toMoneyFormat(d.price, d.currency)}`
        },
        {
          Header: 'Total Payment',
          accessor: d => [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.FOR_VERIFICATION].indexOf(d.status) < 0 ? `${toMoneyFormat((d.price-d.totalDiscount), d.currency)}` : ''
        },
        {
          Header: 'Refund',
          accessor: d => d.refund ? `${toMoneyFormat(d.refund, d.currency)}` : null
        },
        {
          Header: 'Enrollment Date',
          accessor: d => moment(d.createdDateTime).format('MM/DD/YYYY hh:mm a')
        },
        {
          Header: 'Status', accessor: "status",
          Cell: ({value}) => <div className={"badge " + getBadge(value)}>{getValue(value)}</div>
        },
        {
          Header: 'Action',
          accessor: d => d.status,
          Cell: ({ row, value }) => (
            <div style={{display:'grid', gap:5, gridTemplateColumns: 'repeat(auto-fill, minmax(5rem,1fr))'}}>
              {[PAYMENT_STATUS.UNPAID, PAYMENT_STATUS.UNKNOWN, PAYMENT_STATUS.PENDING].indexOf(value) > -1 && <button
                style={{ display: 'block' }}
                className='btn btn-danger btn-sm'
                data-toggle='tooltip'
                title='Cancel Enrollment'
                onClick={() => handleClickAction('cancel', row.index)}
              >
                Cancel
              </button>}

              {value === PAYMENT_STATUS.PAID && <button
                style={{ display: 'block' }}
                className='btn btn-warning btn-sm'
                data-toggle='tooltip'
                title='Refund is available up to 24hrs before start of the class.'
                disabled={parseInt(history[row.index].price) === 0 
                  || [ENROLLMENT_STATUS.PENDING, ENROLLMENT_STATUS.SUCCESS, ENROLLMENT_STATUS.CANCELLED].indexOf(history[row.index].enrollmentStatus) === -1
                  || !isRefundable(row.index)}
                onClick={() => handleClickAction('refund', row.index)}
              >
                Refund
              </button>}
              {value === PAYMENT_STATUS.PENDING && <button
                style={{ display: 'block' }}
                className='btn btn-warning btn-sm'
                data-toggle='tooltip'
                title='Add your proof of payment'
                onClick={() => handleClickAction('verify', row.index)}
              >
                Verify
              </button>}
              {value === PAYMENT_STATUS.FOR_VERIFICATION && <button
                style={{display: 'block'}}
                className='btn btn-info btn-sm'
                data-toggle='tooltip'
                title='Update/Edit proof of payment'
                onClick={() => handleClickAction('verify', row.index)}
              >
                Edit Payment
              </button>}

              {value === PAYMENT_STATUS.VOID && <button
                style={{ display: 'block' }}
                className='btn btn-primary btn-sm'
                data-toggle='tooltip'
                title='Enroll to class'
                onClick={() => navigate('/class/enroll/' + history[row.index].classId)}
              >
                Enroll Again
              </button>}
            </div>
          )
        }
      ]
    }
  ];

  const getValue = (value) => {
    switch(value){
      case PAYMENT_STATUS.UNPAID:
      case PAYMENT_STATUS.UNKNOWN:
      case PAYMENT_STATUS.PENDING:
        return "pending"
      case PAYMENT_STATUS.FOR_VERIFICATION:
        return "for verification"
      case PAYMENT_STATUS.PAID:
        return "paid"
      case PAYMENT_STATUS.VOID:
        return "cancelled"
      default: return (Object.keys(PAYMENT_STATUS).find(key => PAYMENT_STATUS[key] === value))?.toLowerCase();
    }
  }

  const getBadge = (key) => {
    switch(key){
      case PAYMENT_STATUS.UNPAID:
      case PAYMENT_STATUS.UNKNOWN:
      case PAYMENT_STATUS.PENDING:
        return "badge-primary"
      case PAYMENT_STATUS.FOR_VERIFICATION:
        return "badge-info"
      case PAYMENT_STATUS.PAID:
        return "badge-success"
      case PAYMENT_STATUS.VOID:
        return "badge-warning"
      default: return "badge-secondary"
    }
  }

  const isRefundable = index => {
    const startDateTime = moment(
      `${history[index].startDate} ${history[index].startTime}`,
      'YYYY/MM/DD hh:mm A'
    ).format();
    return moment().isBefore(moment(startDateTime).subtract(1, 'days'));
  };

  const handleClickAction = async (action, index) => {
    setModalShow({[action]: true});
    setSelectedTxn(index);

    switch(action){
      case 'verify':
        if(history[index].status === PAYMENT_STATUS.PENDING){
          setPaymentDetails(prevState => ({
            ...prevState,
            currency: history[index]?.currency,
            amount: history[index]?.price
          })); 
        } else {
          setPaymentDetails(prevState => ({
            ...history[index].paymentReference,
            depositDate: moment(history[index].paymentReference.depositDate).format('YYYY-MM-DD'),
            depositTime: history[index].paymentReference.depositTime,
          })); break;
        }
        break;
      default: break;
    }
  };

  const cancelTransaction = async () => {
    setLoading(prevState => ({
      ...prevState,
      isSubmitLoading: true
    }));
    await api
      .post('/payment/void', { txnId: history[selectedTxn].transactionId })
      .then(response => {
        if (response.status === 'success') {
          toast.success('Enrollment has been cancelled.');
        }
        loadData('cancelled');
        setSelectedTab('cancelled');
      })
      .catch(err => {
        console.log(err);
        toast.error('Cannot cancel enrollment. Please try again later.');
      })
      .finally(() => {
        setLoading(prevState => ({
          ...prevState,
          isSubmitLoading: false
        }));
        setModalShow({cancel: false});
      });
  };

  const refundTransaction = async () => {
    setLoading(prevState => ({
      ...prevState,
      isSubmitLoading: true
    }));
    await api
      .post('/payment/refund', { refNo: history[selectedTxn].refNo, reason, enrollmentId: history[selectedTxn].enrollmentId})
      .then(response => {
        toast.success('Payment for this enrollment has been successfully refunded.');
        loadData('refund');
        setSelectedTab('refund');
        setReason("");
      })
      .catch(err => {
        console.log(err);
        toast.error(err?.response?.data?.err?.message || 'Cannot proceed with refund. Please try again later.');
      })
      .finally(() => {
        setLoading(prevState => ({
          ...prevState,
          isSubmitLoading: false
        }));
        setModalShow({refund: false});
      });
  };

  const onTabClicked = async tabName => {
    if (selectedTab !== tabName) {
      await setSelectedTab(tabName);
      loadData(tabName);
    }
  };

  const filterHistory = async (history, tabName) => {
    let data;
    switch (tabName) {
      case 'all':
        setHistory(history);
        return;
      case 'pending':
        data = await history.filter(
          item =>
            [PAYMENT_STATUS.UNPAID, PAYMENT_STATUS.UNKNOWN, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.FOR_VERIFICATION].indexOf(item.status) > -1
        );
        setHistory(data);
        return;
      case 'paid':
        data = history.filter(item => item.status === PAYMENT_STATUS.PAID);
        setHistory(data);
        return;
      case 'completed':
        data = history.filter(
          item => (item.enrollmentStatus === ENROLLMENT_STATUS.COMPLETED || item.enrollmentStatus === ENROLLMENT_STATUS.PAYOUT_PAID)
        );
        setHistory(data);
        return;
      case 'refund':
        data = await history.filter(
          item => item.enrollmentStatus === ENROLLMENT_STATUS.REFUNDED
        );
        setHistory(data);
        return;
      case 'cancelled':
        data = await history.filter(item => item.status === PAYMENT_STATUS.VOID);
        setHistory(data);
        return;
      default:
        data = [];
        setHistory(data);
    }
  };

  const onInputChange = (name, value) => {
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const verifyPayment = async () => {
    try {
      setLoading(prevState => ({
        ...prevState,
        errorPayment: false,
        loadingPayment: true
      }));
      
      const invalidMessage = await verifyForm();
      console.log('invalidMessage', invalidMessage);
      if(invalidMessage !== null){
        console.log('')
        setLoading(prevState => ({
          ...prevState,
          errorPayment: true,
          loadingPayment: false,
          errorMessage: invalidMessage || 'Please fill up all required fields.'
        }));
      }else{
        const uploadResponse = fileAttached ? await s3Client.uploadFile(fileAttached) : {status: 204};
        if (uploadResponse.status === 204) {
          await api.post(`/payment/verify${paymentDetails.paymentRef ? '/update': ''}`, {
            ...paymentDetails,
            photo: uploadResponse.location,
            txnId: history[selectedTxn].transactionId
          }).then(response => {
            toast.success('Proof of Payment for this enrollment has been successfully submitted. Please wait for our accounting team to verify your payment.');
            loadData('pending');
            setSelectedTab('pending');
            setPaymentDetails({ bankName: "", referenceNumber: "", depositDate: null, depositTime: null, currency: "", amount: null, photo: null});
            setLoading(prevState => ({
              ...prevState,
              errorPayment: false,
              loadingPayment: false
            }));
            setModalShow({verify: false});
          })
          .catch(err => {
            console.log(err);
            toast.error(err?.response?.data?.err?.message || 'Cannot proceed with payment verification. Please try again later.');
          })
        }else{
          setLoading(prevState => ({
            ...prevState,
            errorPayment: true,
            loadingPayment: false
          }));
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err?.message || 'Cannot proceed with payment verification. Please try again later.');
      setLoading(prevState => ({
        ...prevState,
        hasError: true,
        isSubmitLoading: false
      }));
    }
  }

  const verifyForm = async () => {
    const now = moment();
    const date = moment(paymentDetails.depositDate).format('YYYY-MM-DD');
    const depositDate = moment(`${date} ${paymentDetails.depositTime}`, 'YYYY-MM-DD HH:mm');
    const totalPayment = parseFloat(history[selectedTxn].price - history[selectedTxn].totalDiscount);

    if(!paymentDetails.referenceNumber || !paymentDetails.bankName || !paymentDetails.depositDate || !paymentDetails.depositTime || !paymentDetails.currency || !paymentDetails.amount || !paymentDetails.photo){
      return 'Please fill up all required fields.';
    }

    if(parseFloat(paymentDetails.amount) < totalPayment){
      return `Amount should be atleast ${totalPayment}`;
    }

    if(depositDate > now){
      return 'You cannot use future date on the Deposit Date and Time. Please make sure to input a valid date and time';
    }

    return null;
  }
  
  const onClose = () => {
    setPaymentDetails({ bankName: "", referenceNumber: "", depositDate: null, depositTime: null, currency: "", amount: null, photo: null});
    setModalShow({verify: false});
  }

  const onAttachImage = async (event) => {
    try {
      //event.target.files[0].name = `${accountId}-${event.target.files[0].name}`;
      setFileAttached(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        setPaymentDetails(prevState => ({
          ...prevState,
          photo: uploaded_image
        }))
        // setProfilePhoto(uploaded_image);
        // setIsPhotoAttached(true);
      });

      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {}
  }

  const loadData = async tabName => {
    setLoading({ isDataLoading: true, hasError: false });
    getEnrollmentHistory(dispatch, (status, data) => {
      if (status) {
        filterHistory(data, tabName);
        if(location.state && location.state.verify){
          const selectedIdx = data.findIndex(item => item.transactionId === location.state.txnId)
          setSelectedTxn(selectedIdx);
          window.history.replaceState({}, document.title, 'history')
          setTimeout(() => {
            setModalShow(prevState => ({
              ...prevState,
              verify: true
            }));
          }, 500);
        }
        setLoading({ isDataLoading: false, hasError: false });
      } else {
        setLoading({ isDataLoading: false, hasError: true });
      }
    });
  };

  React.useEffect(() => {
    loadData(selectedTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className='card'>
        {/* Nav tabs */}
        <ul className='nav nav-tabs profile-tab' role='tablist'>
          {LEARNER_HISTORY_TABS.map(({ name, title }) => (
            <li className='nav-item' key={selectedTab + '.' + name}>
              <a
                className={`nav-link ${selectedTab === name && 'active'}`}
                data-toggle='tab'
                href='#history'
                role='tab'
                onClick={() => onTabClicked(name)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>

        {/* Tab panes */}
        <div className='tab-content'>
          {/*first tab*/}

          <div className='tab-pane active' id='pending' role='tabpanel'>
            <div className='card-body'>
              <Table
                loading={loading.isDataLoading}
                error={loading.hasError}
                columns={columns}
                data={history}
                title={'Enrollment History'}
                filterColumn={'status'}
                filterValue={''}
                onReload={() => loadData(selectedTab)}
                disableSearch // Hide search
                sortableRows // Clicking column header sorts rows accordingly
              />
            </div>
          </div>
        </div>
      </div>

      <Modal size='m' show={modalShow.refund} onHide={() => setModalShow({refund: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Refund Payment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small style={{color: 'red'}}>Note: Payment Gateway fee of <b>{history[selectedTxn]?.gatewayFees}</b> has been deducted from the total amount to be refunded.</small>
          <h5 className="mt-1">
            A total of <b>{toMoneyFormat((history[selectedTxn]?.price - history[selectedTxn]?.totalDiscount - history[selectedTxn]?.gatewayFees), history[selectedTxn]?.currency)}</b> will be refunded to your account.
            
          </h5><br />
          <h5>
            Please state your reason below:
          </h5>
          <div className="form-group mt-4">
              <textarea defaultValue={reason} className="form-control" rows="3" placeholder="Write your reason here ..." onChange={(e) => setReason(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='link' type='button' onClick={() => setModalShow({refund: false})}>
            Cancel
          </Button>
          <Button
            variant='info'
            type='submit'
            onClick={refundTransaction}
            disabled={loading.isSubmitLoading === true}
          >
            <span
              style={{ display: loading.isSubmitLoading ? 'inline-block' : 'none' }}
              class='spinner-border spinner-border-sm btn-load'
              role='status'
              aria-hidden='true'
            />
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size='m' show={modalShow.cancel} onHide={() => setModalShow({cancel: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Payment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to cancel this payment? Clicking continue will cancel
            all enrollments related to this transaction.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='link' type='button' onClick={() => setModalShow({cancel: false})}>
            Cancel
          </Button>
          <Button
            variant='info'
            type='submit'
            onClick={cancelTransaction}
            disabled={loading.isSubmitLoading === true}
          >
            <span
              style={{ display: loading.isSubmitLoading ? 'inline-block' : 'none' }}
              class='spinner-border spinner-border-sm btn-load'
              role='status'
              aria-hidden='true'
            />
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size='lg'
        show={modalShow.verify}
        backdrop='static'
        keyboard={false}
        onHide={() => setModalShow({verify: false})}
      >
        <Modal.Header>
          <Modal.Title>{history[selectedTxn]?.status === PAYMENT_STATUS.PENDING ? 'Verify' : 'Edit'} Payment?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bank-details">
          <form className="row" id="verifyForm">
            <div className="col-12">
                <div className="card mb-3">
                    <div className="card-body">
                        {loading.errorPayment && <div className="alert alert-warning text-center text m-t-10 ml-0 mr-0" style={{ fontSize: 10 }}>
                          <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => setLoading(prevState => ({...prevState, errorPayment: false, loadingPayment: false}))}></i>
                          <span className="font-weight-bold" style={{ fontSize: 12 }}>
                              Something went wrong.
                          </span>
                          <br />
                          {loading.errorMessage ? loading.errorMessage : 'Please try again later.'}
                        </div>}
                        <h6 className="modal-title mb-2" id="exampleModalLabel"><b>Transaction Id: {history[selectedTxn]?.transactionId}</b></h6>
                        <h6 className="modal-title" id="exampleModalLabel">Bank Name<small style={{color: 'red'}}>*</small></h6>
                        <div className="form-group mb-3">
                            <input className="form-control" type="text" name="bankName" defaultValue={paymentDetails.bankName} onChange={(e) => onInputChange(e.target.name, e.target.value)} required/>
                        </div>

                        <h6 className="modal-title" id="exampleModalLabel">Reference Number<small style={{color: 'red'}}>*</small></h6>
                        <div className="form-group mb-3">
                            <input className="form-control" type="text" name="referenceNumber" aria-describedby="refHelp" defaultValue={paymentDetails.referenceNumber} onChange={(e) => onInputChange(e.target.name, e.target.value)} required/>
                            <small id="refHelp" class="form-text text-muted">Reference Number refers to the number indicated on your deposit slip or payment confirmation.</small>
                        </div>
                        <div className="row">
                          <div className="col">
                            <h6 className="modal-title" id="exampleModalLabel">Date of Deposit<small style={{color: 'red'}}>*</small></h6>
                            <div className="form-group mb-3">
                                <input className="form-control" type="date" name="depositDate" defaultValue={paymentDetails.depositDate} max={maxDate} onChange={(e) => onInputChange(e.target.name, e.target.value)} required/>
                            </div>
                          </div>
                          <div className="col">
                            <h6 className="modal-title" id="exampleModalLabel">Time of Deposit<small style={{color: 'red'}}>*</small></h6>
                            <div className="form-group mb-3">
                                <input className="form-control" type="time" name="depositTime" defaultValue={paymentDetails.depositTime} onChange={(e) => onInputChange(e.target.name, e.target.value)} required/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <h6 className="modal-title" id="exampleModalLabel">Currency<small style={{color: 'red'}}>*</small></h6>
                            <div className="form-group mb-3">
                              <select className="form-control" name="currency" onChange={(e) => onInputChange(e.target.name, e.target.value)} disabled>
                                  <option value="PHP" selected={history[selectedTxn]?.currency === 'PHP'}>PHP</option>
                                  <option value="USD" selected={history[selectedTxn]?.currency === 'USD'}>USD</option>
                              </select>
                            </div>
                          </div>
                          <div className="col">
                            <h6 className="modal-title" id="exampleModalLabel">Amount<small style={{color: 'red'}}>*</small></h6>
                            <div className="form-group mb-3">
                                <input className="form-control" type="number" name="amount" min="1" defaultValue={paymentDetails.amount} onChange={(e) => onInputChange(e.target.name, e.target.value)} required/>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-6">
                            <h6 className="modal-title mb-3">Proof of Payment<small style={{color: 'red'}}>*</small></h6>
                            <div className="ml-3">
                              <label className="lms-input-label">
                                Upload a thumbnail image
                              </label>
                              <br />
                              <label className="lms-input-sublabel">
                                Image size: not more than 3MB
                                <br />
                                Image formats: jpg, png, jpeg
                                <br />
                                Accepted file formats: jpg, png, jpeg
                                <br />
                              </label>
                            </div>
                            <div className="ml-3">
                              <button className="btn btn-info btn-block" type="button" onClick={() => uploaderRef.current.click()} disabled={loading.loadingPayment}>
                                Upload
                              </button>
                              <input
                                name="upload"
                                ref={uploaderRef}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                style={{ display: "none" }}
                                onChange={onAttachImage}/>
                            </div>
                          </div>
                          <div className="col-6" style={{textAlign:"center"}}>
                            <img
                              id="imageFile"
                              src={paymentDetails.photo ? paymentDetails.photo : "/assets/images/image-placeholder.jpg"}
                              alt="thumbnail"
                              className="img-fluid"
                              style={{ maxHeight: "200px" }}
                            />
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type="button" onClick={verifyPayment} disabled={loading.loadingPayment}>
            <span
              style={{ display: loading.loadingPayment ? 'inline-block' : 'none' }}
              className='spinner-border spinner-border-sm btn-load'
              role='status'
              aria-hidden='true'
              />
            {history[selectedTxn]?.status === PAYMENT_STATUS.PENDING ? 'Proceed' : 'Update'}
          </Button>
          <Button variant='secondary' onClick={() => onClose()} disabled={loading.loadingPayment}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

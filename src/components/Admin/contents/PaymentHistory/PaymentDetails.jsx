import React from "react";
import moment from "moment";
import { CLASS_STATUS, ENROLLMENT_STATUS, PAYMENT_PROOF_STATUS } from "utils/constants";
import { toMoneyFormat } from "utils/utils";

export default function PaymentDetails({tableData, history, row, handleClickVerify}) {
    const teacherShare = (parseFloat(tableData[row.index].earnedPartnership) - parseFloat(tableData[row.index].outputVAT))*0.7;
    const netPartnershipRevNoVAT = tableData[row.index].classStatus !== CLASS_STATUS.COMPLETED ? 0 : (parseFloat(tableData[row.index].netPartnershipVAT) - parseFloat(tableData[row.index].outputVAT));
    const grossPartnershipRevenueNoVAT = tableData[row.index].classStatus !== CLASS_STATUS.COMPLETED ? 0 : netPartnershipRevNoVAT + parseFloat(tableData[row.index].totalDiscount);
    const lossFromDiscount = tableData[row.index].classStatus !== CLASS_STATUS.COMPLETED ? 0 : (grossPartnershipRevenueNoVAT-teacherShare-tableData[row.index].totalDiscount)
    const getClassStatus = (key) => {
        switch (key) {
            case CLASS_STATUS.STARTED:
                return "ONGOING"
            case CLASS_STATUS.COMPLETED:
                return "COMPLETED"
            default:
                return "PENDING"
        }
    }

    const getBadge = (key) => {
        switch (key) {
            case CLASS_STATUS.COMPLETED:
                return "badge-success"
            case CLASS_STATUS.STARTED:
                return "badge-warning"
            default:
                return "badge-primary"
        }
    }

    return(<div className="expand-body" style={{padding: '10px'}}>
            <div className="row">
                <div className="card col">
                    <div className="card-body">
                        <div className="row justify-content-between header">
                            <h5>TEACHER DETAILS</h5>
                            <small style={{fontSize: '12px'}}>{tableData[row.index].teacherAccountId}</small>
                        </div>
                        <div className="row">
                            <div className="col"><small style={{color: 'gray'}}>Name</small></div>
                            <div className="col-8"><small>{tableData[row.index].teacher}</small></div>
                        </div>
                        <div className="row">
                            <div className="col"><small style={{color: 'gray'}}>Email</small></div>
                            <div className="col-8"><small>{tableData[row.index].teacherEmail}</small></div>
                        </div>
                    </div>
                </div>
                {tableData[row.index].enrollmentStatus === ENROLLMENT_STATUS.PAYOUT_PAID && <div className="card col">
                    <div className="card-body">
                        <div className="row justify-content-between header">
                            <h5>PAYOUT DETAILS</h5>
                            <small style={{fontSize: '12px'}}>{tableData[row.index].payoutRef}</small>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Account #</small></div>
                            <div className="col-8"><small>{tableData[row.index].teacherPayoutNum}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Processor</small></div>
                            <div className="col-8"><small>{tableData[row.index].processor}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Payout Date</small></div>
                            <div className="col-8"><small>{moment(tableData[row.index].payoutDate).format('dddd, LL')}</small></div>
                        </div>
                    </div>
                </div>}
                <div className="card col ml-4">
                    <div className="card-body">
                        <div className="row justify-content-between header">
                            <h5>CLASS DETAILS</h5>
                            <div style={{fontSize: '12px'}} className={`badge ${getBadge(tableData[row.index].classStatus)}`}>{getClassStatus(tableData[row.index].classStatus)}</div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Title</small></div>
                            <div className="col-8"><small>{tableData[row.index].classTitle}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Category</small></div>
                            <div className="col-8"><small>{tableData[row.index].classCategory}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Schedule</small></div>
                            <div className="col-8" >
                                {tableData[row.index].availableDates ?
                                    <small>
                                        <i className="fa fa-calendar-alt text-muted" /> {tableData[row.index].availableDates && "No. of Sessions : " + tableData[row.index].availableDates.length}
                                        <br />
                                        {tableData[row.index].availableDates.map(date => (
                                            <div>&emsp;<i className="fa fa-caret-right text-muted" />{" " + moment(date).format('dddd, LL')}<br /></div>
                                        ))}
                                    </small> :
                                    <small>
                                        <i className="fa fa-calendar-alt mr-2 text-muted" />
                                        {tableData[row.index].startDate}
                                    </small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card col ml-4">
                    <div className="card-body">
                        <div className="row justify-content-between header">
                            <h5>ACCOUNT DETAILS</h5>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Account Name</small></div>
                            <div className="col-7"><small>{tableData[row.index].payor}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Account Type</small></div>
                            <div className="col-7"><small>{tableData[row.index].payorType}</small></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col"><small style={{color: 'gray'}}>Learner</small></div>
                            <div className="col-7"><small>{tableData[row.index].learner !== " " ? tableData[row.index].learner : 'self'}</small></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div className="card col">
                    <div className="card-body">
                        <table style={{width: '100%'}}>
                            <thead>
                                <th>Discount</th>
                                <th>Gross Amount</th>
                                <th>Gateway Fees</th>
                                <th>Amount Deposited in Tagpros Account</th>
                                <th>Unearned Partnership Revenue</th>
                                <th>Earned Partnership Revenue</th>
                                <th>Net Partnership Revenue (VAT inc)</th>
                                <th>Output VAT</th>
                                <th>Net Partnership Revenue (VAT exc)</th>
                                <th>Gross Partnership Revenue (VAT exc)</th>
                                <th>Teacher Earnings</th>
                                <th>Witholding Tax</th>
                                <th>Gross Revenue/Loss from Discount</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{toMoneyFormat(tableData[row.index].totalDiscount,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].grossAmount,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].gatewayFees,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].amountDeposited,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].unearnedPartnership,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].earnedPartnership,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].netPartnershipVAT,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(tableData[row.index].outputVAT,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(netPartnershipRevNoVAT,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(grossPartnershipRevenueNoVAT,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat(teacherShare,tableData[row.index].currency)}</td>
                                    <td>{toMoneyFormat((teacherShare*0.10),tableData[row.index].currency)}</td>
                                    <td>{lossFromDiscount < 0 ? `(${toMoneyFormat((lossFromDiscount*-1), tableData[row.index].currency)})` : toMoneyFormat(lossFromDiscount,tableData[row.index].currency)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="card col">
                    <div className="card-body">
                        <div className="row header">
                            <h5>TRANSACTION HISTORY</h5>
                        </div>
                        <div className="history">
                            {!history[row.index] && <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="loading-text">Loading transaction history ...</div>
                            </div>}
                            { (history[row.index] && history[row.index].length < 1) && 
                                <i>Nothing to show here</i> }
                            { (!!history[row.index] && history[row.index].length > 0) &&
                                <ul className="list-group">
                                    { history[row.index].map( (item, key) => 
                                        <li className="list-group-item" key={key}>
                                            <div>
                                                <b>{item.learner ? `${item.learner} enrolled to this class.` : item.desc}</b> 
                                                {item.desc && item.desc.toLowerCase().indexOf('payment proof for this transaction has been added/updated') > -1 && <div style={{display: 'inline'}}>
                                                    {tableData[row.index].paymentReference?.status === PAYMENT_PROOF_STATUS.PENDING && <div className="badge badge-secondary ml-3 pl-3 pr-3">PENDING</div>}
                                                    {tableData[row.index].paymentReference?.status === PAYMENT_PROOF_STATUS.ACCEPTED && <div className="badge badge-success ml-3 pl-3 pr-3">VALID</div>}
                                                    {tableData[row.index].paymentReference?.status === PAYMENT_PROOF_STATUS.REJECTED && <div className="badge badge-danger ml-3 pl-3 pr-3">INVALID</div>}
                                                </div>}
                                            </div>
                                            <small>{(new Date(item.createdDateTime)).toUTCString()}</small>
                                            {item.desc && item.desc.toLowerCase().indexOf('payment proof for this transaction has been added/updated') > -1 
                                                && <button style={{display: 'block'}} className="btn btn-warning btn-sm pl-5 pr-5 mt-3" onClick={() => handleClickVerify(tableData[row.index])}>
                                                    {tableData[row.index].paymentReference?.status === PAYMENT_PROOF_STATUS.ACCEPTED ? 'View Payment' : 'Verify Payment'}
                                                </button>}
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )
}

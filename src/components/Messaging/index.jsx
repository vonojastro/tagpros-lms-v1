import React, {Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pusher from 'pusher-js';
// import { getAllMyStudents } from "api/class";
import {
    getAPIKey,
    getCluster,
    getLiveChatRecipients,
    getLiveChatWithRecipients,
    getMyStudents,
    getMyTeachers,
    addLiveMessage} from "api/messages";
import { Autocomplete } from "components/common/Form/Inputs";
import { s3Config } from "../../config";
import S3 from "aws-s3-pro";
import './index.css';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";

const s3Client = new S3(s3Config);

export default function Messaging() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(LocalizedFormat);

    const uploaderRef = useRef();
    const dispatch = useDispatch();
    const [newChat, setNewChat] = useState("");
    const [loading, setLoading] = useState({
        recipients: true, 
        conversation: true, 
        sending: false, 
    });
    const [myContacts, setMyContacts] = useState([]);
    const [composeMessage, setComposeMessage] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState();
    const [recipients, setRecipients] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    // const [fileAttached, setFileAttached] = useState("");

    const { accountId, photo, type } = useSelector((state) => state.auth ? state.auth.user : {});    

    useEffect(() => {
        const pusher = new Pusher(getAPIKey(), {
            cluster: getCluster(),
            encrypted: true
        });
        const channel = pusher.subscribe('Chat');
        channel.bind(`channel-${accountId}`, (data) => {
            console.log("SELECTED RECIPIENT", selectedRecipient);
            console.log("CHAT DATA", data);
            if (selectedRecipient?.accountId === data.from)
            {
                const convoTemp = [...conversation];
                convoTemp.push({
                    'accountId': data.from,
                    'description' :data.description
                });
                setConversation(convoTemp);
                scrollToBottom();
            }
            const recepient = [...recipients];
            let index = recepient.findIndex((item)=>item.accountId === data.from);
            if (index > -1)
            {
                recepient[index].latestChat = data.description;
                setRecipients(recepient);
            }
            
        });

        return () =>{
            pusher.unsubscribe('Chat');
        }
    }, [accountId, conversation, recipients, selectedRecipient]);

  useEffect(() => {
    setLoading(prevState => ({
        ...prevState,
        conversation: true,
        recipients: true
    }));
  
    getLiveChatRecipients(dispatch, (status, data) => {
        setLoading(prevState => ({
            ...prevState,
            recipients: false
        }));

        if(status && data.length > 0){
            setRecipients(data);
            getConversation(data[0]);
        }else{
            setLoading(prevState => ({
                ...prevState,
                conversation: false
            }));
        }
    });
    if(type === 'teacher'){
        getMyStudents(dispatch, (status, data) => {
            if(status){
                setMyContacts(data);
            }
        });
    }else{
        getMyTeachers(dispatch, (status, data) => {
            if(status){
                setMyContacts(data);
            }
        });
    }
    document.getElementById("msgEnd").scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConversation = async (recipient) => {
      console.log("RECIPIENT", recipient);
    setLoading(prevState => ({
        ...prevState,
        conversation: true
    }));
    setComposeMessage(false);
    await setSelectedRecipient(prevState => (recipient));
    getLiveChatWithRecipients(recipient.accountId, dispatch, (status, data) => {
        setLoading(prevState => ({
            ...prevState,
            recipients: false,
            conversation: false
        }));
        
        if(status){
            setConversation(data);
            scrollToBottom();
        }
    });
  }

  const filterConversation = (value) => {
    setFilterValue(value.toLowerCase());
  }

  const scrollToBottom = () => {
    document.getElementById("msgEnd") && document.getElementById("msgEnd").scrollIntoView({ behavior: "smooth" });
  }

  const getFileName = (value) => {
      const file = value.split("/");
      return file[file.length-1];
  }

  const handleOnComposeNewMessage = (contact) =>{
    const tempRecipients = [...recipients];
    const filtered = tempRecipients.filter(item => item.accountId.toString() === contact.accountId.toString());
    if(filtered.length < 1){
        tempRecipients.unshift(contact);
        setSelectedRecipient(contact);
        setRecipients(tempRecipients);
        setConversation([]);
    }else{
        setSelectedRecipient(filtered[0]);
        getConversation(filtered[0]);
    }
    setComposeMessage(false);
  }

  const sendMessage = async (msg, chatType) => {
    if(newChat.trim() === "" && chatType !== 'file') return;
    
    setNewChat("");
    setLoading(prevState => ({
        ...prevState,
        sending: true
    }));

    const messages = [...conversation];
    messages.push({
        accountId,
        description: msg || newChat,
        type: chatType || 'text',
        photo,
        status: 'pending'
    });
    await setConversation(messages);
    scrollToBottom();

    addLiveMessage({recipientId: selectedRecipient.accountId, description: msg || newChat, type: chatType || 'text'}, dispatch, (status) => {
        setLoading(prevState => ({
            ...prevState,
            sending: false
        }));
        if(status){
            const messages2 = [...messages];
            messages2[messages2.length-1].status="sent";
            setConversation(messages2);
        }else{
            const messages2 = [...messages];
            messages2[messages2.length-1].status="failed";
            setConversation(messages2);
        }
    });
  }

  const handleOnKeyUp = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
  }

  const onAttachImage = async (event) => {
    try {
    //   setFileAttached(event.target.files[0]);
        const uploadResponse = await s3Client.uploadFile(event.target.files[0]);
      if (uploadResponse.status === 204) {
        sendMessage(uploadResponse.location, "file");
      }
    } catch (error) {}
  }

  const getDate = (dateTime) =>{
    return dayjs(dateTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Asia/Manila").format("MMMM DD, YYYY");
  }

  const displayDate = (conversations, index) =>{
    if (index === 0)
    {
      return true;  
    }
    else
    {
        if (getDate(conversations[index].updatedDateTime) > getDate(conversation[index-1].updatedDateTime))
        {
            return true;
        }
    }
    return false;
  }

  const getTime = (dateTime) =>{
    return dayjs(dateTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Asia/Manila").format("hh:mm A");
  } 

  return (
    <Fragment>
        <div className="row" style={{height: '75vh'}}>
            <div className="col-4 h-100">
                <div className="card h-100" style={{background: "rgb(255 255 255 / 40%)"}}>
                    <div className="text-center pt-3 pl-4 pr-2 d-flex justify-content-between align-items-center">
                        <h4>Chats</h4>
                        <button className="btn btn-link" data-toggle="tooltip" title="New Message" onClick={() => setComposeMessage(true)}>
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>
                    <div className="m-3">
                        <div style={{ position: "relative" }}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{borderRadius: '20px', paddingRight: '30px'}}
                                    placeholder="Search"
                                    onChange={(e) => filterConversation(e.target.value)}
                                />
                                <span className="input-icon mr-2">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-3 mr-3 mt-2">
                        {loading.recipients && <div className="text-center data-loading">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="loading-text">Loading messages...</div>
                        </div>}
                        {!loading.recipients && (recipients.filter(r => r.name.toLowerCase().indexOf(filterValue) > -1)).map((item, index) => 
                            (<div role="button" className={`p-2 mb-4 d-flex ${((!selectedRecipient && index === 0) || (selectedRecipient && selectedRecipient.accountId === item.accountId)) && 'msg-active'}`} onClick={() => getConversation(item)}>
                                <img
                                    src={item.photo ? item.photo: "./assets/images/anonymous.png"}
                                    alt="user"
                                    height={50}
                                    width={50}
                                    style={{objectFit: 'cover'}}
                                    className="profile-pic"
                                    />
                                <div className="ml-2 pt-3">
                                    <div style={{lineHeight: '1px', marginBottom: '10px'}}>{item.name}</div>
                                    <small style={{fontSize: '12px', color: 'gray'}}>{item.latestChat}</small>
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
            <div className="col-8 h-100">
                <div className="card h-100" style={{background: "rgb(255 255 255 / 40%)"}}>
                    {composeMessage && <div className="card-body el-element-overlay">
                        <div className={`col-md-12`}>
                            <Autocomplete name="salutation" placeholder="To" className='form-control' 
                                suggestions={myContacts} defaultValue={""} 
                                accessor={"name"} onSelect={(selected) => handleOnComposeNewMessage(selected)}/>
                        </div>
                        <div id="msgEnd"></div>
                    </div>}
                    {!composeMessage && <div className="card-body el-element-overlay">
                        <div className="pl-2 pr-2 d-flex">
                            <img
                                src={selectedRecipient?.photo ? selectedRecipient.photo : "./assets/images/anonymous.png"}
                                alt="user"
                                height={50}
                                width={50}
                                style={{objectFit: 'cover'}}
                                className="profile-pic"
                                />
                            <div className="ml-2 d-flex align-items-center">
                                <div><b>{selectedRecipient?.name}</b></div>
                            </div>
                        </div>
                        <hr />
                        {loading.conversation && <div className="text-center data-loading">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="loading-text">Loading conversation...</div>
                        </div>}
                        <div className={`msg-container ${type}`}>
                            {!loading.conversation && conversation.map((item, index) => {
                                item.position = item.accountId === accountId ? 'right' : 'left';
                                return (
                                <div>
                                    {displayDate(conversation, index) && <div className="text-center">{getDate(item.updatedDateTime)}</div>}
                                <div className={`d-flex ${item.position === 'right' ? 'flex-row-reverse':''} 
                                    ${(item.accountId===conversation[index-1]?.accountId) ? 'mt-1':'mt-4'} msg-row`}>
                                    {(index === 0 || (item.accountId!==conversation[index-1]?.accountId)) && <img
                                        src={item.photo ? item.photo: "./assets/images/anonymous.png"}
                                        alt="user"
                                        height={50}
                                        width={50}
                                        style={{objectFit: 'cover'}}
                                        className={`profile-pic ${item.position === 'right' ? 'ml-4':'mr-2'}`}/>}
                                    {item.type !== 'file' && <div className={`${(index === 0 || (item.accountId!==conversation[index-1]?.accountId)) 
                                            ? 'speech-bubble-1':'speech-bubble-2'} ${item.position} ${item.status}`}>
                                        {item.description}
                                    </div>}
                                    {item.type === 'file' && <div className={`${(index === 0 || (item.accountId!==conversation[index-1]?.accountId)) 
                                            ? 'speech-bubble-1':'speech-bubble-2'} ${item.position} ${item.status}`}>
                                        <a href={item.description} target="_blank" rel="noreferrer">
                                            <i className="fa fa-paperclip"> {getFileName(item.description)}</i>
                                        </a>
                                    </div>}
                                    <br/>
                                    
                                    {item.status === 'failed' && <i data-toggle="tooltip" title="Sending Failed" className="fa fa-exclamation-circle"></i>}
                                </div>
                                {<div className={`d-flex ${item.position === 'right' ? 'flex-row-reverse':''} msg-row`} style={{fontSize:'12px', marginLeft: (item.position === 'right') ? '' :'80px', marginRight: (item.position === 'right') ? '80px' : ''}}>{getTime(item.updatedDateTime)} </div>}
                                </div>)
                            })}
                            <div id="msgEnd"></div>
                        </div>
 
                        {/* <input type="file" id="attach-file" hidden/> */}
                        <input
                            name="upload"
                            ref={uploaderRef}
                            type="file"
                            // accept=".png, .jpg, .jpeg"
                            style={{ display: "none" }}
                            onChange={onAttachImage} 
                            />
                        <div style={{bottom: '1rem', position: 'absolute', width: '95%'}}>
                            <div style={{ position: "relative" }} className="d-flex align-items-center align-items-stretch">
                                {/* <button className="btn btn-link">
                                    <i className="fa fa-paperclip"></i>
                                </button> */}
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        // style={{borderRadius: '20px', paddingRight: '35px'}}
                                        // rows={1}
                                        placeholder="Message"
                                        value={newChat}
                                        onKeyUp={(e) => handleOnKeyUp(e)}
                                        onChange={(e) => setNewChat(e.target.value)}
                                    />
                                    <span role="button" className="input-icon mr-3" 
                                        data-toggle="tooltip"
                                        title="Add attachment"
                                        onClick={() => uploaderRef.current.click()}>
                                        <i className="fa fa-paperclip"></i>
                                    </span>
                                </div>
                                <button className="btn btn-primary" type="button" onClick={() => sendMessage()}>
                                    <i className="fa fa-paper-plane"></i>
                                </button>                               
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </Fragment>
  );
}
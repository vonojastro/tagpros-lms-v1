import React from "react";
import { useSelector } from "react-redux";
import { FilePicker } from "react-file-picker";
import { s3Config } from "../../../config";
import S3 from "aws-s3-pro";
import { api } from '../../../api';
import { useState } from "react";
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
const s3Client = new S3(s3Config);

export default function MyDocuments() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);
  const {cvResume, govtId, professionalLicense, refRecommendation, updatedDocumentDates, updatedDatetime} = useSelector((state) => state.teacherApp.data);
  const { accountId} = useSelector((state) => state.auth.user);
  const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx'];
  const IMAGE_EXTENSIONS = ['png', 'jpeg', 'jpg'];
  const [edit, setEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  const [files, setFiles] = useState({
    accountId: accountId,
    cvResume: null,
    professionalLicense: null,
    govtId: null,
    refRecommendation: null
  })
  const [fields] = useState([
    {
      name: 'cvResume',
      file: cvResume,
      date: updatedDocumentDates?.cvResume,
      type: 'file',
      maxSize: 5,
      label: 'Curriculum Vitae/Resume',
      helperText: "Recommended File Size of up to 5MB",
      extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS)
    },
    {
      name: 'professionalLicense',
      file: professionalLicense,
      date: updatedDocumentDates?.professionalLicense,
      type: 'file',
      maxSize: 5,
      label: 'Valid Professional License/Work Portfolio',
      helperText: "Recommended File Size of up to 5MB",
      extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS)
    },
    {
      name: 'govtId',
      file: govtId,
      date: updatedDocumentDates?.govtId,
      type: 'file',
      maxSize: 5,
      label: 'Valid Government Identification',
      helperText: `Driver License, PRC Card, Voter's ID, Passport, SSS, TIN ID, and any City-Government IDs`,
      extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS)
    },
    {
      name: 'refRecommendation',
      file: refRecommendation,
      date: updatedDocumentDates?.refRecommendation,
      type: 'file',
      maxSize: 5,
      label: 'References/Recommendation Letter',
      helperText: "Recommended File Size of up to 5MB",
      extensions: DOCUMENT_EXTENSIONS.concat(IMAGE_EXTENSIONS)
    }
  ])
  
  const downloadFile = async (file) => {
    console.log(file);
    const url = `https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${file}`;
    const data = await fetch(url);
    const blob = await data.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onload = e => {
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = e.target.result;
      tempLink.download = file;
      tempLink.click();
    }
  }

  // let files = 

  const InputHelperText = ({ helperText}) => (
    <div style={{ display: 'flex' }}>
      <div className='m-b-10 font-14 text-dark' style={{ whiteSpace: 'pre-wrap' }}>
        {helperText}
      </div>
    </div>
  );

  const InputLabel = ({ label, noMargin }) => (
    <div
      className={!noMargin ? "m-b-10 card-title input-label" : "input-label"}
    >
      {label} <RequiredMarker />
    </div>
  );

  const RequiredMarker = () => {
    return <span style={{ color: 'red' }}>*</span>;
  };

//   const { change } = useForm();

  const handleFileChange = async (newFile, item) => {
    files[item] = newFile;
    setEdited(true);
  };

  const submit = async () =>{
    if (edited){
      const keys = Object.keys(files);
      let fileNames = [];
      console.log('files', files);

      keys.forEach(item=> {
          if(files[item] !== ""){
              fileNames.push(
                s3Client
                .uploadFile(files[item], `${accountId}-${item}`)
                .then((result) => ({ [item]: result.key }))
                .catch((err) => err)
              );
          }
      });

      if (fileNames.length) {
        fileNames = await Promise.all(fileNames);
        fileNames = fileNames.reduce(
          (acc, curr) => ({ ...acc, [Object.keys(curr)[0]]: curr[Object.keys(curr)[0]] }),
          {}
        );
      }
      let dateTime = new Date();
      fileNames.accountId = accountId;
      console.log(files);
      fileNames.updatedDateTime = {
        "cvResume": files.cvResume !== null ? dateTime : updatedDocumentDates['cvResume'],
        "professionalLicense": files.professionalLicense !== null ? dateTime : updatedDocumentDates['professionalLicense'] ,
        "govtId": files.govtId !== null ? dateTime : updatedDocumentDates['govtId'],
        "refRecommendation": files.refRecommendation !== null ? dateTime : updatedDocumentDates['refRecommendation']
      }
        
      console.log('files', fileNames);
      await api.patch("/teacher/updateDocuments", fileNames).then((response)=>{
          console.log(response.data);
          setFiles({
            accountId: accountId,
            cvResume: null,
            professionalLicense: null,
            govtId: null,
            refRecommendation: null
          }) 

          fields[0].file =response.data.CV_RESUME
          fields[1].file =response.data.PROFESSIONAL_LICENSE
          fields[2].file =response.data.GOVT_ID
          fields[3].file =response.data.REF_RECOMMENDATION

          fields[0].date =response.data.DOCUMENT_UPDATE.cvResume
          fields[1].date =response.data.DOCUMENT_UPDATE.professionalLicense
          fields[2].date =response.data.DOCUMENT_UPDATE.govtId
          fields[3].date =response.data.DOCUMENT_UPDATE.refRecommendation
          // setFields({...fields})
          console.log(fields)
          setEdit(false);
          setEdited(false);
          toast.success("Documents Successfully updated")
      }).catch((error)=>{
          console.log(error);
          toast.error("Documents failed to be updated")
      });
    }else{
      toast.error("No changes Made");
    }
  }

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  return (
    <div className="card-body">
        <div style={{padding: '10px 20px'}}>
            <div style={{borderBottom: '3px #8080805c solid'}} className="row justify-content-between">
                <h5 style={{paddingTop: '10px'}}>Application Documents</h5>
                <button className="btn btn-link" style={{display: 'block'}} onClick={() => {setEdit(true)}}>
                <i className="fas fa-edit"></i><u>Edit</u>
                </button> 
            </div>
        </div>
        <br />
        {/* <Form
          onSubmit={handleSubmit}
        > */}
        
        {fields.map((item)=>(<>
            <div className='d-flex align-items-center '>
              
            <InputLabel label={item.label}/>
                <div className='d-flex m-b-10 m-l-10' style={{ cursor: 'pointer' }}>
                    <p style={{fontSize:"9px", marginTop: '6px'}}> <i class="fas fa-history"></i> Last update at  { dayjs((item?.date !== undefined) ? item?.date : updatedDatetime, "YYYY/MM/DD - HH:mm A").format("h:mm A, MMMM D, YYYY") } </p>
                </div>
            </div>
            <InputHelperText helperText={item.helperText}/>
            <div className="d-flex"> 
           
            <a className="btn btn-link p-0" href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${item.file}`} target="_blank" rel="noreferrer" disabled={edit}>
            <button class={`btn waves-effect waves-light btn-outline-info mb-4 mr-2`} type='button' style={{ width: 150 }} disabled={edit}>View</button>
            </a>
            
                <button class={`btn waves-effect waves-light btn-outline-info mb-4 mr-2`} type='button' style={{ width: 150 }} disabled={edit} onClick={()=> {downloadFile(item.file)}}>Download</button>
                
                {edit && (<FilePicker 
                  onChange={(event) => handleFileChange(event, item.name)}
                  maxSize={item.maxSize}
                  extensions={item.extensions}>
                      <button class={`btn waves-effect waves-light btn-outline-info mb-4`} type='button' style={{ width: 150, padding: '5%' }}>Update File</button>
                  </FilePicker>)}
            </div>
            </>))}
            {edit && (<div className="d-flex justify-content-end">

              <button class={`btn waves-effect waves-light btn-danger mb-4 mr-2`} type='button' style={{ width: 150 }} onClick={()=> {setEdit(false)}}>Cancel</button>
              <button class={`btn waves-effect waves-light btn-info mb-4 mr-2`} type='button' style={{ width: 150 }} onClick={()=> {submit()}}>Save</button>
            
              </div>
            )}
        {/* </Form> */}
    </div>
  );
}

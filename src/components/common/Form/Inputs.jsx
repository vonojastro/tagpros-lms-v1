import { useField, Field, useForm, useFormState } from "react-final-form";
import ReactPlayer from "react-player";
import React, { useRef, useState } from "react";
import { FilePicker } from "react-file-picker";
import { getS3Url } from "utils/teacherApplication";
import ImageUploading from "react-images-uploading";
import "./index.css";
import {  Editor } from "react-draft-wysiwyg";
import {ContentState, EditorState} from "draft-js"
import styled from "styled-components";

const capitalizeFirst = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const RequiredMarker = () => {
  return <span style={{ color: 'red' }}>*</span>;
};

export const Error = ({ name }) => {
  const { submitting } = useFormState();
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } });
  if (!submitting)
    return <div id='error-msg' style={{ fontSize: "80%", color: "#F59C1E" }}>{error}</div>;
  else return <div />;
};

export const InputLabel = ({ label, noMargin, required }) => (
  <div
    className={!noMargin ? "m-b-10 card-title input-label" : "input-label"}
  >
    {label} {required && <RequiredMarker />}
  </div>
);
const InputHelperText = ({ helperText, required }) => (
  <div style={{ display: 'flex' }}>
    {required && (
      <div className='mr-2'>
        <RequiredMarker />
      </div>
    )}
    <div className='m-b-10 font-14 text-dark' style={{ whiteSpace: 'pre-wrap' }}>
      {helperText}
    </div>
  </div>
);

export const RadioInputControl = ({ name, value, label }) => {
  const ref = useRef(null);

  /* Allows clicks to register even though we click on labels */
  const handleClickRadio = () => {
    if (ref) ref.current.click();
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flexShrink: 0 }}>
        <Field name={name} component="input" type="radio" value={value} ref={ref} />
      </div>
      <div className="ml-4" onClick={handleClickRadio} style={{ cursor: "default" }}>
        <InputLabel label={label} noMargin={true} />
      </div>
    </div>
  );
};


export const ImageInputControl = ({ name, label, placeholder, mode }) => {
  const {
    meta: { error, touched },
    input,
  } = useField(name);

  const { change } = useForm();

  const onChange = (imageList, addUpdateIndex) => {
    change(name, imageList[0].file);
  };

  // const [mouseEntered, setMouseEntered] = useState(false);

  return (
    <ImageUploading onChange={onChange} maxNumber={1}>
      {({ onImageUpload, dragProps }) => (
        <div
          className="image-input__container"
          // onMouseEnter={() => setMouseEntered(true)}
          // onMouseLeave={() => setMouseEntered(false)}
          onClick={onImageUpload}
          {...dragProps}
        >
          <div
            className={`image-input ${error && touched ? "image-input__error" : ""} `}
            style={{
              backgroundImage:
                mode === "view"
                  ? !input.value
                    ? "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.delvinia.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fplaceholder-headshot.png&f=1&nofb=1)"
                    : `url(${input.value})`
                  : !input.value
                  ? "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.delvinia.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fplaceholder-headshot.png&f=1&nofb=1)"
                  : input.value.name
                  ? `url(${URL.createObjectURL(input.value)})`
                  : `url(${getS3Url(input.value)})`,
              backgroundSize: "cover"
            }}
          ></div>
          {error && touched && (
            <div className="mt-2 text-center">
              <Error name={name} />
            </div>
          )}

          <div className="image-input__helper-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: 20, width: 20, marginRight: 5 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className=".image-input--hover__text">Update Photo</div>
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

export const FileInputControl = ({
  name,
  label,
  placeholder,
  helperText,
  maxSize,
  extensions,
  disabled,
  fileType,
  required,
  ...otherProps
}) => {
  const {
    meta: { error, touched },
  } = useField(name);
  const { change } = useForm();
  const handleFileChange = (newFile) => {
    change(name, newFile);
  };
  return (
    <Field name={name}>
      {props => (
        <div>
          {label && (
            <div className='d-flex align-items-center'>
              <InputLabel label={label} required={required} />
              {props.input.value ? (
                <div className='d-flex m-b-10 m-l-10' style={{ cursor: 'pointer' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    style={{ height: 20, width: 20, color: 'green' }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  {props.input.value.name ? (
                    <a
                      download={props.input.value.name}
                      className='font-bold font-14 text-primary'
                      href={props.input.value}
                    >
                      View
                    </a>
                  ) : (
                    <a
                      target='_blank'
                      href={getS3Url(props.input.value)}
                      rel='noreferrer'
                      className='font-bold font-14 text-primary'
                    >
                      View
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          )}
          {helperText && (
            <InputHelperText
              helperText={helperText}
              required={(!label || !label.trim().length) && required}
            />
          )}
          <div style={{ position: 'relative' }}>
            <div>
              {fileType === 'video' &&
                ((props.input.value.name && (
                  <ReactPlayer
                    autoPlay
                    url={window.URL.createObjectURL(props.input.value)}
                    style={{ marginBottom: 10 }}
                    width={'100%'}
                    controls
                    height={'100%'}
                  />
                )) || (
                  <ReactPlayer
                    autoPlay
                    url={getS3Url(props.input.value)}
                    style={{ marginBottom: 10 }}
                    width={'100%'}
                    controls
                    height={'100%'}
                  />
                ))}
              {!disabled && (
<React.Fragment>
                <FilePicker
                  onChange={handleFileChange}
                  onError={errMsg => alert(errMsg)}
                  playing
                  maxSize={maxSize}
                  extensions={extensions}
                >
                  <button
                    class={`btn waves-effect waves-light ${
                      props.input.value ? 'btn-info' : 'btn-outline-info'
                    }  `}
                    type='button'
                    style={{ width: 150 }}
                  >
                    {props.input.value ? 'Update' : 'Choose'}{' '}
                    {(fileType === 'video' && 'video') || 'file'}
                  </button>
                </FilePicker>
            {error && touched && (
              <div className="mt-3">
                <Error name={name} />
              </div>
            )}
</React.Fragment>
              )}
              {/* {props.input.value ? (
                <div className="font-10 m-t-10 badge badge-secondary">
                  {props.input.value.name || props.input.value}
                </div>
              ) : (
                <div />
              )} */}
            </div>
          </div>
        </div>
      )}
    </Field>
  );
};

export const TextAreaControl = ({
  name,
  label,
  placeholder,
  helperText,
  required,
  ...otherProps
}) => {
  const {
    meta: { error, touched },
  } = useField(name);

  return (
    <Field name={name}>
      {(props) => (
        <div>
          {label && <InputLabel label={label} />}
          {helperText && <InputHelperText helperText={helperText}
              required={(!label || !label.trim().length) && required}
          />}
          <div style={{ position: "relative" }}>
            <textarea
              name="classDescription"
              {...props.input}
              class="form-control"
              style={{
                background: "#EBEBEB",
                padding: 10,
                outline: error && touched ? "#F59C1E solid 3px" : "none",
              }}
              id="exampleFormControlTextarea1"
              spellcheck="true"
              placeholder={
                placeholder ? placeholder : label ? label : capitalizeFirst(name)
              }
              {...otherProps}
            ></textarea>
            {error && touched && (
              <div style={{ position: "absolute", bottom: -20 }}>
                <Error name={name} />
              </div>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};

export const CheckboxArrayControl = ({ name, options }) => {
  const { submitting } = useFormState({ subscription: { submitting: true } });
  return options.map(({ value, label }, index) => (
    <div key={value + name + index}>
      <Field
        disabled={submitting}
        name={name}
        component={'input'}
        type='checkbox'
        value={value}
        id={value + name + index}
      />
      <label htmlFor={value + name + index}>{label}</label>
    </div>
  ));
};

export const CheckBoxControl = ({
  name,
  label,
  placeholder,
  helperText,
  required,
  component,
  ...otherProps
}) => {
  const {
    meta: { error, touched },
  } = useField(name);

  return (
    <Field name={name} type="checkbox" {...( !!component ) && {component}}>
      {(props) => (
        <div>
          {helperText && <InputHelperText helperText={helperText}  />}
          <div style={{ position: "relative" }} className="checkbox checkbox-control">
            <ul className="list-task todo-list list-group m-b-0" data-role="tasklist">
              <li className="list-group-item" data-role="task">
                <div className="checkbox checkbox-info">
                  <input {...props.input} id={name} {...otherProps} type="checkbox" />
                  <label for={name}>{label && <InputLabel required={required} label={label} />}</label>
                </div>
              </li>
            </ul>
            {error && touched && (
              <div style={{ position: "absolute", top: 40 }}>
                <Error name={name} />
              </div>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};

export const InputControl = ({ name, label, placeholder, type, helperText, required, format, ...otherProps }) => {
  const {
    meta: { error, touched },
  } = useField(name);

  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)
  const { submitting } = useFormState({ subscription: { submitting: true } });

  // useEffect(() => {
  //   if(inputRef?.current) {
  //     setShowPassword(inputRef.current.type)
  //   }
  // }, [inputRef?.current?.type])

  const toggleShowPassword = () => {
    inputRef.current.type = showPassword ? "password" : "text"
    setShowPassword(!showPassword)
  }
  
  return (
    <Field name={name} type={type} {...( !!format ) && {format}} formatOnBlur>
      {props => (
        <div>
          {label && <InputLabel required={required} label={label} />}
          {helperText && <InputHelperText helperText={helperText} />}
          <div style={{ position: 'relative' }}>
            <input
              disabled={submitting}
              ref={inputRef}
              {...props.input}
              className='form-control'
              placeholder={
                placeholder ? placeholder : label ? label : capitalizeFirst(name)
              }
              {...otherProps}
              onKeyDown={(e) => {
                if(type==='date'){
                  e.preventDefault()
                }
              }}
            />
            {error && touched && (
              <div style={{ position: 'absolute', top: 40 }}>
                <Error name={name} />
              </div>
            )}
            {type === 'password' && (
              <i
                className={ `far ${showPassword ? 'fa-eye-slash':'fa-eye'} position-absolute d-inline-block` }
                onClick={toggleShowPassword}
                style={{
                  right: 20,
                  top: 10,
                  cursor:'pointer'
                }}
              />
            )}
          </div>
        </div>
      )}
    </Field>
  );
};

export const InputPasswordControl = ({ name, label, placeholder, type, helperText, ...otherProps }) => {
  const {
    meta: { error, touched },
  } = useField(name);

  const [inputType, setType] = useState('password');

  const showHidePassword = () => {
    setType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <Field name={name}>
      {(props) => (
        <div>
          {label && <InputLabel label={label} />}
          {helperText && <InputHelperText helperText={helperText} />}
          <div style={{ position: "relative" }}>
            <div className="input-group">
              <input
                {...props.input}
                className="form-control"
                placeholder={
                  placeholder ? placeholder : label ? label : capitalizeFirst(name)
                }
                type = {inputType}
                {...otherProps}
              />
              {inputType === 'password' ? (
                    <span className="input-icon" onClick={showHidePassword}>
                      <i className="far fa-eye-slash"></i>
                    </span>
                  ) : (
                    <span className="input-icon" onClick={showHidePassword}>
                      <i className="far fa-eye"></i>
                    </span>
                  )
              }
            </div>
            {error && touched && (
              <div style={{ position: "absolute", top: 40 }}>
                <Error name={name} />
              </div>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};

export const SelectControl = ({
  name,
  label,
  options,
  required = true
  // placeholder,
  // helperText,
  // ...otherProps
}) => {
  const {
    meta: { error, touched },
  } = useField(name);

  return (
    <div style={{ position: 'relative' }}>
      {label && <InputLabel required={required} label={label} />}
      <div style={{ position: 'relative' }}>
        <Field name={name} component='select'>
          <option value={null}>-</option>
          {options.map(({ label, value }) => (
            <option value={value}>{label}</option>
          ))}
        </Field>
        {error && touched && (
          <div style={{ position: 'absolute', bottom: -25 }}>
            <Error name={name} />
          </div>
        )}
      </div>
    </div>
  );
};

export const CheckboxGroupControl = ({ options, name }) => {
  return (
    <div>
      {options.map(({ label, value }) => (
        <div className="d-flex">
          <Field name={name} component="input" type="checkbox" value={value} />
          <label className="ml-2">{label}</label>
        </div>
      ))}
    </div>
  );
};

export const Autocomplete = ({suggestions, name, className, defaultValue, onBlur, onSelect, accessor, ...otherProps}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const applyFilter = (value) => {
    const val = suggestions.filter(item => {
      const v = accessor ? item[accessor] : item;
      return v.toLowerCase().indexOf(value.toLowerCase()) === 0
    });
    setFilteredSuggestions(val);
  }

  const handleKeyUp = (event) => {
    applyFilter(event.target.value);
  }

  const handleBlur = (event) => {
    if(onBlur){
      setTimeout(() => {
        setShowSuggestion(false)
      }, 800);
      onBlur(event);
    }
  }

  const handleSuggestionClick = (item, hide) => {
    document.getElementById('autocomplete-select').value = (accessor && item[accessor] !== undefined) ? item[accessor] : item;
    if(hide){
      setShowSuggestion(false);
      onSelect && onSelect(item);
      setCurrentValue(item);
    }
  }

  const handleOnFocus = (event) => {
    if(event.target.value){
      applyFilter(event.target.value);
    }
    setShowSuggestion(true);
  }

  return (
    <div className="autocomplete">
      <input id="autocomplete-select" className={className} type="text" autocomplete="off"
          name={name} defaultValue={(accessor && defaultValue[accessor] !== undefined) ? defaultValue[accessor] : defaultValue} onChange={(e) => setCurrentValue(e.target.value)}
          onFocus={handleOnFocus} onKeyUp={handleKeyUp} {...otherProps} onBlur={handleBlur}/>

      {showSuggestion && <div className="suggestions">
        {filteredSuggestions.map((item, key) => 
          (<p key={key} onClick={() => handleSuggestionClick(item, true)} onMouseEnter={() => handleSuggestionClick(item, false)}
            onMouseLeave={() => handleSuggestionClick(currentValue, false, 'leave')}>
              {accessor ? item[accessor] : item}
          </p>))}
          
      </div>}
    </div>
  )
}

const CustomEditor = props => {
  const {
    input: { onBlur, onFocus, onChange },
    placeholder 
  } = props;
  console.info(props.afterSubmit)
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(''))
  );
  // const { submitSucceeded } = useFormState()

  // useEffect(() => {
  //   if (submitSucceeded) {
  //     alert("SUCCEEDED")
  //     setEditorState(EditorState.createWithContent(ContentState.createFromText('')));
  //     onChange(EditorState.createWithContent(ContentState.createFromText('')));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [submitSucceeded])
  
  return (
    <div className='w-100 h-100 position-relative'>
      <Editor
        placeholder={placeholder}
        editorStyle={{ width: '100%', maxWidth: '100%' }}
        wrapperStyle={{ width: '100%', maxWidth: '100%', position: 'absolute', height: '100%', maxHeight: '100%' }}
        onEditorStateChange={e => {
          setEditorState(e);
          onChange(e);
        }}
        editorState={editorState}
        defaultEditorState={editorState}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

const ControlledEditorWrapper = styled.span`color: black`
export const ControlledEditor = props => {
  const { name, placeholder } = props;
  return (
    <ControlledEditorWrapper>
      <Field
        name={name}
        component={CustomEditor}
        placeholder={placeholder}
        defaultValue={EditorState.createWithContent(ContentState.createFromText(''))}
      />
    </ControlledEditorWrapper>
  );
};

export const TimePicker = ({name, step, suggestions, defaultValue, onChange, onBlur, onSelect, accessor, otherProps}) => {
  const [minuteStep] = useState(step || 1);
  const [currentValue, setCurrentValue] = useState({});
  const [showPicker, setShowPicker] = useState(false);

  const timeInput = React.createRef();

  const getValue = () => {
    if(!defaultValue) return {};

    const hour = parseInt(defaultValue.split(":")[0], 10);

    setCurrentValue({
      hour: hour > 12 ? (hour-12) 
        : (hour === 0 ? 12 : hour),
      minute: parseInt(defaultValue.split(":")[1], 10),
      format: parseInt(defaultValue.split(":")[0], 10) < 12 ? "AM" : "PM",
    });
  }

  const getDefault = (time) => {
    console.log('getDefault', time);
    if(!time || time==="") return ""
    
    const hour = parseInt(time.split(":")[0], 10);
    const hour2 = hour > 12 ? (hour-12) 
      : (hour === 0 ? 12 : hour);
    const minute = parseInt(time.split(":")[1], 10);
    const format = parseInt(time.split(":")[0], 10) < 12 ? "AM" : "PM";

    return `${String(hour2).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${format}`;
  }

  const handleClickPicker = async (status) => {
    getValue(defaultValue);
    setShowPicker(status);
    if(status){
      setTimeout(() => {
        document.getElementById("timepicker").focus();
      }, 100);
    }
  }

  const handlePickerFocus = () => {
    if(!!currentValue.hour){
      document.getElementById(`hour-${currentValue.hour}`).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  const handleClickCancel = () => {
    setShowPicker(false);
    getValue();
  }

  const handleClickOk = () => {
    const time = `${String(currentValue.hour).padStart(2, '0')}:${String(currentValue.minute).padStart(2, '0')} ${currentValue.format}`;
    timeInput.current.value = time;
    timeInput.current.click();
    setShowPicker(false);
  }

  return (
    <div className="autocomplete">
        <div className="input-group" role="button" onClick={() => handleClickPicker(!showPicker)}>
          <input id={name} className="form-control" 
              name={name} {...otherProps} defaultValue={getDefault(defaultValue)} 
              ref={timeInput} onClick={onChange} onKeyDown={(e) => e.preventDefault()} readonly/>
          <span className="input-icon mr-2">
            <i className="fas fa-clock"></i>
          </span>
        </div>

        {showPicker && <div className="timepicker" id="timepicker" tabIndex="0" onFocus={handlePickerFocus}>
            <div className="d-flex flex-row align-items-stretch">
                <div className="col-4 p-0 selection">
                    {[...Array(12)].map((hour, i) => (
                      <span 
                        role="button" id={`hour-${(i+1)}`} 
                        className={(i+1)===currentValue.hour ? 'selected' : ''}
                        onClick={() => setCurrentValue({...currentValue, hour: (i+1)})}
                      >{String((i+1)).padStart(2, '0')}</span>
                    ))}
                </div>
                <div className="col-4 p-0 selection">
                    {[...Array(61)].map((minute, i) => (((i)%minuteStep) === 0 ? (
                      <span 
                        role="button" id={`minute-${(i)}`} 
                        className={i===currentValue.minute ? 'selected':''}
                        onClick={() => setCurrentValue({...currentValue, minute: i})}
                      >{String(i).padStart(2, '0')}</span>
                    ) : ""))}
                </div>
                <div className="col-4 p-0">
                    <span role="button" onClick={() => setCurrentValue({...currentValue, format: "AM"})} className={currentValue.format==="AM" ? 'selected' : ''}>AM</span>
                    <span role="button" onClick={() => setCurrentValue({...currentValue, format: "PM"})} className={currentValue.format==="PM" ? 'selected' : ''}>PM</span>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end" style={{borderTop:"1px gray solid", padding: "4px"}}>
                <button className="btn btn-ghost-primary" onClick={handleClickCancel}>Cancel</button>
                <button className="btn btn-info" onClick={handleClickOk}>OK</button>
            </div>
        </div>}
    </div>
  )
}

import React, { Component, Fragment } from "react";
// import { getS3Url } from "utils/teacherApplication";
import { s3Config } from "../../../config";
import S3 from "aws-s3-pro";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Uploader } from "../Uploader";
// import PlyrReact from "./PlyrReact";
// import YoutubeLinkInput from "./YoutubeLinkInput";
import { api } from "../../../api";
import { OverlayTrigger, Popover, PopoverContent, PopoverTitle } from "react-bootstrap";
import ReactPlayer from "react-player";
import './index.css';
import { toast } from "react-toastify";
import moment from 'moment';

const s3Client = new S3(s3Config);
export default class RecordedClass extends Component {
  constructor() {
    super();
    this.titleRef = React.createRef();
    this.uploaderRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.addToLectures = this.addToLectures.bind(this);
  }

  state = {
    id: "",
    title: "",
    description: "",
    content: "",
    recommendedDueDate: null,
    videoType: "upload",
    videoLink: "",
    questionContent: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 1,
    questions: [],
    errorUpdate: false,
    submitLoading: false,
    modalAction: 'Add',
    modalType: 'Module',
    subjectIndex: null,
    chapterIndex: null,
    topicIndex: null,
    isUploading: false
  };

  onButtonClick = () => {
    this.props.nextButton(4, this.state, "recorded");
  };

  onInputChange = (name, value) => {
    this.setState({ [name]: value });
  }

  addYTLink = (link) => {
    this.setState({
      videoLink: link,
      videoType: "youtube",
      showYTInput: false,
    });
  };

  updateVideoPath = ({ src }) => {
    this.setState({ videoLink: src, videoType: "mp4" });
  };

  onUploadVideo = async (event) => {
    this.setState({isUploading: true});
    const uploadResponse = await s3Client.uploadFile(event.target.files[0]);
    if (uploadResponse.status === 204) {
      this.setState({ videoLink: uploadResponse.location});
      this.setState({isUploading: false});
    }else{
      this.setState({isUploading: false});
    }
  };

  setModalInfo = (action, type, subjectIndex, chapterIndex) => {
    this.setState({modalAction: action, modalType: type, subjectIndex, chapterIndex});
  }

  handleOnClickAdd = () => {
    const details = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      videoType: this.state.videoType,
      videoLink: this.state.videoLink,
      questions: this.state.questions,
      type: this.state.modalType.toLowerCase(),
      recommendedDueDate: this.state.recommendedDueDate
    }

    switch(this.state.modalType.toLowerCase()){
      case 'module': this.addToLectures(details); break;
      case 'chapter': this.addToChapters(details); break;
      case 'topic': this.addToTopics(details); break;
      default:
    }
  }

  addToLectures = async (details, type) => {
    let responseStatus = false;
    this.setState({submitLoading: true});
    if (this.state.modalAction === 'Add'){
      await this.props.addLecture(details, (status) => {responseStatus = status});
    }else{
      await this.props.editLecture(this.state.subjectIndex, details, (status) => {responseStatus = status});
    }

    if(responseStatus){
      document.getElementById("module-modal-close").click();
      this.onClose();
    }
    this.setState({submitLoading: false});
  };

  removeFromLectures = (key) => {
    this.props.removeLecture(key);
  };

  editLecture = (index, type) => {
    this.setModalInfo('Update', type);
    this.setState((prevState) => ({
      ...prevState,
      subjectIndex: index,
      ...this.props.addedLectures[index],
      recommendedDueDate: moment(this.props.addedLectures[index].recommendedDueDate).format('YYYY-MM-DD'),
    }));
  };

  // addToChapters = async (details) => {
  //   let responseStatus = false;
  //   this.setState({submitLoading: true});
  //   if (this.state.modalAction === 'Add'){
  //     await this.props.addChapter(this.state.subjectIndex, details, (status) => {responseStatus = status});
  //   }else{
  //     await this.props.editChapter(this.state.subjectIndex, this.state.chapterIndex, details, (status) => {responseStatus = status});
  //   }
  //   if(responseStatus){
  //     document.getElementById("module-modal-close").click();
  //     this.resetModalValues();
  //   }
  //   this.setState({submitLoading: false});
  // }

  // removeFromChapters = (subjectIndex, chapterIndex) => {
  //   this.props.removeChapter(subjectIndex, chapterIndex);
  // };

  // addToTopics = async (details) => {
  //   let responseStatus = false;
  //   this.setState({submitLoading: true});
  //   if (this.state.modalAction === 'Add'){
  //     await this.props.addTopic(this.state.subjectIndex, this.state.chapterIndex, details);
  //   }else{
  //     await this.props.editTopic(this.state.subjectIndex, this.state.chapterIndex, this.state.topicIndex, details);
  //   }
  //   this.setState({submitLoading: false});
  //   if(responseStatus){
  //     document.getElementById("module-modal-close").click();
  //     this.resetModalValues();
  //   }
  // }

  // removeFromTopics = (subjectIndex, chapterIndex, topicIndex) => {
  //   this.props.removeTopic(subjectIndex, chapterIndex, topicIndex);
  // };

  // editChapter = (subjectIndex, chapterIndex, type) => {
  //   this.setModalInfo('Update', type);
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     subjectIndex,
  //     chapterIndex,
  //     ...this.props.addedLectures[subjectIndex].chapters[chapterIndex]
  //   }));
  // };

  // editTopic = (subjectIndex, chapterIndex, topicIndex, type) => {
  //   this.setModalInfo('Update', type);
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     subjectIndex,
  //     chapterIndex,
  //     topicIndex,
  //     ...this.props.addedLectures[subjectIndex].chapters[chapterIndex].topics[topicIndex]
  //   }));
  // };

  // resetModalValues = () => {
  //   document.getElementById("module-modal-close").click();
  //   this.setState({ title: "", description: "", content: "", videoLink: "", videoType: "external", questions:[], recommendedDueDate: null});
  // }

  handleAddQuestion = () => {
    const questions = [...this.state.questions];
    const choiceKeys = ["choice1", "choice2", "choice3", "choice4"];
    const newQuestion = {
      questionContent: this.state.questionContent,
      choices: choiceKeys.map((item, index) => ({
        choiceContent: this.state[item],
        isAnswer: (index+1) === this.state.answer
      }))
    };
    questions.push(newQuestion);
    this.setState({questions, choice1: "", choice2: "", choice3: "", choice4: "", answer: 1, questionContent: ""});
  }

  removeFromQuestions = async(index) => {
    if(this.state.questions[index].questionId){
      try {
        // setLoading(true);
        await api.post("/class-creation/deleteQuestion", {
          questionId: this.state.questions[index].questionId,
        }).then(() => {
          const questions = [...this.state.questions];
          questions.splice(index, 1);
          this.setState({questions});
        });
      } catch (error) {
        console.log(error);
        toast.success('Failed removing question. Please try again later.');
      }
    }else{
      const questions = [...this.state.questions];
      questions.splice(index, 1);
      this.setState({questions});
    }
  }

  onClose = () => {
    this.setState({ title: "", description: "", content: "", videoLink: "", videoType: "external", questions:[], recommendedDueDate: null});
    document.getElementById("module-updateForm").reset();
    document.getElementById("module-modal-close").click();
  }

  popover = (details) => {
    console.log('details', details);
    const content = <Popover id="popover-basic" style={{maxWidth: 'initial', width: '48%'}}>
        <PopoverTitle as="h3">
          <b>{details.title}</b>
        </PopoverTitle>
        
        <hr className="mt-0 ml-2 mr-2"/>
        
        <PopoverContent>
          <fieldset className="fieldset-border">
            <legend className="fieldset-border"><b>Description</b></legend>
            {details.description}
          </fieldset>
          <fieldset className="fieldset-border mb-2">
            <legend className="fieldset-border"><b>Content</b></legend>
            {details.content}
          </fieldset>
          <div className="d-flex justify-content-center">
            <ReactPlayer
              autoPlay
              url={details.videoLink}
              style={{ marginBottom: 10 }}
              width={"auto"}
              controls
              height={"auto"}
            />
          </div>
          <fieldset className="fieldset-border">
            <legend className="fieldset-border"><b>Quiz</b></legend>
            {details.questions && details.questions.length > 0 && <div>
              <ol type="1" className="list-group ml-3">
                {details.questions.map((question) => (
                  <li>
                    {question.questionContent}
                    <div className="ml-2 row row-cols-2">
                      {question.choices.map(choice => (
                        <div className={`col ${choice.isAnswer.toString() === 'true'  && 'answer'}`}> • {choice.choiceContent}</div>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
              <hr />
            </div>}
          </fieldset>
        </PopoverContent>
      </Popover>

    console.log('content', content);
    return(
      content
    )
  }

  render() {
    return (
      <Fragment>  
        <hr />

        {/* Lecture list */}
        <div className="mt-2" id="accordionExample">
          {this.props.addedLectures.map((item, index) => (
            <div className="subject-container">
              <div id={`heading-${index}`} className="d-flex pr-2 align-items-center subject-header">
                <div className="subject-counter p-2">{index+1}</div>
                <div className="subject-title p-2" role="button" data-toggle="collapse" data-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
                  <b>{item.title}</b>
                  {item.chapters && item.chapters.length > 0 && <span style={{fontSize: '11px', color: 'gray', display: 'block'}}>{item.chapters.length} Chapter/s</span>}
                </div>
                <div class="dropdown ml-auto p-2">
                  <button class="btn btn-link" type="button" id={`dropdownMenu-${index}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby={`dropdownMenu-${index}`}>
                    {/* <button class="dropdown-item" type="button" data-target="#exampleModal"
                      data-toggle="modal" onClick={() => this.setModalInfo('Add', 'Chapter', index)}>Add Chapter</button> */}
                    <button class="dropdown-item" type="button" data-target="#exampleModal"
                      data-toggle="modal" onClick={() => this.editLecture(index, 'Module')}>Edit Module</button>
                    <button class="dropdown-item" type="button" onClick={() => this.removeFromLectures(index)}>Delete Module</button>
                  </div>
                </div>
              </div>
              <div id={`collapse-${index}`} className="collapse" aria-labelledby={`heading-${index}`} data-parent="#accordionExample">
                <div className="card-body">
                  {item.description && <div><b>Description: </b> {item.description}<hr /></div>}
                  
                  {item.content && <div><b>Content: </b> {item.content} <hr/></div>}
                  {item.videoLink && <div>
                    <div className="d-flex justify-content-center">
                      <ReactPlayer
                        autoPlay
                        url={item.videoLink}
                        style={{ marginBottom: 10 }}
                        width={"100%"}
                        controls
                        height={"auto"} />
                    </div>
                    <hr />
                  </div>}
                  {item.recommendedDueDate && <div><b>Recommended Due Date: </b> {moment(item.recommendedDueDate).format("MM-DD-YYYY")} <hr/></div>}
                  {item.questions && item.questions.length > 0 && <div>
                    <b>Quiz: </b>
                    <ol type="1" className="list-group ml-3">
                      {item.questions.map((question) => (
                        <li>
                          {question.questionContent}
                          <div className="ml-2 row row-cols-2">
                            {question.choices.map(choice => (
                              <div className={`col ${choice.isAnswer.toString() === 'true' && 'answer'}`}> • {choice.choiceContent}</div>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ol>
                    <hr />
                  </div>}
                  <div>
                    <ol type="I">
                      {item.chapters && item.chapters.map((chapter, chapterIndex) => (<li>
                        <div className="d-flex justify-content-between align-items-center">
                          {/* <button className="btn btn-link">Coffee</button> */}
                          <OverlayTrigger trigger="click" placement="right" rootClose="true" overlay={this.popover(chapter)}>
                            <button className="btn btn-link pb-0 pt-0">
                              {chapter.title}
                            </button>
                          </OverlayTrigger>
                          <div class="dropdown ml-auto">
                            <button class="btn btn-link pb-0 pt-0" type="button" id={`dropdownChapter-${chapterIndex}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby={`dropdownChapter-${chapterIndex}`}>
                              <button class="dropdown-item" type="button" data-target="#exampleModal"
                                data-toggle="modal" onClick={() => this.setModalInfo('Add', 'Topic', index, chapterIndex)}>Add Topic</button>
                              <button class="dropdown-item" type="button" data-target="#exampleModal"
                                data-toggle="modal" onClick={() => this.editChapter(index, chapterIndex, 'Chapter')}>Edit Chapter</button>
                              <button class="dropdown-item" type="button" onClick={() => this.removeFromChapters(index, chapterIndex)}>Delete Chapter</button>
                            </div>
                          </div>
                        </div>
                        <ul>
                          {chapter.topics && chapter.topics.map((topic, topicIndex) => (<li>
                            <div className="d-flex justify-content-between align-items-center">
                              <OverlayTrigger trigger="click" placement="right" rootClose="true" overlay={this.popover(topic)}>
                                <button className="btn btn-link pb-0 pt-0">
                                  {topic.title}
                                </button>
                              </OverlayTrigger>
                              <div class="dropdown ml-auto">
                                <button class="btn btn-link" type="button" id={`dropdownTopic-${topicIndex}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby={`dropdownTopic-${topicIndex}`}>
                                  <button class="dropdown-item" type="button"  data-target="#exampleModal"
                                    data-toggle="modal" onClick={() => this.editTopic(index, chapterIndex, topicIndex, 'Topic')}>Edit Topic</button>
                                  <button class="dropdown-item" type="button" onClick={() => this.removeFromTopics(index, chapterIndex, topicIndex)}>Delete Topic</button>
                                </div>
                              </div>
                            </div>
                          </li>))}
                        </ul>
                      </li>))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="subject-container no-content">
            <div id="headingTwo" className="d-flex">
              <div className="subject-counter">#</div>
              <button className="btn btn-link" 
                data-target="#exampleModal"
                data-toggle="modal"
                data-original-title="Edit"
                onClick={() => this.setModalInfo('Add', 'Module')}>
                  Click to Add Module
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade subject-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {`${this.state.modalAction} ${this.state.modalType}`} {this.state.modalType === 'Chapter' && <span>- {this.props.addedLectures[this.state.subjectIndex].title}</span>}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onClose()}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    {!!this.state.errorUpdate && <div className="alert alert-warning text-center text m-t-20"
                        style={{ fontSize: 10 }}>
                        <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => {this.setState({errorUpdate: false})}}></i>
                        <span className="font-weight-bold" style={{ fontSize: 12 }}>
                            Something went wrong.
                        </span>
                        <br />
                        Please try again later.
                    </div>}
                    <div className="modal-body">
                        {/* <button class="btn btn-primary" type="submit">Submit form</button> */}
                        <form className="row" id="module-updateForm">
                            <div className="col-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                      <div>
                                          <h6 className="modal-title" id="exampleModalLabel">Title<small style={{color: 'red'}}>*</small></h6>
                                          <div className="form-group mb-3">
                                              <input type="text" className="form-control" name="title" value={this.state.title}
                                                onChange={(e) => this.onInputChange(e.target.name, e.target.value)}/>
                                          </div>
                                      </div>
                                      <div>
                                          <h6 className="modal-title" id="exampleModalLabel">Description<small style={{color: 'red'}}>*</small></h6>
                                          <div className="form-group mb-3">
                                              <textarea rows="2" className="form-control" name="description" value={this.state.description}
                                                onChange={(e) => this.onInputChange(e.target.name, e.target.value)}/>
                                          </div>
                                      </div>
                                      <div>
                                          <h6 className="modal-title" id="exampleModalLabel">Content<small style={{color: 'red'}}>*</small></h6>
                                          <div className="form-group mb-3">
                                              <textarea rows="4" className="form-control" name="content" value={this.state.content}
                                                onChange={(e) => this.onInputChange(e.target.name, e.target.value)}/>
                                          </div>
                                      </div>
                                      <div className="mb-4">
                                          <h6 className="modal-title" id="exampleModalLabel">Video<small style={{color: 'red'}}>*</small></h6>
                                          <div className="d-flex">
                                            <select name="videoType" value={this.state.videoType}
                                              onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
                                              className="custom-select lms-portal-select"
                                              classNamePrefix="select">
                                              <option value="" disabled>Select Video Source</option>
                                              <option value="external">External Link</option>
                                              <option value="upload">Upload</option>
                                            </select>
                                            {this.state.videoType === 'upload' && <button type="button" className="btn btn-info ml-2 col-3" onClick={() => this.uploaderRef.current.click()} disabled={this.state.isUploading}>
                                              <span style={{ display: this.state.isUploading ? 'inline-block' : 'none' }} className="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                              Choose File
                                            </button>}
                                            
                                          </div>
                                          <input
                                              name="upload"
                                              ref={this.uploaderRef}
                                              type="file"
                                              accept=".mp4, .mov"
                                              style={{ display: "none" }}
                                              onChange={this.onUploadVideo}
                                            />
                                      </div>
                                      {this.state.videoType==='external' && <div>
                                          <h6 className="modal-title" id="exampleModalLabel">Video Link<small style={{color: 'red'}}>*</small></h6>
                                          <div className="form-group mb-3">
                                              <input type="text" className="form-control" name="videoLink" value={this.state.videoLink}
                                                onChange={(e) => this.onInputChange(e.target.name, e.target.value)} disabled={this.state.videoType !== "external"}/>
                                          </div>
                                      </div>}
                                      <div className="d-flex justify-content-center">
                                        <ReactPlayer
                                          autoPlay
                                          url={this.state.videoLink}
                                          style={{ marginBottom: 10 }}
                                          width={"100%"}
                                          controls
                                          height={"auto"}
                                        />
                                      </div>
                                      <div>
                                          <h6 className="modal-title" id="exampleModalLabel">Recommended Due Date<small style={{color: 'red'}}>*</small></h6>
                                          <div className="form-group mb-3">
                                                <input
                                                  type="date"
                                                  className="form-control"
                                                  id="recommendedDueDate"
                                                  name="recommendedDueDate"
                                                  min={this.props.availabilityStartDate}
                                                  max={this.props.availabilityEndDate}
                                                  value={this.state.recommendedDueDate}
                                                  onKeyDown={(e) => e.preventDefault()}
                                                  onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
                                                />
                                          </div>
                                      </div>
                                      <fieldset className="fieldset-border">
                                        <legend className="fieldset-border"><b>Quiz</b><small style={{color: 'red'}}>*</small></legend>
                                        <ol type="1" className="list-group ml-3">
                                          {this.state.questions.map((item, qIndex) => (
                                            <li>
                                              <div className="d-flex justify-content-between">
                                                <div>
                                                  {item.questionContent}
                                                  <div className="ml-2 row row-cols-2">
                                                    {item.choices.map(choice => (
                                                      <div className={`col ${choice.isAnswer.toString() === 'true' && 'answer'}`}> • {choice.choiceContent}</div>
                                                    ))}
                                                  </div>
                                                </div>
                                                <button className="btn btn-link" type="button" onClick={() => this.removeFromQuestions(qIndex)}>
                                                  <i className="fas fa-trash" style={{color:'red'}}></i>
                                                </button>
                                              </div>
                                            </li>
                                          ))}
                                          <hr />
                                        </ol>
                                        <div className="form-group mb-3">
                                          <h6 className="modal-title" id="exampleModalLabel"><b>Add New Question</b></h6>
                                          <textarea type="text" className="form-control" name="questionContent" value={this.state.questionContent}
                                            onChange={(e) => this.onInputChange(e.target.name, e.target.value)} placeholder="Type the question here..." ></textarea>
                                          <div style={{fontSize: "12px"}}>
                                              Note: Choice that is marked with green will be considered as the correct answer.
                                          </div>
                                        </div>
                                        <div className="row row-cols-2 mb-2 ml-2">
                                          <div className="form-check col">
                                            <input className="form-check-input" type="radio" name="answer" onChange={(e) => this.onInputChange(e.target.name, 1)} checked={this.state.answer===1} id="answerOne"/>
                                            <label className="form-check-label answer-label" for="answerOne">
                                              <input type="text" className="form-control" value={this.state.choice1} name="choice1" onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                                            </label>
                                          </div>
                                          <div className="form-check col">
                                            <input className="form-check-input" type="radio" name="answer" onChange={(e) => this.onInputChange(e.target.name, 2)} checked={this.state.answer===2} id="answerTwo" />
                                            <label className="form-check-label answer-label" for="answerTwo">
                                              <input type="text" className="form-control" value={this.state.choice2} name="choice2" onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                                            </label>
                                          </div>
                                          <div className="form-check col mt-3">
                                            <input className="form-check-input" type="radio" name="answer" onChange={(e) => this.onInputChange(e.target.name, 3)} checked={this.state.answer===3} id="answerThree" />
                                            <label className="form-check-label answer-label" for="answerThree">
                                              <input type="text" className="form-control" value={this.state.choice3} name="choice3" onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                                            </label>
                                          </div>
                                          <div className="form-check col mt-3">
                                            <input className="form-check-input" type="radio" name="answer" onChange={(e) => this.onInputChange(e.target.name, 4)} checked={this.state.answer===4} id="answerFour" />
                                            <label className="form-check-label answer-label" for="answerFour">
                                              <input type="text" className="form-control" value={this.state.choice4} name="choice4" onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                                            </label>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-4">
                                          <button className="btn btn-info" type="button" onClick={this.handleAddQuestion}
                                            disabled={!this.state.choice1 || !this.state.choice2 || !this.state.choice3 || !this.state.choice4 || !this.state.questionContent}>
                                            Add Question
                                          </button>
                                        </div>
                                      </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button id="module-modal-close" type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-dismiss="modal">Cancel</button>
                        <button type="button" style={{ cursor: (this.state.submitLoading) && 'not-allowed' }} className="btn btn-primary" onClick={this.handleOnClickAdd} 
                            disabled={this.state.submitLoading || (!this.state.title || !this.state.description || !this.state.content || !this.state.recommendedDueDate || !this.state.questions.length || !this.state.videoType || (this.state.videoType === 'external' && !this.state.videoLink))}>
                            <span style={{ display: this.state.submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                            {this.state.modalAction}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>


      // <div>
      //   {this.state.showYTInput && (
      //     <YoutubeLinkInput
      //       close={() => this.setState({ showYTInput: false })}
      //       addYTLink={this.addYTLink}
      //       isLectureLink={true}
      //     />
      //   )}
      //   <hr />

      //   {/* Lecture list */}
      //   <div className="mt-4">
      //     <h5>Lectures/Training Videos</h5>
      //     <br />
      //     {this.props.addedLectures &&
      //       this.props.addedLectures.length > 0 &&
      //       this.props.addedLectures.map((l, index) => (
      //         <div key={index} className="row mb-5">
      //           <div className="col-md-3">
      //             {l.title}
      //             <p className="mt-2">
      //               <a
      //                 href="#!"
      //                 className="lms-text-blue mr-2"
      //                 onClick={(e) => this.editLecture(e, l, index)}
      //               >
      //                 Edit
      //               </a>
      //               <a
      //                 href="#!"
      //                 className="lms-text-red"
      //                 onClick={(e) => this.removeFromLectures(e, index)}
      //               >
      //                 Remove
      //               </a>
      //             </p>
      //           </div>
      //           <div className="col-md-5">{l.description}</div>
      //           <div className="col-md-4">
      //             {/* <video
      //               src={l.videoPath}
      //               style={{ maxWidth: "640px", maxHeight: "480px" }}
      //               controls
      //             /> */}
      //             <PlyrReact path={l.videoPath} videoType={l.videoType} />
      //           </div>
      //         </div>
      //       ))}
      //   </div>
      //   <hr />
      //   {/* Lecture adder */}
      //   <label className="lms-input-label">Add lecture or training video</label>
      //   {this.state.videoPath && (
      //     <button
      //       className="btn lms-btn lms-btn-gradient float-right"
      //       onClick={this.addToLectures}
      //     >
      //       <FontAwesomeIcon icon="plus"></FontAwesomeIcon> Add
      //     </button>
      //   )}
      //   <div className="form-group row mt-3">
      //     <div className="col-12">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Write the title of your video."
      //         name="title"
      //         // value={this.state.title}
      //         // onChange={this.onInputChange}
      //         ref={this.titleRef}
      //       />
      //       <br />
      //       <textarea
      //         type="text"
      //         className="form-control"
      //         rows="10"
      //         placeholder="Describe the content of the video and the expected outcomes after watching it."
      //         name="description"
      //         // value={this.state.description}
      //         // onChange={this.onInputChange}
      //         ref={this.descriptionRef}
      //       ></textarea>
      //       <br />
      //       {!this.state.videoPath && (
      //         <div>
      //           <button
      //             className="btn lms-btn lms-btn-dblue mr-2"
      //             onClick={() => this.setState({ showYTInput: true })}
      //           >
      //             Youtube
      //           </button>
      //           <Uploader
      //             buttonText="Upload video"
      //             returnFile={this.updateVideoPath}
      //             preset="video"
      //           />
      //         </div>
      //       )}
      //       {this.state.videoPath && (
      //         // <video
      //         //   src={this.state.videoPath}
      //         //   style={{ maxWidth: "640px", maxHeight: "480px" }}
      //         //   controls
      //         // />
      //         <PlyrReact
      //           path={this.state.videoPath}
      //           videoType={this.state.videoType}
      //         />
      //       )}
      //     </div>
      //   </div>
      //   <div className="mt-5">
      //     <button
      //       className="lms-btn lms-btn-dblue"
      //       onClick={() => this.props.previousButton(2)}
      //     >
      //       Previous
      //     </button>
      //     <button
      //       className="lms-btn lms-btn-dblue float-right"
      //       onClick={this.onButtonClick}
      //     >
      //       Next
      //     </button>
      //   </div>
      // </div>
    );
  }
}

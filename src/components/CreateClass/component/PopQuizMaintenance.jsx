import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

window.$(document).on("input", ".grade", function() {
  this.value = this.value.replace(/\D/g,'');
});
export default class PopQuizMaintenance extends Component {
  state = {
    questionContent: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: (Math.floor(Math.random() * 4) + 1).toString(),
    errorDesc: "",
    errorTitle: "",
    showErrorModal: false,
    checkedQuizzes: []
  };


  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addToQuestions = () => {
    if (!!this.state.questionContent && this.state.questionContent.trim() !== "")
    {
      if (!this.state.choice1 || this.state.choice1.trim() === "")
      {
        // choice 1 is 
        console.log("blank choice 1");
        this.setState({errorTitle :"Unable to add", errorDesc: "Choice 1 field is blank", showErrorModal : true});
        return;
      }

      if (!this.state.choice2 || this.state.choice2.trim() === "")
      {
        console.log("blank choice 2");
        this.setState({errorTitle :"Unable to add", errorDesc: "Choice 2 field is blank", showErrorModal : true});
        return;
      }

      if (!this.state.choice3 || this.state.choice3.trim() === "")
      {
        console.log("blank choice 3");
        this.setState({errorTitle :"Unable to add", errorDesc: "Choice 3 field is blank", showErrorModal : true});
        return;
      }

      if (!this.state.choice4 || this.state.choice4.trim() === "")
      {
        console.log("blank choice 4");
        this.setState({errorTitle :"Unable to add", errorDesc: "Choice 4 field is blank", showErrorModal : true});
        return;
      }


      // if (
      //   (!!this.state.choice1 && this.state.choice1.trim() !== "") &&
      //   (!!this.state.choice2 && this.state.choice2.trim() !== "") &&
      //   (!!this.state.choice3 && this.state.choice3.trim() !== "") &&
      //   (!!this.state.choice4 && this.state.choice4.trim() !== ""))
      // {
        const question = {
          questionContent: this.state.questionContent,
          choices: [
            { choiceContent: this.state.choice1, isAnswer: Boolean(this.state.answer === "1") },
            { choiceContent: this.state.choice2, isAnswer: Boolean(this.state.answer === "2") },
            { choiceContent: this.state.choice3, isAnswer: Boolean(this.state.answer === "3") },
            { choiceContent: this.state.choice4, isAnswer: Boolean(this.state.answer === "4") },
          ],
        };
        this.props.addQuestion(question);
        this.setState({ ...this.state,
          questionContent: "",
          choice1: "",
          choice2: "",
          choice3: "",
          choice4: "",
          answer: (Math.floor(Math.random() * 4) + 1).toString()
        });

      // }
      console.log(this.props.addedQuestions)
    }
    else
    {
      // add error regarding empty question
      console.log("blank question");
      this.setState({errorTitle :"Unable to add", errorDesc: "Question field is blank", showErrorModal : true});

        return;
    }    
  };

  closeModal = ()=>{
    this.setState({errorTitle :"", errorDesc: "", showErrorModal : false});
  }

  removeFromQuestions = (source, key, questionId) => {
    if(source === 'checkbox'){
      if(this.state.checkedQuizzes.length ===0){
        toast.error("No Quiz item/s Selected. Please Select Quiz item/s delete")
      }else{
        this.state.checkedQuizzes.forEach((item) => {
          const idx = this.props.addedQuestions.indexOf(item);
          this.props.removeQuestion(idx, questionId);
          this.state.checkedQuizzes.splice(item, 1)
        })
      }
    }else{
      this.props.removeQuestion(key, questionId);
    }

    console.log(this.state.checkedQuizzes)
  };

  onClickCheckBox = async (e, source, item) => {
    let quizList = [...this.state.checkedQuizzes];
    switch(source){
        case 'quiz':
          if(e.target.checked){
            quizList.push(item);
          }else{
            const index = quizList.indexOf(item);
            quizList.splice(index, 1);
          }
          
          this.setState({checkedQuizzes: quizList});
          console.log(quizList)
            break;
        case 'all': 
        quizList = [];
            if(e.target.checked){
                this.props.addedQuestions.map((item) => {
                   return quizList.push(item);
              })
            }else{
                quizList = [];
            }
            
            this.setState({checkedQuizzes: quizList});
            console.log(quizList)
            break;
        default:
          break;
    }
  }

  isChecked = (source, item) => {
    if (source === 'all'){ 
        return this.state.checkedQuizzes.length === this.props.addedQuestions.length;
    }else{
      console.log(this.state.checkedQuizzes.indexOf(item))
        return this.state.checkedQuizzes.indexOf(item) > -1;
    }
  }


  

  render() {
    return (
      
      <div className="col-12">
        <Modal
          size="m"
          show={this.state.showErrorModal}
          backdrop="static"
          keyboard={false}
          onHide={() => this.closeModal()}
        >
          <Modal.Header>
            <Modal.Title>{this.state.errorTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errorDesc}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.closeModal()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
         <div className="form-group row">
          <div className="col-6">
            <label className="lms-input-label" htmlFor="passingGrade">
              Passing Grade
            </label>
            <input
              id="passingGrade"
              name="passingGrade"
              type="number"
              min="1"
              max="100"
              className="form-control grade"
              placeholder="Percentage"
              value={this.props.passingGrade ? this.props.passingGrade : ''}
              onChange={this.props.onInputChange}
            />
            <div style={{fontSize: "12px"}}>
                Note: " % " sign is no longer needed in the field.
            </div>
          </div>
        </div>
        {this.props.addedQuestions &&
            this.props.addedQuestions.length > 0 && <hr />}
        {/* Question list */}
        {this.props.addedQuestions &&
            this.props.addedQuestions.length > 0 && <h5>Questions</h5>}
        {this.props.addedQuestions &&
            this.props.addedQuestions.length > 0 && <br />}
           <ul className="list-group question-list">
            {/* {this.props.addedQuestions.length !==0 &&
            <div className='row'>
                <div className='col-auto d-flex align-items-center justify-content-center'>
                  <div className="checkbox checkbox-info">
                    <input type="checkbox"  id="all" name="all" onChange={(e) => {this.onClickCheckBox(e, 'all'); }} checked={this.isChecked('all')}/>
                    <label htmlFor='all'></label>
                  </div>
                </div>
                <div className='col'>
                  <label htmlFor="checkbox">All</label>
                </div>
            </div>
          } */}
            {this.props.addedQuestions.map((item, idx) => (
          <>
            <div className='row'>
            {/* <div className='col-auto d-flex align-items-center justify-content-center'>
              <input type="checkbox" id={idx} name={idx} onChange={(e) => {this.onClickCheckBox(e, 'quiz', item);}} checked={this.isChecked('quiz', item)}/>
              <label htmlFor={idx}></label>
            </div> */}
            <div className='col'>
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="w-100">
                  <p>{idx+1}. <span style={{marginLeft: '10px'}}>{item.questionContent}</span></p>
                  <div style={{marginLeft: '30px'}} className="d-flex w-100 justify-content-between">
                    {!!item.choices[0].choiceContent && 
                      <div className={`d-flex w-50 ${item.choices[0].isAnswer.toString() === 'true' && 'answer'}`}>
                        <span className="choice">a.</span> {item.choices[0].choiceContent}
                      </div>}
                    {!!item.choices[1].choiceContent &&
                      <div className={`d-flex w-50 ${item.choices[1].isAnswer.toString() === 'true' && 'answer'}`}>
                        <span className="choice">b.</span> {item.choices[1].choiceContent}
                      </div>}
                  </div>
                  <div style={{marginLeft: '30px'}} className="d-flex w-100 justify-content-between">
                    {!!item.choices[2].choiceContent && 
                      <div className={`d-flex w-50 ${item.choices[2].isAnswer.toString() === 'true' && 'answer'}`}>
                        <span className="choice">c.</span> {item.choices[2].choiceContent}
                      </div>}
                    {!!item.choices[3].choiceContent && 
                      <div className={`d-flex w-50 ${item.choices[3].isAnswer.toString() === 'true' && 'answer'}`}>
                        <span className="choice">d.</span> {item.choices[3].choiceContent}
                      </div>}
                  </div>
                </div>
                <button className="btn btn-link" onClick={() => this.removeFromQuestions('quiz', idx)}>
                  <i className="fas fa-trash" style={{color:'red'}}></i>
                </button>
              </li>
            </div>
          </div>
          </>
            ))}
          </ul>

          {/* {this.props.addedQuestions.length !==0 &&
          <div className='row d-flex justify-content-end mr-1'>
            <button className="btn btn-danger pull-right text-light mb-2 mt-4" type="button" onClick={() => this.removeFromQuestions('checkbox')}>
                Delete Selected
            </button>
          </div>
          } */}
        <hr />
        {/* Question adder */}
        <div className="form-group row mt-4">
          <div className="col-12">
            <label className="lms-input-label" htmlFor="firstName">
              Add new question
            </label>
            <textarea
              type="text"
              className="form-control"
              id="questionContent"
              name="questionContent"
              rows="3"
              onChange={this.onInputChange}
              value={this.state.questionContent}
              placeholder="Type the question here..."
            ></textarea>
            <div style={{fontSize: "12px"}}>
                Note: Choice that is marked with green will be considered as the correct answer.
            </div>
          </div>
        </div>
        <form>
        <div className="form-group row mt-2">
          <div className="col form-check">
            <input
              type="radio"
              name="answer"
              id="answerOne"
              value="1"
              className="form-check-input"
              onChange={this.onInputChange}
              checked={this.state.answer === "1"}
            />
            <label htmlFor="answerOne"></label>
          </div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="choice1"
              name="choice1"
              onChange={this.onInputChange}
              value={this.state.choice1}
              placeholder={"Choice 1"}
              style={{
                borderColor: this.state.answer === "1" ? "#26a69a" : "#67757c",
                borderWidth: this.state.answer === "1" ? "2px" : "1px"
              }}
            />
          </div>
          <div className="col-1 form-check">
            <input
              type="radio"
              name="answer"
              id="answerTwo"
              className="form-check-input"
              value="2"
              onChange={this.onInputChange}
              checked={this.state.answer === "2"}
            />
            <label htmlFor="answerTwo"></label>
          </div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="choice2"
              name="choice2"
              onChange={this.onInputChange}
              value={this.state.choice2}
              placeholder={"Choice 2"}
              style={{
                borderColor: this.state.answer === "2" ? "#26a69a" : "#67757c",
                borderWidth: this.state.answer === "2" ? "2px" : "1px"
              }}
            />
          </div>
          <div className="col-1 mt-2 form-check">
            <input
              type="radio"
              name="answer"
              id="answerThree"
              className="form-check-input"
              value="3"
              onChange={this.onInputChange}
              checked={this.state.answer === "3"}
            />
            <label htmlFor="answerThree"></label>
          </div>
          <div className="col-5 mt-2">
            <input
              type="text"
              className="form-control"
              id="choice3"
              name="choice3"
              onChange={this.onInputChange}
              value={this.state.choice3}
              placeholder={"Choice 3"}
              style={{
                borderColor: this.state.answer === "3" ? "#26a69a" : "#67757c",
                borderWidth: this.state.answer === "3" ? "2px" : "1px"
              }}
            />
          </div>
          <div className="col-1 mt-2 form-check">
            <input
              type="radio"
              name="answer"
              id="answerFour"
              className="form-check-input"
              value="4"
              onChange={this.onInputChange}
              checked={this.state.answer === "4"}
            />
            <label htmlFor="answerFour"></label>
          </div>
          <div className="col-5 mt-2">
            <input
              type="text"
              className="form-control"
              id="choice4"
              name="choice4"
              onChange={this.onInputChange} 
              value={this.state.choice4}
              placeholder={"Choice 4"}
              style={{
                borderColor: this.state.answer === "4" ? "#26a69a" : "#67757c",
                borderWidth: this.state.answer === "4" ? "2px" : "1px"
              }}
            />
          </div>
          <div className="col-12 mt-3">
            <button className="btn btn-success pull-right text-light" type="button" onClick={this.addToQuestions}>
               Add Question
               {/* <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> */}
            </button>
          </div>
        </div>
        </form>
      </div>
    );
  }
}

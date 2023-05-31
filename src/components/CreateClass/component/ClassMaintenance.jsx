/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, Component } from "react";
import { Navigate } from "react-router-dom";
import LiveClass from "./LiveClass";
import RecordedClass from "./RecordedClass";
import PopQuizMaintenance from "./PopQuizMaintenance";
import { Uploader } from "../Uploader";
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimezonePicker } from "baseui/timezonepicker";
import { SIZE } from "baseui/input";
import { toMoneyFormat } from 'utils/utils';
import { Alert, Modal, Button } from "react-bootstrap";
import { getActivePricing } from "api/pricing";
import { api } from "../../../api";
import moment from 'moment';

dayjs.extend(customParseFormat);
// const DATE_TODAY = dayjs().format("YYYY-MM-DD");

export class ClassMaintenance extends Component {
  state = {
    navItems: [],
    toDashboard: false,
    accountId: "",
    modalShow: false,
    payoutModalShow: false,
    classType: "",
    refCategories: [],
    // refSubCategories: [],
    refAgeCategory: [],
    refSkillLevels: [],
    values: [],
    lecture: [],
    schedule: [],
    question: [],
    newClass: {
      currentClassId: "",
      emailAddress: "",
      title: "",
      description: "",
      thumbnail: "",
      // teaser: '',
      categoryId: "",
      // subCategoryId: "",
      ageRangeId: "",
      skillLevelId: "",
      classUrl: "",
      currency: "USD",
      price: "",
      learningGoals: "",
      learningMaterials: "",
      externalResources: "",
      // timeCommitment: "",
      saveAsDraft: false,
      classType: "CLT002",
      lectures: [], // {title, description, videoPath}
      schedules: {}, // {startDate, startTime, endDate, endTime, timezone, min, max}
      emails: [],
      passingGrade: "",
      questions: [],
      status: null,
      pricingId: null,
      // enrollmentStartDate: null,
      // enrollmentEndDate: null,
      availabilityStartDate: null,
      availabilityEndDate: null,
      timezone: "Asia/Manila"
       // {questionContent:string, choices:[choiceContent:string, isAnswer:boolean]}
    },
    hasDraft: false,
    redirect: "",
    thumbnailSrc: "",
    thumbnailSource: "",
    // teaserSrc: '',
    tabNo: 1,
    dirty: false,
    submitted: false,
    startDate: "",
    endDate: "",
    error: "",
    isLiveValid: false,
    isRecordedValid: false,
    isExclusiveValid: false,
    fetchedDataLoading: false,
    isLoading: false,
    currentTab: 0,
    activeTab: 0,
    pricing: [],
    minDate: (moment(new Date()).add(21, 'days')).format('YYYY-MM-DD')
  };

  allNavItems = [
    {
      type: 'details',
      title: 'Details',
      classType: ['live', 'recorded']
    },
    {
      type: 'media',
      title: 'Thumbnail',
      classType: ['live', 'recorded']
    },
    {
      type: 'schedule',
      title: 'Schedule',
      classType: ['live', 'recorded']
    },
    {
      type: 'module',
      title: 'Modules',
      classType: ['recorded']
    },
    {
      type: 'pricing',
      title: 'Pricing',
      classType: ['live', 'recorded']
    },
    {
      type: 'popquiz',
      title: 'Pop Quiz (Optional)',
      classType: ['live']
    }
  ];

  /*-------------------------------------------*\
    Component Functions
  \*-------------------------------------------*/

   getData = async() => {
    this.setState({ hasDraft: false });
    
    const { classDetails } = this.props;

    if(classDetails !== undefined){
      const { currentClassId, title, classIntroduction, learningGoals, 
        skillLevelId, categoryId, ageRangeId, 
        externalResources, classType, thumbnailImage, 
        startTime, endTime, maxLearners, minLearners, dayAvailability,
        timeZone, availableDates, priceAmount, priceCurrency, questions, passingGrade, availabilityStartDate, availabilityEndDate, recordedId, lectures} = classDetails;

        this.getPricing(classType);
        
        let availableDatesTemp = [];
        if (!!availableDates && availableDates.length > 0)
        {
            await availableDates.forEach((item)=>{
            var dateItem = dayjs(item);
            var aWeekFromNow = dayjs(new Date()).add(7, 'days').format("YYYY-MM-DD");
            if(dateItem.diff(aWeekFromNow, 'day') >= 0)
            {
              availableDatesTemp.push(item);
            }
          });
        }

        let currentTabTemp = 1;
        if (
          !!title && (title !== undefined || title !== '') &&
          !!classIntroduction && (classIntroduction !== undefined || classIntroduction !== '') &&
          !!learningGoals && (learningGoals !== undefined || learningGoals !== '') &&
          !!skillLevelId && (skillLevelId !== undefined || skillLevelId !== '') &&
          !!categoryId && (categoryId !== undefined || categoryId !== '') &&
          // !!subCategoryId && (subCategoryId !== undefined || subCategoryId !== '') &&
          !!ageRangeId && (ageRangeId !== undefined || ageRangeId !== '') &&
          !!externalResources && (externalResources !== undefined || externalResources !== '') &&
          !!ageRangeId && (ageRangeId !== undefined || ageRangeId !== '')
        )
        {
          if (!!thumbnailImage && thumbnailImage.length > 0)
          {
            
            if (
              !!availableDatesTemp && availableDatesTemp.length > 0 &&
              (minLearners !== undefined || minLearners > -1) &&
              (maxLearners !== undefined || maxLearners > minLearners) &&
              !!startTime && (startTime !== undefined || startTime !== '') &&
              !!endTime && (endTime !== undefined || endTime !== '')
            )
            {
              if (!!priceAmount && priceAmount !== '0.00')
              {
                currentTabTemp = 5;
              }
              else
              {
                currentTabTemp = 4;
              }
            }
            else
            {
              currentTabTemp = 3;
            }
          }
          else
          {
            currentTabTemp = 2;
          }
        }
        else
        {
          currentTabTemp = 1;
        }

        if (!!thumbnailImage && thumbnailImage.length > 0)
        {
          document.getElementById("imageSrc").value = thumbnailImage;
        }
      const selectedPricing = this.state.pricing.find((item) => (item.currency === priceCurrency && item.amount === priceAmount));

      await this.setState((prevState) => ({
        thumbnailSrc:thumbnailImage,
        thumbnailSource:thumbnailImage,
        newClass: {
          ...prevState.newClass,
          saveAsDraft: false,
          // status: cStatus !== 'CSTAT001' ? 'CSTAT002' : 'CSTAT001',
          status:'CSTAT001',
          title,
          currentClassId: currentClassId,
          description: classIntroduction,
          learningGoals,
          skillLevelId,
          categoryId,
          // subCategoryId,
          ageRangeId,
          learningMaterials: externalResources,
          classType: classType || 'CLT002',
          thumbnail: thumbnailImage,
          currency: priceCurrency,
          price: priceAmount,
          pricingId: selectedPricing?.pricingId || null,
          passingGrade,
          timezone: timeZone || 'Asia/Manila',
          availabilityStartDate: moment(availabilityStartDate).format('YYYY-MM-DD'),
          availabilityEndDate: moment(availabilityEndDate).format('YYYY-MM-DD'),
          // enrollmentStartDate: enrollmentStartDate ? moment(enrollmentStartDate).format('YYYY-MM-DD') : "",
          // enrollmentEndDate: enrollmentEndDate ? moment(enrollmentEndDate).format('YYYY-MM-DD') : "",
          recordedId,
          lectures: lectures || [],
          schedules: {
            liveClassType: "LCLT001",
            startTime,
            endTime,
            minLearners,
            maxLearners,
            timezone: timeZone || 'Asia/Manila',
            dayAvailability,
            scheduleLength: "",
            // enrollmentStartDate: enrollmentStartDate ? moment(enrollmentStartDate).format('YYYY-MM-DD') : "",
            // enrollmentEndDate: enrollmentEndDate ? moment(enrollmentEndDate).format('YYYY-MM-DD') : "",
            availableDates: availableDatesTemp,
            sessionNumber: !!availableDatesTemp && availableDatesTemp.length > 0 ? availableDatesTemp.length : null
          }
        },
        fetchedDataLoading: false,
        currentTab: currentTabTemp
      }));

      if(questions){
        questions.forEach(({questionDescription, questionId, choices}) => {
          const choiceArray = choices.map(({choiceDescription, choiceId, isAnswer}) => {
            return {
              choiceContent: choiceDescription,
              choiceId,
              isAnswer,
            }
          });
          var q = {
            questionId,
            questionContent: questionDescription,
            choices: choiceArray
          }
          this.addQuestion(q);
        });
      }
    }

    if (this.props.classId) {
      this.props.getDraft(this.props.classId);
      this.setState({ hasDraft: true, fetchedDataLoading: true });
    }

    this.getNavItems(this.state.newClass.classType);
  };

  getNavItems = async (classType) => {

    const navItems = [];
    if(classType === 'CLT001'){
      this.allNavItems.forEach(item => {
        if(item.classType.indexOf('recorded') > -1){
          item.isDone = this.getTabStatus(item.type); 
          navItems.push(item);
        }
      });
    }else{
      this.allNavItems.forEach(item => {
        if(item.classType.indexOf('live') > -1){
          item.isDone = this.getTabStatus(item.type); 
          navItems.push(item);
        }
      });
    }
    this.setState({navItems});
  }

  getCategories = async (refCode) => {
    try {
      const categoriesList = await api.post("/class-creation/getReferenceDetails", {
        refCode
      });
      this.state.refCategories = categoriesList.data.references;
      var select = document.getElementById("categoryId");
      for(var i = 0; i < this.state.refCategories.length; i++) {
        var obj = this.state.refCategories[i];
        select.options[select.options.length] = new Option(obj.DESCRIPTION, obj.CODE);
      }
      if(this.props.classDetails !== undefined){
        select.value = this.state.newClass.categoryId;
        // this.getSubCategories(this.state.newClass.categoryId);
      }
    } catch (error) {
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      // setLoading(false);
    }
  };

  getPricing = async (type) => {
    await getActivePricing((status, pricing) => {
      if(status){
        this.setState({pricing});

        const { classDetails } = this.props;
        if(classDetails !== undefined){
          const { priceAmount, priceCurrency } = classDetails;
          const selectedPricing = pricing.find((item) => (item.currency === priceCurrency && item.amount === priceAmount));
          this.setState((prevState) => ({
              ...prevState,
              newClass: {
                ...prevState.newClass,
                pricingId: selectedPricing?.pricingId || null,
              }
          }));
        }

      }
    }, type);
  }

  // getSubCategories = async (dtlCode) => {
  //   try {
  //     const refSubCategoriesList = await api.post("/class-creation/getReferenceSubDetails", {
  //       dtlCode
  //     });
  //     this.state.refSubCategories = refSubCategoriesList.data.references;
  //     var select = document.getElementById("subCategoryId");   
  //     select.options.length = 0;        
  //     select.options[select.options.length] = new Option('Select Sub Category','');
  //     for(var i = 0; i < this.state.refSubCategories.length; i++) {
  //       var obj = this.state.refSubCategories[i];
  //       select.options[select.options.length] = new Option(obj.DESCRIPTION, obj.CODE);
  //     }
  //     if(this.props.classDetails !== undefined){
  //       select.value = this.state.newClass.subCategoryId;
  //     }
  //   } catch (error) {
  //     // if (error.response) setError(error.response.status);
  //     // else setError("NetworkError");
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  
  onUnload = (event) => {
    if (this.state.dirty && !this.state.submitted) {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Older browsers supported custom message
      event.returnValue = "";
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hasDraft !== this.props.hasDraft) {
      if (Object.keys(this.props.draft).length > 0) {
        const { schedules } = this.props.draft;
        let selectedSchedules = schedules;

        if (schedules) {
          selectedSchedules = {
            ...schedules,
            startDate: dayjs(schedules.startDate).format("YYYY-MM-DD").toString(),
            endDate: dayjs(schedules.endDate).format("YYYY-MM-DD").toString(),
          };
        }

        this.setState((prevState) => ({
          newClass: {
            ...prevState.newClass,
            ...this.props.draft,
            schedules: selectedSchedules,
          },
          fetchedDataLoading: false,
        }));
      }
    }
  }

  submitClassAsPending = async (params, state, type) => {
    if (!!this.state.newClass.passingGrade && this.state.newClass.questions.length < 1)
    {
      this.setState({ error: "You have set the passinge grade without the question/s" });
      this.setState({ isLiveValid: false });
      window.scrollTo(500, 0);
      return;
    }
    if ((!this.state.newClass.passingGrade || this.state.newClass.passingGrade === null || this.state.newClass.passingGrade === "") && this.state.newClass.questions.length > 0)
    {
      this.setState({ error: "You have set the question/s without the passing grade" });
      this.setState({ isLiveValid: false });
      window.scrollTo(500, 0);
      return;

    }
    this.setState({ isLiveValid: true });

    this.setState({ isLoading: true });
    await this.saveContent(this.state.newClass);
    await this.saveThumbnail(this.state.newClass);
    if(this.state.newClass.classType === 'CLT001'){
      await this.saveRecordedClass(this.state.newClass);
    }else{
      await this.saveLiveClass(this.state.newClass);
    }
    await this.savePricing(this.state.newClass);
    await this.saveQuizzes(this.state.newClass);
    await this.saveAsPending(this.state.newClass);
    // if(this.props.classDetails === undefined){
      this.setState(() => ({ modalShow: true }));
    // }
  };

  saveContent = async ({
    currentClassId,
    ageRangeId,
    categoryId,
    description,
    learningGoals,
    learningMaterials,
    skillLevelId,
    // subCategoryId,
    saveAsDraft: isDraft,
    status,
    // timeCommitment,
    title,
  }, showToast, cb) => {
    try {
      this.setState({ isLoading: true });
      const { email } = this.props;
      this.state.newClass.emailAddress = email;
      await api.post("/class-creation/saveContent", {
        currentClassId,
        emailAddress: email,
        ageRangeId,
        categoryId,
        description,
        learningGoals,
        learningMaterials,
        skillLevelId,
        // subCategoryId,
        // timeCommitment,
        title,
        status,
        isDraft,
      }).then((result) => {
        this.state.newClass.currentClassId = result.data.classId;
        this.state.accountId = result.data.accountId;
        if(showToast === true) {
          toast.success("Class Details has been successfully saved.");
        }
        cb && cb(true);
      });

    } catch (error) {
      console.log(error);
      cb && cb(false);
      toast.error("Failed saving class details. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
      // setLoading(false);
    }
  };

  saveThumbnail = async ({ currentClassId, thumbnail }, showToast, cb) => {
    const thumbnailSource = document.getElementById("imageSrc").value;
    this.state.thumbnailSrc = thumbnailSource;
    try {
      // setLoading(true);
      this.setState({ isLoading: true });
      const classResponse = await api.post("/class-creation/saveThumbnail", {
        currentClassId,
        thumbnail: thumbnailSource,
      });

      this.state.newClass.currentClassId = classResponse.data.classId;
      if(showToast === true) {
        toast.success("Class Thumbnail has been successfully saved.");
      }
      cb && cb(true);
    } catch (error) {
      console.log(error);
      cb && cb(false);
      toast.error("Failed saving class thumbnail. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
      // setLoading(false);
    }
  };

  saveLiveClass = async ({ currentClassId, classType, schedules }, showToast, cb) => {
    try {
      this.setState({ isLoading: true });
      const classResponse = await api.post("/class-creation/saveLiveClass", {
        currentClassId,
        classType,
        schedules
      });
      if(showToast === true) {
        toast.success("Class Schedule has been successfully saved.");
      }
      cb && cb(true);
      this.state.newClass.currentClassId = classResponse.data.classId;
    } catch (error) {
      console.log(error.response);
      cb && cb(false);
      toast.error("Failed saving class schedule. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  saveRecordedClass = async ({ currentClassId, classType, timezone, enrollmentStartDate, enrollmentEndDate, availabilityStartDate, availabilityEndDate, recordedId }, showToast, cb) => {
    try {
      this.setState({ isLoading: true });
      const classResponse = await api.post("/class-creation/saveRecordedClass", {
        currentClassId,
        classType,
        timezone,
        enrollmentStartDate,
        enrollmentEndDate,
        availabilityStartDate,
        availabilityEndDate,
        recordedId
      });
      if(showToast === true) {
        toast.success("Class Schedule has been successfully saved.");
      }
      cb && cb(true);
      this.state.newClass.currentClassId = classResponse.data.classId;
      this.state.newClass.recordedId = classResponse.data.recordedId;
    } catch (error) {
      console.log(error.response);
      cb && cb(false);
      toast.error("Failed saving class schedule. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  savePricing = async ({ currentClassId, currency, price }, showToast, cb) => {
    try {
      this.setState({ isLoading: true });
      // setLoading(true);
      const classResponse = await api.post("/class-creation/savePricing", {
        currentClassId,
        currency: currency || this.state.pricing[0].currency,
        price: price || this.state.pricing[0].amount,
      });
      if(showToast === true) {
        toast.success("Class Pricing has been successfully saved.");
      }
      cb && cb(true);
      this.state.newClass.currentClassId = classResponse.data.classId;
    } catch (error) {
      console.log(error);
      cb && cb(false);
      toast.error("Failed saving class price. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
      // setLoading(false);
    }
  };

  saveQuizzes = async ({ currentClassId, passingGrade, questions }, showToast, cb) => {
    try {
      this.setState({ isLoading: true });
      // setLoading(true);
      
      const newQuestions = await questions.filter(item => item.questionId === undefined);
      const classResponse = await api.post("/class-creation/saveQuestions", {
        currentClassId,
        passingGrade,
        questions: newQuestions || [],
      });
      
      if(this.props.classDetails !== undefined && showToast){
        toast.success("Class Pop Quiz has been successfully saved.");
      }
      cb && cb(true);
      this.state.newClass.currentClassId = classResponse.data.classId;
    } catch (error) {
      console.log(error);
      cb && cb(false);
      toast.error("Failed saving class pop quiz. Please try again later.");
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
      // setLoading(false);
    }
  };

  saveAsPending = async ({ currentClassId }, cb, isNotSetActive = true) => {
    try {
      // setLoading(true);
      this.setState({ isLoading: true });
      const classResponse = await api.post("/class-creation/saveAsPending", {
        currentClassId,
      });
      this.state.newClass.currentClassId = classResponse.data.classId;
      
      if (isNotSetActive) {
        this.setState(() => ({ modalShow: true }));
      }
      cb && cb(true);
    } catch (error) {
      console.log(error);
      cb && cb(false);
      // if (error.response) setError(error.response.status);
      // else setError("NetworkError");
    } finally {
      this.setState({ isLoading: false });
      // setLoading(false);
    }
  };

  modalUpdate = () => {
    this.setState(() => ({ modalShow: false, toDashboard: true }));

  };

  redirectTo = (path) => {
    setTimeout(() => {
      this.setState({
        redirect: path,
      });
    }, 3000);
  };

  onInputChange = (event) => {
    event.persist();
    if (event.target.name === "price") {
      this.setState((prevState) => {
        const newClass = { ...prevState.newClass };
        newClass.price = event.target.value >= 0 ? event.target.value : 0;
        return { newClass };
      });
    }
    if (event.target.name === "categoryId") {
      // let selectedId = "." + event.target.value;
      let selectedId = event.target.value;
      // this.getSubCategories(selectedId);
      for (let el of document.querySelectorAll(".allSubCat")) el.style.disabled = true;
      for (let el of document.querySelectorAll(selectedId)) el.style.disabled = false;
    }

    if (event.target.name === "classType") {
      let selectedClassType = event.target.value;
      this.getNavItems(event.target.value);
      this.getPricing(selectedClassType);
    }

    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass[event.target.name] = event.target.value;
      return { newClass };
    });
    this.setState({ dirty: true });
  };

  onTimeSelect = (value, name) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass[name] = value;
      return { newClass };
    });
    this.setState({ dirty: true });
  }

  onInputSelectChange = (filterName, labelName, label, valueName, value) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass[labelName] = label;
      newClass[valueName] = value;
      return { newClass };
    });
    if (filterName) {
      if (filterName === "filterCategory") {
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          // newClass.subCategoryId = "";
          // newClass.subCategoryName = "";
          return { newClass };
        });
      }
      this.props.updateFilter(filterName, value);
    }
    this.setState({ dirty: true });
  };

  // onUploadThumbnail = ({ src }) => {
  //   this.setState((prevState) => {
  //     const newClass = { ...prevState.newClass };
  //     newClass.thumbnail = src;
  //     return { newClass };
  //   });
  //   this.setState({ thumbnailSrc: src });
  //   this.setState({ dirty: true });
  // };

  addLecture = async (lecture, callback) => {
    try {
      await api.post("/class-creation/saveRecordedItem", {
        recordedId: this.state.newClass.recordedId,
        ...lecture
      }).then(async (resp) => {
        toast.success('Module has been successfully added.');
        lecture.id = resp.data.itemId;
        const questions = lecture.questions
        if(questions){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            itemId: resp.data.itemId,
            questions
          });

          lecture.questions = questions.map((item, index) => {
            item.isSaved = true;
            item.questionId = questionResponse.data.questionIds[index];
            return item;
          });
          this.setState((prevState) => {
            const newClass = { ...prevState.newClass };
            newClass.lectures.push(lecture);
            return { newClass };
          });
        }
        
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed saving some data. Please try again later.');
    } 
  };

  editLecture = async(index, lecture, callback) => {
    try {
      await api.post("/class-creation/updateRecordedItem", {
        recordedId: this.state.newClass.recordedId,
        ...lecture
      }).then(async (resp) => {
        const questions = lecture.questions || [];
        let newQuestions = await questions.filter(item => (item.questionId === undefined && !item.isSaved));
        if(newQuestions.length > 0){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            itemId: lecture.id,
            questions: newQuestions
          });

          newQuestions = newQuestions.map((item, index) => {
            item.questionId = questionResponse.data.questionIds[index];
            item.saved = true;
            return item;
          });
          lecture.questions = (questions.filter(item => !!item.questionId));
        }
        
        toast.success('Module has been successfully updated.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          const lectureList = newClass.lectures;
          lectureList[index] = lecture;
          newClass.lectures = lectureList
          return { newClass };
        });
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed updating subject. Please try again later.');
    }
  };

  removeLecture = async (index) => {
    try {
      //setLoading(true);
      await api.post("/class-creation/deleteRecordedItem", {
        id: this.state.newClass.lectures[index].id
      }).then(async (resp) => {
        toast.success('Module has been removed.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          newClass.lectures.splice(index, 1);
          return { newClass };
        });
        this.setState({ dirty: true });
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed deleting subject. Please try again later.');
    }
  };

  addChapter = async (subjectIndex, chapter, callback) => {
    try {
      //setLoading(true);
      await api.post("/class-creation/saveRecordedChapter", {
        recordedId: this.state.newClass.lectures[subjectIndex].id,
        ...chapter
      }).then(async (resp) => {
        const questions = chapter.questions
        if(questions){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            chapterId: resp.data.chapterId,
            questions
          });

          chapter.questions = questions.map((item, index) => {
            item.isSaved = true;
            item.questionId = questionResponse.data.questionIds[index];
            return item;
          });
        }

        toast.success('Chapter has been successfully added.');
        chapter.id = resp.data.chapterId;
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          if(!newClass.lectures[subjectIndex].chapters){
            newClass.lectures[subjectIndex].chapters = [];
          }
          newClass.lectures[subjectIndex].chapters.push(chapter);
          return { newClass };
        });
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed adding chapter. Please try again later.');
    }
  };

  editChapter = async (subjectIndex, chapterIndex, chapter, callback) => {    
    try {
      //setLoading(true);
      await api.post("/class-creation/updateRecordedChapter", {
        chapterId: chapter.id,
        ...chapter
      }).then(async (resp) => {
        const questions = chapter.questions || [];
        let newQuestions = await questions.filter(item => (item.questionId === undefined && !item.isSaved));
        if(newQuestions.length > 0){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            chapterId: chapter.id,
            questions: newQuestions
          });

          newQuestions = newQuestions.map((item, index) => {
            item.questionId = questionResponse.data.questionIds[index];
            item.saved = true;
            return item;
          });

          chapter.questions = (questions.filter(item => !!item.saved || !!item.questionId)).concat(newQuestions);
        }

        toast.success('Chapter has been updated.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          const lectureList = newClass.lectures;
          lectureList[subjectIndex].chapters[chapterIndex] = chapter;
          newClass.lectures = lectureList
          return { newClass };
        });
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed adding chapter. Please try again later.');
    }
  };

  removeChapter = async (subjectIndex, chapterIndex) => {
    try {
      //setLoading(true);
      await api.post("/class-creation/deleteRecordedChapter", {
        chapterId: this.state.newClass.lectures[subjectIndex].chapters[chapterIndex].id
      }).then(async (resp) => {
        toast.success('Chapter has been removed.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          newClass.lectures[subjectIndex].chapters.splice(chapterIndex, 1);
          return { newClass };
        });
        this.setState({ dirty: true });
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed deleting chapter. Please try again later.');
    }
  };

  addTopic = async (subjectIndex, chapterIndex, topic, callback) => {
    try {
      // setLoading(true);
      await api.post("/class-creation/saveRecordedTopic", {
        chapterId: this.state.newClass.lectures[subjectIndex].chapters[chapterIndex].id,
        ...topic
      }).then(async (resp) => {
        const questions = topic.questions
        if(questions){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            topicId: resp.data.topicId,
            questions
          });

          topic.questions = questions.map((item, index) => {
            item.questionId = questionResponse.data.questionIds[index];
            item.isSaved = true;
            return item;
          });
        }

        toast.success('Topic has been successfully added.');
        topic.id = resp.data.topicId;
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          if(!newClass.lectures[subjectIndex].chapters[chapterIndex].topics){
            newClass.lectures[subjectIndex].chapters[chapterIndex].topics = [];
          }
          newClass.lectures[subjectIndex].chapters[chapterIndex].topics.push(topic);
          return { newClass };
        });
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed adding chapter. Please try again later.');
    }
    
  };

  editTopic = async (subjectIndex, chapterIndex, topicIndex, topic, callback) => {
    try {
      //setLoading(true);
      await api.post("/class-creation/updateRecordedTopic", {
        topicId: topic.id,
        ...topic
      }).then(async (resp) => {
        const questions = topic.questions || [];
        let newQuestions = await questions.filter(item => (item.questionId === undefined && !item.isSaved));
        if(newQuestions.length > 0){
          const questionResponse = await api.post("/class-creation/saveQuestions", {
            currentClassId: this.state.newClass.currentClassId,
            topicId: topic.id,
            questions: newQuestions
          });

          newQuestions = newQuestions.map((item, index) => {
            item.questionId = questionResponse.data.questionIds[index];
            item.saved = true;
            return item;
          });

          topic.questions = (questions.filter(item => !!item.saved || !!item.questionId)).concat(newQuestions);
        }

        toast.success('Topic has been updated.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          const lectureList = newClass.lectures;
          lectureList[subjectIndex].chapters[chapterIndex].topics[topicIndex] = topic;
          newClass.lectures = lectureList
          return { newClass };
        });
        this.setState({ dirty: true });
        callback(true);
      });
    } catch (error) {
      callback(false);
      console.log(error);
      toast.error('Failed updating topic. Please try again later.');
    }
  };

  removeTopic = async (subjectIndex, chapterIndex, topicIndex) => {
    try {
      //setLoading(true);
      await api.post("/class-creation/deleteRecordedTopic", {
        topicId: this.state.newClass.lectures[subjectIndex].chapters[chapterIndex].topics[topicIndex].id
      }).then(async (resp) => {
        toast.success('Topic has been removed.');
        this.setState((prevState) => {
          const newClass = { ...prevState.newClass };
          newClass.lectures[subjectIndex].chapters[chapterIndex].topics.splice(topicIndex, 1);
          return { newClass };
        });
        this.setState({ dirty: true });
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed removing topic. Please try again later.');
    }
  };

  addSchedule = (schedData) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass.schedules = {
        ...newClass.schedules,
        ...schedData,
      };
      return { newClass };
    });
    this.setState({ dirty: true, hasDraft: false });
  };

  // removeSchedule = (index) => {
  //   this.setState((prevState) => {
  //     const newClass = { ...prevState.newClass };
  //     newClass.schedules.splice(index, 1);
  //     return { newClass };
  //   });
  //   this.setState({ dirty: true });
  // };

  addEmail = (email) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass.emails.push(email);
      return { newClass };
    });
    this.setState({ dirty: true });
  };

  removeEmail = (index) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass.emails.splice(index, 1);
      return { newClass };
    });
    this.setState({ dirty: true });
  };

  addQuestion = ({ questionContent, choices, questionId }) => {
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass.questions.push({ questionId, questionContent, choices });
      return { newClass };
    });
    this.setState({ dirty: true });
  };

  removeQuestion = async (index, questionId) => {
    if(questionId !== null){
          toast.success('Question has been successfully removed.');
          this.setState((prevState) => {
            const newClass = { ...prevState.newClass };
            newClass.questions.splice(index, 1);
            return { newClass };
          });
          this.setState({ dirty: true });
    }else{
      await this.setState((prevState) => {
        const newClass = { ...prevState.newClass };
        newClass.questions.splice(index, 1);
        return { newClass };
      });
      this.setState({ dirty: true });
    }
  };

  nextButton = async () => {
    this.clearError();
    const activeTab = this.state.activeTab;
    window.scrollTo(500, 0);

    let validated = false
    let success = false;
    switch(this.state.activeTab){
      case 0: {
        validated = this.validateDetails(this.state.newClass);
        if (validated) {
          await this.saveContent(this.state.newClass, true, status => {
            success = status
          });
        }
        break;
      }
      case 1: {
        validated = this.validatedThumbnail();
        if (validated) {
          await this.saveThumbnail(this.state.newClass, true, status => {
            success = status
          });
        }
        break;
      }
      case 2: {
        validated = this.validateContent();
        if (validated) {
          if(this.state.newClass.classType === 'CLT001'){
            await this.saveRecordedClass(this.state.newClass, true, status => {
              success = status
            });
          }else{
            await this.saveLiveClass(this.state.newClass, true, status => {
              success = status
            });
          }
        }
        break;
      }
      case 3: {
        validated = true;
        if(this.state.newClass.classType === 'CLT002'){
          await this.savePricing(this.state.newClass, true, status => {
            success = status
          });
        }else{
          success = true;
        }
        break;
      }
      case 4: {
        validated = true;
        if(this.state.newClass.classType === 'CLT002'){
          await this.saveQuizzes(this.state.newClass, false, status => {
            if(status){
              this.saveAsPending(this.state.newClass, status => {
                success = status
                if(!status){
                  toast.error("Failed submitting class. Please try again later.");
                }
              });
            }
          });
        }else{
          await this.savePricing(this.state.newClass, false, status => {
            if(status){
              this.saveAsPending(this.state.newClass, status => {
                success = status
                if(!status){
                  toast.error("Failed submitting class. Please try again later.");
                }
              });
            }
          });
        }
        break;
      }
      default: return;
    }

    if (validated && success) {
      this.setState(prevState => {
        const navItems = [...prevState.navItems];
        navItems[activeTab].isDone = true;
        return {
          ...prevState,
          navItems,
          activeTab: activeTab+1
        }
      });
    }
  };

  validateDetails = ({
    ageRangeId,
    categoryId,
    description,
    learningGoals,
    learningMaterials,
    skillLevelId,
    // subCategoryId,
    // timeCommitment,
    title,
  }) => {
    if (
      !ageRangeId ||
      !categoryId ||
      !description ||
      !learningGoals ||
      !learningMaterials ||
      !skillLevelId ||
      // !subCategoryId ||
      // !timeCommitment ||
      !title
    ) {
      this.setState({ error: "All fields are required" });
      return false;
    } else {
      return true;
    }
  };

  validatedThumbnail = () => {
    const thumbnailSource = document.getElementById("imageSrc").value;

    if (!thumbnailSource) {
      this.setState({ error: "A picture is required for your class" });
    } else {
      return true;
    }
  };

  validateContent = (state, type) => {
    if(this.state.newClass.classType === 'CLT002'){
      if (!this.state.newClass.schedules.sessionNumber || this.state.newClass.schedules.sessionNumber === null)
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please encode the number of sessions" });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (this.state.newClass.schedules.sessionNumber === 0)
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Minimum number of sessions is one (1)" });
        this.setState({ isLiveValid: false });
        return false;
      }
      if(this.state.newClass.schedules.minLearners === null || this.state.newClass.schedules.minLearners === undefined || this.state.newClass.schedules.minLearners === '')
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please encode the minimum number of learners" });
        this.setState({ isLiveValid: false });
        return false;
      }

      if(this.state.newClass.schedules.maxLearners === null || this.state.newClass.schedules.maxLearners === undefined || this.state.newClass.schedules.maxLearners === '')
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please encode the maximum number of learners" });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (this.state.newClass.schedules.maxLearners === 0)
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Maximum number of learners must be greater than zero (0)" });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (
        this.state.newClass.schedules.maxLearners <
        this.state.newClass.schedules.minLearners
      ) {
        window.scrollTo(500, 0);
        this.setState({
          error: "Maximum number of learners must not be less than the minimum number of learners.",
        });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (this.state.newClass.schedules.startTime === null || this.state.newClass.schedules.startTime === "" || (isNaN(this.state.newClass.schedules.startTime) && !(typeof this.state.newClass.schedules.startTime ===  "string")))
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please select the start time of the class with the proper format (e.g 12:00 am)" });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (this.state.newClass.schedules.endTime === null || this.state.newClass.schedules.endTime === "" || (isNaN(this.state.newClass.schedules.endTime) && !(typeof this.state.newClass.schedules.endTime === "string")))
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please select the end time of the class with the proper format (e.g 12:00 am)" });
        this.setState({ isLiveValid: false });
        return false;
      }

      // if (this.state.newClass.schedules.enrollmentStartDate === null || this.state.newClass.schedules.enrollmentStartDate === "")
      // {
      //   window.scrollTo(500, 0);
      //   this.setState({ error: "Please select the Enrollment Start Date of the class." });
      //   this.setState({ isLiveValid: false });
      //   return false;
      // }

      // if (this.state.newClass.schedules.enrollmentEndDate === null || this.state.newClass.schedules.enrollmentEndDate === "")
      // {
      //   window.scrollTo(500, 0);
      //   this.setState({ error: "Please select the Enrollment End Date of the class." });
      //   this.setState({ isLiveValid: false });
      //   return false;
      // }

      const startTime = dayjs(this.state.newClass.schedules.startTime, "h:mm");
      const endTime = dayjs(this.state.newClass.schedules.endTime, "h:mm");
      const startToEndTimeDiff = startTime.diff(endTime, "minutes");

      if (startToEndTimeDiff >= 0) {
        window.scrollTo(500, 0);
        this.setState({
          error: "End time must not be earlier or equal to the start time.",
        });
        this.setState({ isLiveValid: false });
        return false;
      }

      if (this.state.newClass.schedules.sessionNumber > 0)
      {
        if (this.state.newClass.schedules.sessionNumber === 1)
        {
          if (this.state.newClass.schedules.availableDates.length === 0)
          {
            window.scrollTo(500, 0);
            this.setState({ error: "Please select the preferred date/s in the calendar" });
            this.setState({ isLiveValid: false });
            return false;
          }
          else if (this.state.newClass.schedules.availableDates.length > 1)
          {
            window.scrollTo(500, 0);
            this.setState({ error: "Number of selected date/s should not exceed the number of session/s" });
            this.setState({ isLiveValid: false });
            return false;
          }
        }
        else
        {
          if (this.state.newClass.schedules.availableDates.length === 0)
          {
            window.scrollTo(500, 0);
            this.setState({ error: "Please select the preferred dates in the calendar" });
            this.setState({ isLiveValid: false });
            return false;
          }

          if (this.state.newClass.schedules.availableDates.length < this.state.newClass.schedules.sessionNumber)
          {
            window.scrollTo(500, 0);
            this.setState({ error: "Number of selected date/s does not correspond to the number of session/s" });
            this.setState({ isLiveValid: false });
            return false;
          }
          else if (this.state.newClass.schedules.availableDates.length > this.state.newClass.schedules.sessionNumber)
          {
            window.scrollTo(500, 0);
            this.setState({ error: "Number of selected date/s should not exceed the number of session/s" });
            this.setState({ isLiveValid: false });
            return false;
          }
        }
      }

      this.setState({ isLiveValid: true });
      return true;
    } 
    else {
      // if (this.state.newClass.enrollmentStartDate === null || this.state.newClass.enrollmentEndDate === null || this.state.newClass.availabilityStartDate === null || this.state.newClass.availabilityEndDate === null )
      if (this.state.newClass.availabilityStartDate === null || this.state.newClass.availabilityEndDate === null )
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Availability Date is required." });
        this.setState({ isLiveValid: false });
        return false;
      }

      this.setState({ isLiveValid: true });
      return true;
    }
  };

  validateModule = () => {
    if (this.state.newClass.lectures.length < 1)
      {
        window.scrollTo(500, 0);
        this.setState({ error: "Please add atleast one (1) module" });
        this.setState({ isLiveValid: false });
        return false;
      }

      this.setState({ isLiveValid: true });
      return true;
  }

  validatePrice = (price) => {
    if (price <= 0) {
      this.setState({ error: "Price must be more than 0 dollars" });
      return false;
    } else {
      return true;
    }
  };

  previousButton = () => {
    const activeTab = this.state.activeTab;
    this.clearError();
    window.scrollTo(500, 0);

    this.setState({
      activeTab: activeTab-1
    });
  };

  setActive = async(selectedId, itemType) => {
  if (!!selectedId && !!itemType) {
    this.clearError();
    const activeTab = this.state.activeTab;
    window.scrollTo(500, 0);

    let validated = false
    let success = false;
    switch(this.state.activeTab){
      case 0: {
        validated = this.validateDetails(this.state.newClass);
        if (validated) {
          await this.saveContent(this.state.newClass, true, status => {
            success = status
          });
        }
        break;
      }
      case 1: {
        validated = this.validatedThumbnail();
        if (validated) {
          await this.saveThumbnail(this.state.newClass, true, status => {
            success = status
          });
        }
        break;
      }
      case 2: {
        validated = this.validateContent();
        if (validated) {
          if(this.state.newClass.classType === 'CLT001'){
            await this.saveRecordedClass(this.state.newClass, true, status => {
              success = status
            });
          }else{
            await this.saveLiveClass(this.state.newClass, true, status => {
              success = status
            });
          }
        }
        break;
      }
      case 3: {
        validated = true;
        if(this.state.newClass.classType === 'CLT002'){
          await this.savePricing(this.state.newClass, true, status => {
            success = status
          });
        }else{
          success = true;
        }
        break;
      }
      case 4: {
        validated = true;
        if(this.state.newClass.classType === 'CLT002'){
          await this.saveQuizzes(this.state.newClass, false, status => {
            if(status){
              this.saveAsPending(this.state.newClass, status => {
                // success = status
                if(!status){
                  toast.error("Failed submitting class. Please try again later.");
                }
              }, false);
            }
          });
        }else{
          await this.savePricing(this.state.newClass, false, status => {
            if(status){
              this.saveAsPending(this.state.newClass, status => {
                // success = status
                if(!status){
                  toast.error("Failed submitting class. Please try again later.");
                }
              }, false);
            }
          });
        }
        break;
      }
      default: return;
    }
    if ((validated && success) || (!!validated && parseInt(this.state.activeTab) === 4)) {
      
      this.setState(prevState => {
        const navItems = [...prevState.navItems];
        navItems[activeTab].isDone = true;
        return {
          ...prevState,
          navItems,
          activeTab: selectedId
        }
      });
    }
  }
    
  };

  toolkitListener = (modal) => {
    this.setState({ modal: modal });
  };

  /*-------------------------------------------*\
    Lifecycle Methods
  \*-------------------------------------------*/
  componentDidMount() {
    
    // const { accountNumber, classDetails } = this.props;

    // if (!accountNumber && !classDetails){
    //   this.setState({payoutModalShow: true}); 
    // } else {
      this.getCategories( "LMS001");
      this.getPricing(this.state.newClass.classType);
      this.getData();
    // }

    // window.addEventListener("beforeunload", this.onUnload);
  }

  getTabStatus = (tab)=>{
    if (tab === 'details')
    {
      let keys = ['title', 'categoryId', 'ageRangeId', 'skillLevelId', 'description', 'learningGoals', 'learningMaterials'];
      let countDetails = 0;
      keys.forEach((item)=>{
        if (!!this.state.newClass[item] && this.state.newClass[item] !== '')
        {
          countDetails++;
        }
      });
      
      if (countDetails === keys.length)
        return true;
      else
        return false;
    }

    if (tab === 'media')
    {
      // let value = !!document.getElementById("imageSrc") ? document.getElementById("imageSrc").value : null;
      if (!!this.state.newClass.thumbnail && this.state.newClass.thumbnail !== '')
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    if (tab === 'schedule')
    {
      let keys = this.state.newClass.classType === 'CLT001' ?
        ['availabilityStartDate', 'availabilityStartDate', 'timezone'] : ['sessionNumber', 'minLearners', 'maxLearners', 'timezone', 'startTime', 'endTime', 'availableDates'];
      let countSched = 0;
      if(this.state.newClass.classType === 'CLT002'){
        keys.forEach((item)=>{
          if (item !== 'minLearners' && item !== 'maxLearners' && item !== 'sessionNumber' && !!this.state.newClass.schedules && !!this.state.newClass.schedules[item] && this.state.newClass.schedules[item] !== '')
          {
            countSched++;
          }
          else if (item === 'minLearners')
          {
            if ((this.state.newClass.schedules[item] !== undefined || this.state.newClass.schedules[item] !== null || this.state.newClass.schedules[item] !== '') && this.state.newClass.schedules[item] > -1)
            {
              countSched++;
            }
          }
          else if (item === 'maxLearners')
          {
            if ((this.state.newClass.schedules[item] !== undefined || this.state.newClass.schedules[item] !== null || this.state.newClass.schedules[item] !== '') && this.state.newClass.schedules[item] > 0 && this.state.newClass.schedules['minLearners'] <= this.state.newClass.schedules[item])
            {
              countSched++;
            }
          }
          else if (item === 'sessionNumber')
          {
            if (!!this.state.newClass.schedules[item] && this.state.newClass.schedules[item] > 0)
            {
              countSched++;
            }
          }
        });

        if (countSched === keys.length && ((this.state.newClass.classType==='CLT002' && !!this.state.newClass.schedules.sessionNumber && !!this.state.newClass.schedules.availableDates && this.state.newClass.schedules.availableDates.length === this.state.newClass.schedules.sessionNumber)))
        {
          return true;
        }
        else
        {
          return false;
        }
      }else{
        keys.forEach((item)=>{
          if(this.state.newClass[item] !== null || this.state.newClass[item]=== ''){
            countSched++;
          }
        });
        if (countSched === keys.length)
        {
          return true;
        }
        else
        {
          return false;
        }
      }

      
    }
    if (tab === 'pricing')
    {
      if ((!!this.state.newClass.price && this.state.newClass.price !== "0.00") || this.state.currentTab >= 5)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    if (tab === 'popquiz')
    {
      if (!!this.state.newClass.passingGrade && this.state.newClass.passingGrade !== "" && !!this.state.newClass.questions && this.state.newClass.questions.length > 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    if (tab === 'module')
    {
      if (!!this.state.newClass.lectures && this.state.newClass.lectures.length > 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  };

  clearError = ()=>{
    this.setState({error:''});
  }

  uploadImage = (image)=>{
    this.setState((prevState) => {
      const newClass = { ...prevState.newClass };
      newClass['thumbnail'] = image;
      return {
        newClass
      };
    });
  };

  render() {
    if (this.state.toDashboard) {
      return <Navigate to="/classes" replace={false} />;
    }

    const { status, message, loading } = this.props;

    const thumbnail = this.state.thumbnailSrc
      ? this.state.thumbnailSrc
      : this.state.newClass.thumbnail;

    if (status === 1 && message && !this.state.newClass.saveAsDraft) {
      this.redirectTo("/teacher-portal/class-masterlist");
    }

    const addModuleNext = () => {
      const module = this.state.newClass.lectures
      if (module.length > 0) {
        this.nextButton(4)
      } else {
        toast.warning("Please Add Module")
      }
    }

    const pricingNextBtn = () => {
      const price = this.state.newClass.price
      if(price) {
        this.nextButton(5)
      } else {
        toast.warning("Please Select Pricing")
      }
    }


    // const { fetchedDataLoading } = this.state;
    return (
      
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 p-20" style={{paddingLeft:0}}>
              <h4 className="card-title">Steps</h4>
              <ul className="list-group list-group-flush">
                {this.state.navItems.map((item, index) => (
                  <div
                    className={`list-group-item ${this.state.activeTab===index && 'active'}`}
                    id={`nav-${item.type}-tab`}
                    // data-toggle="tab"
                    // href={`#nav-${item.type}`}
                    role="tab"
                    aria-controls={`nav-${item.type}`}
                    aria-selected="true"
                    disabled={item.isDone === false}
                    style={{
                      pointerEvents: (item.isDone || this.state.activeTab === index || (index > 0 && this.state.navItems[index-1].isDone)) ? "auto" : "none",
                      cursor: (item.isDone || this.state.activeTab === index || (index > 0 && this.state.navItems[index-1].isDone)) ? "pointer" : "not-allowed",
                    }}                  
                    onClick={() => this.setActive(index, item.type)}
                  >
                    {item.title}
                    <div
                      style={{
                        height: 10,
                        width: 10,
                        background: item.isDone ? "#A2CD3C": "#F59C1E",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 13,
                        borderRadius: "50%",
                        opacity: (this.state.activeTab===index
                          || (index > 0 && this.state.navItems[index-1].isDone) || this.state.navItems[index].isDone)? 1 : 0.2,
                      }}
                    />
                  </div>
                ))}
                {/* </div> */}
              </ul>
              {/* </div> */}
            </div>
            <div className="col-md-10 p-20">
              <div className="card p-20">
                <div className="card-body ">
                  <div className="tab-content lms-tab-content" id="nav-tabContent">
                    {status === 1 ? <Alert variant="success">{message}</Alert> : null}
                    {status === 2 ? (
                      <Alert variant="danger" style={{ whiteSpace: "pre-wrap" }}>
                        {message}
                      </Alert>
                    ) : null}
                    {this.state.error ? (
                      <Alert variant="danger" style={{ whiteSpace: "pre-wrap" }} onClose={() => this.clearError()} dismissible >
                        {this.state.error}
                      </Alert>
                    ) : null}
                    {/* Details */}
                    <div
                      className={`tab-pane fade ${this.state.activeTab===0 && 'show active'}`}
                      id="nav-details"
                      role="tabpanel"
                      aria-labelledby="nav-details-tab"
                    >
                      <div>
                        <h3>Class Details</h3>
                        <hr></hr>
                        <div className="form-group row">
                          <div className="col-12">
                            <label className="lms-input-label" htmlFor="firstName">
                              What is the title of your online class or workshop/tutorial
                              session?
                            </label>
                            <br />
                            <i>
                              <small>
                                <label className="lms-input-sublabel">
                                  The title should be unique and stand out among the other
                                  classes. Classes with similar titles will be edited and
                                  replaced.
                                </label>
                              </small>
                            </i>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              value={
                                this.state.newClass.title ? this.state.newClass.title : ""
                              }
                              onChange={this.onInputChange}
                              placeholder="Write the class title here..."
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-6">
                            <label className="lms-input-label" htmlFor="firstName">
                              Select the category of your class.
                            </label>
                            <br />
                            <label className="lms-input-sublabel">
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor. */}
                            </label>
                            <select
                              name="categoryId"
                              id="categoryId"
                              className="custom-select lms-portal-select"
                              classNamePrefix="select"
                              onChange={this.onInputChange}
                            >
                              <option value="">Select Category</option>
                              </select>                             
                          </div>
                          <div className="col-6">
                            {/* <label className="lms-input-label" htmlFor="firstName">
                              Select the sub-category of your class.
                            </label>
                            <br /> */}
                            {/* <label className="lms-input-sublabel"> */}
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor. */}
                            {/* </label>
                            <select
                              name="subCategoryId"
                              id="subCategoryId"
                              onChange={this.onInputChange}
                              className="custom-select lms-portal-select"
                              classNamePrefix="select"
                            >
                              <option value="">
                                Select Sub Category
                              </option>                              
                            </select> */}
                              <label className="lms-input-label" htmlFor="firstName">
                              Select your target age category.
                            </label>
                            <br />
                            <label className="lms-input-sublabel">
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor. */}
                            </label>
                            <select
                              name="ageRangeId"
                              id="ageRangeId"
                              value={this.state.newClass.ageRangeId}
                              onChange={this.onInputChange}
                              className="custom-select lms-portal-select"
                              classNamePrefix="select"
                            >
                              <option value="">Select Target Age Category</option>
                              <option value="AGE001">4-6 years</option>
                              <option value="AGE002">7-10 years</option>
                              <option value="AGE003">11-16 years</option>
                              <option value="AGE004">17-19 years</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                         
                          <div className="col-6">
                            <label className="lms-input-label" htmlFor="firstName">
                              Select your target skill level
                            </label>
                            <br />
                            <label className="lms-input-sublabel">
                              
                            </label>
                            <select
                              name="skillLevelId"
                              id="skillLevelId"
                              value={this.state.newClass.skillLevelId}
                              onChange={this.onInputChange}
                              className="custom-select lms-portal-select"
                              classNamePrefix="select"
                            >
                              <option value="">Select Skill Level</option>
                              <option value="SLVL001">Basic</option>
                              <option value="SLVL002">Intermediate</option>
                              <option value="SLVL003">Advanced</option>
                            </select>
                          </div>
                        </div>
                        <br />
                        <h3>Tell us more!</h3>
                        <hr></hr>
                        <div className="form-group row">
                          <div className="col-12">
                            <label className="lms-input-label" htmlFor="firstName">
                              Provide a brief introduction of your class.
                            </label>
                            <br />
                            <label className="lms-input-sublabel">
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor. */}
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="description"
                              maxlength="2500"
                              name="description"
                              rows="4"
                              placeholder="Write the class description here..."
                              value={
                                this.state.newClass.description
                                  ? this.state.newClass.description
                                  : ""
                              }
                              onChange={this.onInputChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-group row">
                          <br /><br />
                          <div className="col-6">
                            <label className="lms-input-label" htmlFor="learningGoals">
                              Indicate the learning goals and/or outcomes for this class.
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="learningGoals"
                              maxlength="2500"
                              name="learningGoals"
                              rows="4"
                              placeholder="Write the learnings goals here..."
                              onChange={this.onInputChange}
                              value={
                                this.state.newClass.learningGoals
                                  ? this.state.newClass.learningGoals
                                  : ""
                              }
                            ></textarea>
                          </div>
                          <div className="col-6">
                            <label className="lms-input-label" htmlFor="learningMaterials">
                              Indicate materials and resources needed for the class.
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="learningMaterials"
                              maxlength="2500"
                              name="learningMaterials"
                              rows="4"
                              placeholder="Write the learning materials and external resources here..."
                              onChange={this.onInputChange}
                              value={
                                this.state.newClass.learningMaterials
                                  ? this.state.newClass.learningMaterials
                                  : ""
                              }
                            ></textarea>
                          </div>
                        </div>
    

                        <div className="mt-4 mb-4">
                          <button
                            className="btn btn-megna btn-outline-megna text-megna float-right"
                            style={{
                              // backgroundColor: "#2c9cf8",
                              // color:  "white",
                              outline: "none",
                            }}
                            onClick={() => this.nextButton(2)}
                            disabled={this.state.isLoading}
                          >
                            <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                            {'Next'}
                          </button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>

                    {/* Media */}
                    <div
                      className={`tab-pane fade ${this.state.activeTab===1 && 'show active'}`}
                      id="nav-media"
                      role="tabpanel"
                      aria-labelledby="nav-media-tab"
                    >
                      <h3>Class Thumbnail</h3>
                      <hr></hr>
                      <div className="form-group row">
                        <div className="col-6">
                          <div>
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
                          <div>
                            <div style={{ position: "relative" }}>
                              <div>
                                <Uploader uploadImage={this.uploadImage}></Uploader>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6" style={{textAlign:"center"}}>
                          <img
                            id="imageFile"
                            src={
                              thumbnail
                                ? thumbnail
                                : "/assets/images/image-placeholder.jpg"
                            }
                            alt="thumbnail"
                            className="img-fluid"
                            style={{ maxHeight: "200px" }}
                          />
                          <input
                            id="imageSrc"
                            type="text"
                            style={{ display: "none" }}
                            onChange={this.onInputChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                      <div className="mt-4 mb-4">
                        <button
                          className="btn btn-info text-white"
                          onClick={() => this.previousButton(1)}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-megna btn-outline-megna text-megna float-right"
                          style={{
                            // backgroundColor: !loading ? "#2c9cf8" : "transparent",
                            // color: !loading ? "white" : "#2c9cf8",
                            outline: "none",
                          }}
                          onClick={() => this.nextButton(3)}
                          disabled={this.state.isLoading}
                        >
                          <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                          {!loading ? "Next" : "Saving..."}
                        </button>
                      </div>
                    </div>

                    {/* Schedule */}                   
                    <div
                      className={`tab-pane fade ${this.state.activeTab===2 && 'show active'}`}
                      id="nav-schedule"
                      role="tabpanel"
                      aria-labelledby="nav-schedule-tab"
                    >
                      <h3 htmlFor="firstName">
                                  Class Schedule
                              </h3>
                      <hr />
                      
                      <div className="mb-3">
                        <div className="form-group row">
                          <div className="col-12">
                            <div>
                              <label className="lms-input-label" htmlFor="classType">
                                Choose which type of class you want to create.
                              </label>
                              <br />
                              <i>
                                <small>
                                  <label className="lms-input-sublabel" htmlFor="classUrl" color="red" style={{fontSize: "12px"}}>
                                    Class link will be generated upon approval of class and will be sent via Email.
                                  </label>
                                </small>
                              </i>
                            </div>
                            <select
                              className="custom-select lms-portal-select"
                              id="classType"
                              name="classType"
                              value={this.state.newClass.classType}
                              onChange={this.onInputChange}
                            >
                              {/* <option value="" disabled>
                                  Select Class Type
                                </option> */}
                              <option value="CLT002" selected>
                                Live/Scheduled Class
                              </option>
                              <option value="CLT001">Recorded Class</option>
                              {/* <option value="CLT003">Exclusive Class</option> */}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        {this.state.newClass.classType === "CLT001" && (<div>
                          <div className="form-group row pl-3 pr-3">
                              <label className="lms-input-sublabel">Timezone</label>
                              <TimezonePicker
                                  value={this.state.newClass.timezone}
                                  name="timezone"
                                  onChange={({ id }) => this.onTimeSelect(id, 'timezone')}
                                  size={SIZE.compact}
                                  overrides={{
                                      Select: {
                                          props: {
                                              overrides: {
                                                  ControlContainer:{
                                                      style: ({ $theme }) => ({
                                                          borderColor: `#ced4da!important`,
                                                          borderRadius: `0.25em!important`,
                                                          borderWidth: `thin!important`,
                                                          backgroundColor: $theme.colors.white,
                                                          minHeight: `38px`
                                                        }),
                                                  },
                                                  Input:{
                                                      style: ({ $theme }) => ({
                                                          cursor:`text`
                                                      })
                                                  },
                                                  InputContainer:{
                                                      style: ({ $theme }) => ({
                                                          cursor:`text`
                                                      })
                                                  },
                                                  ValueContainer:{
                                                      style: ({ $theme }) => ({
                                                          cursor:`pointer`
                                                      })
                                                  }
                                              },
                                          },
                                      },
                                  }}
                              />
                          </div>
                          {/* <div className="row mt-4">
                              <div className="col-12">
                                  <label className="lms-input-label" htmlFor="enrollmentStartDate">
                                    Enrollment Date
                                  </label>
                                  <div className="form-group row">
                                      <div className="col-md-6">
                                        <label className="lms-input-label" htmlFor="enrollmentStartDate">
                                          <small>Start Date</small>
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="enrollmentStartDate"
                                          name="enrollmentStartDate"
                                          placeholder="Enrollment Date"
                                          onChange={this.onInputChange}
                                          onKeyDown={(e) => e.preventDefault()}
                                          value={this.state.newClass.enrollmentStartDate}
                                          min={this.state.minDate}
                                        />
                                      </div>
                                      <div className="col-md-6">
                                        <label className="lms-input-label" htmlFor="enrollmentEndDate">
                                          <small>End Date</small>
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="enrollmentEndDate"
                                          name="enrollmentEndDate"
                                          placeholder="Enrollment Date"
                                          onChange={this.onInputChange}
                                          onKeyDown={(e) => e.preventDefault()}
                                          value={this.state.newClass.enrollmentEndDate}
                                          min={this.state.newClass.enrollmentStartDate}
                                        />
                                      </div>
                                  </div>
                              </div>                    
                          </div> */}
                          <div className="row mt-4">
                              <div className="col-12">
                                  <label className="lms-input-label" htmlFor="availabilityStartDate">
                                    Availability Date
                                  </label>
                                  <div className="form-group row">
                                      <div className="col-md-6">
                                        <label className="lms-input-label" htmlFor="availabilityStartDate">
                                          <small>Start Date</small>
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="availabilityStartDate"
                                          name="availabilityStartDate"
                                          placeholder="Availability Date"
                                          onChange={this.onInputChange}
                                          value={this.state.newClass.availabilityStartDate}
                                          min={this.state.minDate}
                                        />
                                      </div>
                                      <div className="col-md-6">
                                        <label className="lms-input-label" htmlFor="availabilityEndDate">
                                          <small>End Date</small>
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          id="availabilityEndDate"
                                          name="availabilityEndDate"
                                          placeholder="Availability Date"
                                          onChange={this.onInputChange}
                                          value={this.state.newClass.availabilityEndDate}
                                          min={this.state.newClass.availabilityStartDate}
                                        />
                                      </div>
                                  </div>
                              </div>                    
                          </div>
                        </div>)}

                        {/* {this.state.newClass.classType === "live" && ( */}
                        { this.state.newClass.classType === "CLT002" && 
                          <LiveClass
                            onInputChange={this.onInputChange}
                            classUrl={this.state.newClass.classUrl}
                            addedSchedules={this.state.newClass.schedules}
                            addSchedule={this.addSchedule}
                            sessionNumber={this.state.newClass.schedules.sessionNumber}
                            removeSchedule={this.removeSchedule}
                            schedules={this.state.newClass.schedules}
                            title={this.state.newClass.title}
                            validated={this.state.isLiveValid}
                            nextButton={this.nextButton}
                            previousButton={this.previousButton}
                            classDetails={this.props.classDetails}
                          />
                        }
                        {/* )} */}

                        {/* {this.state.newClass.classType === "exclusive" && (
                    <ExclusiveClass
                      onInputChange={this.onInputChange}
                      classUrl={this.state.newClass.classUrl}
                      addedSchedules={this.state.newClass.schedules}
                      addSchedule={this.addSchedule}
                      removeSchedule={this.removeSchedule}
                      addedEmails={this.state.newClass.emails}
                      addEmail={this.addEmail}
                      removeEmail={this.removeEmail}
                      nextButton={this.nextButton}
                      previousButton={this.previousButton}
                      validated={this.state.isExclusiveValid}
                      schedules={this.state.newClass.schedules}
                    />
                  )} */}
                      </div>
                      <div className="mt-5">
                        <button
                          className="btn btn-info text-white"
                          onClick={() => this.previousButton(2)}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-megna btn-outline-megna text-megna float-right"
                          onClick={() => this.nextButton(4)}
                          disabled={this.state.isLoading}
                        >
                            <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                          {'Next'}
                        </button>
                      </div>
                    </div>

                    {/* Module */}                   
                    {this.state.newClass.classType === "CLT001" &&  <div
                      className={`tab-pane fade ${(this.state.activeTab===3 && this.state.newClass.classType==='CLT001') && 'show active'}`}
                      id="nav-module"
                      role="tabpanel"
                      aria-labelledby="nav-module-tab"
                    >
                      <h3 htmlFor="firstName">Class Modules</h3>
                      <hr />
                       
                      <div className="mt-4">
                        <div>
                          <RecordedClass
                            availabilityStartDate={this.state.newClass.availabilityStartDate}
                            availabilityEndDate={this.state.newClass.availabilityEndDate}
                            addedLectures={this.state.newClass.lectures}
                            addLecture={this.addLecture}
                            addChapter={this.addChapter}
                            addTopic={this.addTopic}
                            removeLecture={this.removeLecture}
                            removeChapter={this.removeChapter}
                            removeTopic={this.removeTopic}
                            editLecture={this.editLecture}
                            editChapter={this.editChapter}
                            editTopic={this.editTopic}
                            nextButton={this.nextButton}
                            previousButton={this.previousButton}
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <button
                          className="btn btn-info text-white"
                          onClick={() => this.previousButton(2)}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-megna btn-outline-megna text-megna float-right"
                          onClick={addModuleNext}
                          disabled={this.state.isLoading}
                        >
                            <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                          {'Next'}
                        </button>
                      </div>
                    </div>}

                    {/* Pricing */}
                    
                    <div
                      className={`tab-pane fade ${((this.state.activeTab===3 && this.state.newClass.classType==='CLT002') || (this.state.activeTab===4 && this.state.newClass.classType==='CLT001')) && 'show active'}`}
                      id="nav-pricing"
                      role="tabpanel"
                      aria-labelledby="nav-pricing-tab"
                    >
                      <h3 htmlFor="firstName">
                                  Class Pricing
                              </h3>
                      <hr />
                      <div className="form-group row">
                        <div className="col-12">
                          <label className="lms-input-label" htmlFor="firstName">
                            Indicate Enrollment Fee Per Student
                          </label>
                          <br />
                          <label className="lms-input-sublabel">
                            Check this for the recommended course pricing guide.
                          </label>
                        </div>
                        <div className="col">
                          <label className="lms-input-label" htmlFor="currency">
                            <b>Price per session</b>
                          </label>
                          <select
                            className="custom-select lms-portal-select"
                            id="currency"
                            name="pricingId"
                            aria-describedby="pricingSelect"
                            // onClick={this.getPricing(this.state.newClass.classType)}
                            defaultValue={this.state.newClass.pricingId}
                            onChange={(event) => {
                              this.setState((prevState) => {
                                const newClass = { ...prevState.newClass };
                                const value = this.state.pricing.find((item) => (item.pricingId.toString() === event.target.value.toString()));
                                newClass.pricingId = value.pricingId;
                                newClass.currency = value.currency;
                                newClass.price = value.amount;
                                return {
                                  newClass,
                                };
                              });
                            }}
                            // disabled={true}
                          >
                            <option value={null} selected={this.state.newClass.pricingId===null} disabled>
                              Select Pricing
                            </option>
                            {this.state.pricing.map(item => (<option value={item.pricingId} selected={item.pricingId===this.state.newClass.pricingId}>{`${item.currency} ${item.amount}`}</option>))}
                            {/* <option value="USD">USD</option>
                            <option value="PHP">PHP</option> */}
                          </select>
                          <small id="pricingSelect" className="form-text" style={{color: '#ef5350'}}>Note: Price list may change without prior notice.</small>
                        </div>
                        <table className="table table-striped m-4" style={{maxWidth: '94%'}}>
                          <thead style={{backgroundColor: 'lightsteelblue'}}>
                              <th>Price</th>
                              <th>Number of Sessions</th>
                              <th>Total</th>
                          </thead>
                          <tbody>
                              <tr>
                                <td>{toMoneyFormat(this.state.newClass.price, this.state.newClass.currency)}</td>
                                <td>{this.state.newClass.classType==='CLT002' ? this.state.newClass.schedules.sessionNumber : this.state.newClass.lectures.length}</td>
                                <td>{this.state.newClass.classType==='CLT002' ? toMoneyFormat((this.state.newClass.schedules.sessionNumber*this.state.newClass.price), this.state.newClass.currency) : toMoneyFormat((this.state.newClass.lectures.length*this.state.newClass.price), this.state.newClass.currency)}</td>
                              </tr>
                          </tbody>
                      </table>
                      </div>
                      <div className="mt-5">
                        <button
                          className="btn btn-info text-white"
                          onClick={() => this.previousButton(3)}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-megna btn-outline-megna text-megna float-right"
                          onClick={pricingNextBtn}
                          disabled={this.state.isLoading}
                        >
                          <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                          {this.state.newClass.classType === 'CLT001' ? 'Submit' : 'Next'}
                        </button>
                      </div>
                    </div>

                    {/* Pop Quiz */}
                    
                    <div
                      className={`tab-pane fade ${(this.state.activeTab===4 && this.state.newClass.classType==='CLT002') && 'show active'}`}
                      id="nav-popquiz"
                      role="tabpanel"
                      aria-labelledby="nav-popquiz-tab"
                    >
                      <h3 htmlFor="firstName">
                                  Pop Quiz
                              </h3>
                      <hr />
                      <div className="form-group row">
                        <PopQuizMaintenance
                          onInputChange={this.onInputChange}
                          passingGrade={this.state.newClass.passingGrade}
                          addedQuestions={this.state.newClass.questions}
                          addQuestion={this.addQuestion}
                          removeQuestion={this.removeQuestion}
                        />
                      </div>
                      <div className="mt-5">
                          <button
                            className="btn btn-info text-white"
                            onClick={() => this.previousButton(4)}
                          >
                            Previous
                          </button>
                          <button
                            className="btn btn-megna btn-outline-megna text-megna float-right float-right"
                            onClick={() => {this.nextButton(5)}}
                            disabled={this.state.isLoading}
                          >
                            <span style = {{display: this.state.isLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                            {'Submit'}
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>

        <Modal
          size="m"
          show={this.state.modalShow}
          backdrop="static"
          keyboard={false}
          onHide={() => this.setState({ modalShow: false })}
        >
          <Modal.Header>
            <Modal.Title>{`Class ${this.props.classDetails === undefined ? 'Created' : 'Updated'}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Successfully {this.props.classDetails === undefined ? 'created a new class' : 'updated the class'}. Kindly wait for the approval
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.modalUpdate()}>
              Return To Dashboard
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="l" backdrop="static" keyboard={false} show={this.state.payoutModalShow} onHide={() => this.setState({ payoutModalShow: false })}>
        <Modal.Header>
          <Modal.Title>
            Set up Payout Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{fontSize: '15px'}}>
            To continue creating a class, you need to setup your payout account first.
          </p>
          <p style={{fontSize: '15px'}}>
            <a href="/profile">Click here</a> and proceed to "Payout Account" tab to set up payout account now or click Proceed button.
          </p>
          <p style={{fontSize: '15px'}}> If the link does not work, just navigate to <b>Profile</b> { '>' } <b>Payout Account</b></p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" href="/profile" type="button">
              Proceed
            </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    );
  }
}

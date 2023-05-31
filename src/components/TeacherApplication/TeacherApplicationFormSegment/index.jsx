import React from "react";
import { Form, FormSpy } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckBoxControl,
  FileInputControl,
  InputControl,
  TextAreaControl,
} from "../../common/Form/Inputs";
import {
  group0Fields,
  group1Fields,
  group2Fields,
  group3Fields,
  group4Fields,
} from "../fields";
import { s3Config } from "../../../config";
import S3 from "aws-s3-pro";
import useValidationSchema from "../../../hooks/use-validation-schema";
import { getInputGroupSchema } from "../../../validators/teacherApplication";
import { getStep, toggleCheckBoxState } from "../../../utils/teacherApplication";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacherAppData } from "../../../redux/actions/teacherApp";
import { api } from "../../../api";
import { toast } from 'react-toastify';
import { getTeacherApplication } from "api/teacher";
const s3Client = new S3(s3Config);

function SubmitButton({submitting, step, isFirstTime, pristine, hasValidationErrors}) {
  const label = submitting ? "Loading" : step === 5 ? "Submit Application" : isFirstTime || pristine ? "Next" : "Update";
  return (
    <button
      class='btn waves-effect waves-light btn-info m-t-20 btn-lg d-flex align-items-center'
      type='submit'
      disabled={submitting || hasValidationErrors}
    >
      {submitting && (
        <React.Fragment>
          <div class='spinner-border text-light mr-2' role='status'>
            <span class='sr-only'>Loading...</span>
          </div>
        </React.Fragment>
      )}
      {label}
    </button>
  );
}

export default function TeacherApplicationFormSegment({ group }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accountId = user ? user.accountId : "";

  const goToNextStep = () => {
    navigate(`/application/step-${getStep(location) + 1}`);
  };

  const canGoToNextStep = () => getStep(location) < 5;

  const fields = {
    0: group0Fields,
    1: group1Fields,
    2: group2Fields,
    3: group3Fields,
    4: group4Fields,
  };

  const validate = useValidationSchema(getInputGroupSchema(group));
  const handleSubmit = async (values) => {
    try {
      let files = [];
      fields[group].forEach(({ type, name }) => {
        if (type === "checkbox") toggleCheckBoxState(name, true);
        if (type === "file" && values[name]?.name) {
          files.push(
            s3Client
              .uploadFile(values[name], `${accountId}-${name}`)
              .then((result) => ({ [name]: result.key }))
              .catch((err) => err)
          );
        }
      });

      if (files.length) {
        files = await Promise.all(files);
        files = files.reduce(
          (acc, curr) => ({ ...acc, [Object.keys(curr)[0]]: curr[Object.keys(curr)[0]] }),
          {}
        );
      }

      const hasNextStep = canGoToNextStep();

      const newData = {
        ...values,
        ...files,
        accountId,
        applicationStatus: !hasNextStep ? "ASTAT002" : "ASTAT001",
        agreeTerms: !hasNextStep,
      };

      console.log("🚀 ~ file: index.jsx ~ line 71 ~ handleSubmit ~ newData", newData);

      await api.post("teacher/update", newData);

      dispatch(updateTeacherAppData(newData));
      getTeacherApplication(dispatch);

      if (hasNextStep) goToNextStep();
      else
      {
        await dispatch(updateTeacherAppData({ applicationStatus: "ASTAT002" }));
        toast.success("Your application has been sent!");
        navigate("/application-status", { replace: true });
      };
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 27 ~ handleSubmit ~ error", error);
    }
  };

  // const initialValues = useSelector((state) => state.teacherApp.data);
  const initialValues = useSelector((state) => state.teacher ? state.teacher.getIn(['applications', 'application']) : {});

  return (
    <Form
      validate={validate}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={({ handleSubmit, initialValues, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="form-material form-horizontal position-relative"
        >
          {fields[group].map((props) => (
            <div className="mt-3 mb-5">
              {props.type === "text" && <InputControl {...props} disabled={submitting} />}
              {props.type === "checkbox" && (
                <CheckBoxControl {...props} disabled={initialValues[props.name]} />
              )}
              {props.type === "text-area" && (
                <TextAreaControl {...props} disabled={submitting} />
              )}
              {props.type === "file" && (
                <FileInputControl {...props} disabled={submitting} />
              )}
            </div>
          ))}
          <FormSpy component={SubmitButton} step={getStep(location)} subscription={{submitting: true, initialValues: true, pristine: true, hasValidationErrors: true}} isFirstTime={!!!initialValues[fields[group][0].name]?.length} />
        </form>
      )}
    />
  );
}

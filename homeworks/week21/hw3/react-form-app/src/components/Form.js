import styled from "styled-components";
import FormInput from "./FormInput";
import useForm from "../customHooks/useForm";
import { formInputDatas } from "../constant/formInputDatas";

const FormContainer = styled.form`
  padding-top: 3rem;
`;

const FormButton = styled.div`
  margin-top: 3.5rem;

  button {
    padding: 0.6rem 1.6rem;
    border: 0 white;
    border-radius: 3px;
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
    background: #fad312;
    text-align: center;
    font-size: 15px;
  }

  button:hover {
    cursor: pointer;
    opacity: 0.9;
    transform: scale(1.1);
  }

  button:active {
    transform: scale(1);
  }
`;

const RedHint = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #e74149;
`;

export default function Form() {
  console.log("<<< render Form >>>");

  const { formValues, setFormValues, isSubmited, setIsSubmited, handleSubmit } =
    useForm(formInputDatas);

  return (
    <FormContainer onSubmit={handleSubmit}>
      {formInputDatas.map((formInputData) => (
        <FormInput
          key={formInputData.id}
          formInputData={formInputData}
          setFormValues={setFormValues}
          isSubmited={isSubmited}
        />
      ))}

      <FormButton>
        <button>提交</button>
        <RedHint>請勿通過表單送出您的密碼</RedHint>
      </FormButton>
    </FormContainer>
  );
}

import styled from "styled-components";
import useFormInput from "../customHooks/useFormInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & + & {
    margin-top: 2.5rem;
  }
`;

const InputLabel = styled.label`
  font-size: 20px;
  color: #000000;

  span {
    margin-left: 0.5rem;
    font-size: 20px;
    color: #e74149;
  }
`;

const ExtraInfo = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  color: #000000;
  white-space: nowrap;
`;

const StyledInput = styled.input`
  width: 60%;
  margin-top: 20px;
  padding: 3px 6px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  font-size: 15px;

  &::placeholder {
    color: #afafaf;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const RadioLabel = styled.label`
  font-size: 14px;
  margin-top: 1rem;
  margin-left: 5px;
`;

const StyledRadio = styled.input`
  margin-right: 6px;
`;

const RequiredMessage = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 13px;
  color: red;
  visibility: ${(prop) => (prop.$show ? `visible` : `hidden`)};
`;

export default function FormInput({
  formInputData,
  setFormValues,
  isSubmited,
}) {
  console.log("render FormInput");

  const {
    value,
    setValue,
    showRequired,
    setShowRequired,
    handleInputChange,
    handleInputBlur,
  } = useFormInput(formInputData, setFormValues, isSubmited);

  return (
    <Container>
      <InputLabel htmlFor={formInputData.id}>
        {formInputData.label}
        {formInputData.isRequired && <span>*</span>}
      </InputLabel>
      {formInputData.extraInfo && (
        <ExtraInfo>{formInputData.extraInfo}</ExtraInfo>
      )}
      {formInputData.type !== "radio" && (
        <StyledInput
          type={formInputData.type}
          name={formInputData.inputName}
          id={formInputData.id}
          placeholder={formInputData.inputPlaceholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      )}
      {formInputData.type === "radio" &&
        formInputData.Options.map((Option, index) => (
          <RadioLabel key={index}>
            <StyledRadio
              type={formInputData.type}
              name={formInputData.inputName}
              value={Number(index)}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {Option}
          </RadioLabel>
        ))}
      {formInputData.isRequired && (
        <RequiredMessage $show={showRequired}>
          {formInputData.requiredMessage}
        </RequiredMessage>
      )}
    </Container>
  );
}

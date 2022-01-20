import { useState, useCallback } from "react";

export default function useForm(formInputDatas) {
  const [formValues, setFormValues] = useState(() => {
    const initValue = formInputDatas.map((formInputData) => {
      return {
        label: `${formInputData.label}`,
        inputValue: "",
        isRequired: formInputData.isRequired,
      };
    });
    return initValue;
  });

  const [isSubmited, setIsSubmited] = useState(false);

  const checkFormRequired = useCallback(() => {
    const RequiredValues = formValues.filter((formValue) => {
      if (formValue.isRequired) return formValue;
    });

    if (RequiredValues.find((formValue) => formValue.inputValue === "")) {
      return false;
    } else {
      return true;
    }
  }, [formValues]);

  const collectFormValues = useCallback(() => {
    const finalValue = formValues.map((formValue) => {
      return `${formValue.label}： ${formValue.inputValue}\n`;
    });

    return finalValue.join("");
  }, [formValues]);

  const confirmFormValue = useCallback((value) => {
    return window.confirm(`${value}\n請確認表單內容是否無誤？`);
  }, []);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    setIsSubmited(true);
    const isPass = checkFormRequired();
    if (!isPass) return alert("請確認表單填寫完畢後再送出！");
    const value = collectFormValues();
    if (!confirmFormValue(value)) return;
    return e.target.submit();
  };

  return {
    formValues,
    setFormValues,
    isSubmited,
    setIsSubmited,
    handleSubmit,
  };
}

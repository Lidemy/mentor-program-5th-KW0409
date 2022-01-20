import { useState, useEffect, useCallback } from "react";

export default function useFormInput(formInputData, setFormValues, isSubmited) {
  const [value, setValue] = useState("");
  const [showRequired, setShowRequired] = useState(false);

  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
      if (!showRequired) return;
      setShowRequired(false);
    },
    [setValue, showRequired, setShowRequired]
  );

  const handleInputBlur = useCallback(() => {
    setFormValues((prevStates) => {
      return prevStates.map((prevState) => {
        if (prevState.label !== formInputData.label) return prevState;
        if (formInputData.type === "radio") {
          return {
            ...prevState,
            inputValue: formInputData.Options[Number(value)],
          };
        } else {
          return {
            ...prevState,
            inputValue: value,
          };
        }
      });
    });
  }, [setFormValues, formInputData, value]);

  useEffect(() => {
    console.log("useEffect(FormInput.js)");
    if (!isSubmited) return;
    if (!value) return setShowRequired(true);
  }, [isSubmited, value]);

  return {
    value,
    setValue,
    showRequired,
    setShowRequired,
    handleInputChange,
    handleInputBlur,
  };
}

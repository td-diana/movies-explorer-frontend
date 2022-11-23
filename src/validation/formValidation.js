import { useCallback, useState } from "react";
import { isEmail } from "validator";

export default function FormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    if (name === "email") {
      if (!isEmail(value)) {
        input.setCustomValidity("Некорректный Email");
      } else {
        input.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setIsValid,
  };
}

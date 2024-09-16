import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import '../Input/Input.css'

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className='input'
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="error">{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
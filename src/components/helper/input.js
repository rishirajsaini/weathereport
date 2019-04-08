import React from "react";

const Input = props => {
  const {
    name,
    value,
    onChangeHandle,
    className,
    errorMessage,
    placeHolder,
	type
  } = props;
  return (
    <div className="form-group">
      <input
        type={type}
        className={className}
        id={name}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChangeHandle}
      />
      <div className="c-error">{errorMessage}</div>
    </div>
  );
};

export default Input;

import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const PasswordInput = ({ value, onChange, placeholder, focus }) => {
  const inputRef = useRef();
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <input
      ref={inputRef}
      type="password"
      className="p-2 mt-1 mb-2 text-black bg-white border-2 border-slate-200"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="new-password"
      required
    />
  );
};
PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
};
export default PasswordInput;

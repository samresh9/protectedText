import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function ContentArea({
  data,
  textAreaValue,
  setTextAreaValue,
  setIsSaveButtonDisabled,
  isOpenCreateNewModal,
}) {
  const inputEl = useRef();
  useEffect(() => {
    if (textAreaValue || !isOpenCreateNewModal) {
      inputEl.current.focus();
    }
  }, [textAreaValue, isOpenCreateNewModal]);

  useEffect(() => {
    setTextAreaValue(data);
  }, [data, setTextAreaValue]);
  function handleOnChange(e) {
    const newValue = e.target.value;
    setTextAreaValue(newValue);
    setIsSaveButtonDisabled(newValue === "");
  }
  return (
    <>
      <div className="fixed left-0 right-0 flex justify-center min-h-screen">
        <div className="flex w-full max-w-screen-lg p-5 mx-auto">
          <textarea
            className="w-full h-full p-2 overflow-auto text-black bg-white border border-gray-300 resize-none"
            placeholder="your text goes here..."
            value={textAreaValue}
            onChange={handleOnChange}
            ref={inputEl}
          ></textarea>
        </div>
      </div>
    </>
  );
}
ContentArea.propTypes = {
  data: PropTypes.string,
  textAreaValue: PropTypes.string,
  setTextAreaValue: PropTypes.func,
  setIsSaveButtonDisabled: PropTypes.func,
  isOpenCreateNewModal: PropTypes.bool,
};
export default ContentArea;

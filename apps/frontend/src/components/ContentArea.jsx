import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ContentArea({ data }) {
  const [textAreaValue, setTextAreaValue] = useState("");

  useEffect(() => {
    setTextAreaValue(data || "");
  }, [data]);

  return (
    <>
      <div className="fixed left-0 right-0 flex justify-center min-h-screen">
        <div className="flex w-full max-w-screen-lg p-5 mx-auto">
          <textarea
            className="w-full h-full p-2 overflow-auto text-black bg-white border border-gray-300 resize-none"
            placeholder="your text goes here..."
            value={textAreaValue}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}
ContentArea.propTypes = {
  data: PropTypes.string,
};
export default ContentArea;

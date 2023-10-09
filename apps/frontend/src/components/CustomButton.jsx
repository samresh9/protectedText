import PropTypes from "prop-types";

const CustomButton = ({ onSaveClick, children, isSaveButtonDisabled }) => {
  return (
    <>
      <button
        onClick={onSaveClick}
        disabled={isSaveButtonDisabled}
        className="p-1 text-blue-800 bg-white rounded md:p-2 hover:text-blue-500 focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >
        {children}
      </button>
    </>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node,
};
export default CustomButton;

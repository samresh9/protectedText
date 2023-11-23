import PropTypes from "prop-types";

const CustomButton = ({ onClick, children, buttonDisabled }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={buttonDisabled}
        className="p-1 text-blue-800 bg-white rounded md:p-2 hover:text-blue-500 focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >
        {children}
      </button>
    </>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  buttonDisabled: PropTypes.bool,
};
export default CustomButton;

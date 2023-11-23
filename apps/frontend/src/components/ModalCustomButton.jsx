import PropTypes from "prop-types";

function ModalCustomButton({ onClick, bgColor, text }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`px-3 py-1 mb-2 mt-1 ${bgColor} rounded`}
      >
        {text}
      </button>
    </>
  );
}
ModalCustomButton.propTypes = {
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  text: PropTypes.string,
};
export default ModalCustomButton;

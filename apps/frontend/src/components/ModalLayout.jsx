import PropTypes from "prop-types";

function ModalLayout({ children, bgColor }) {
  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center text-black bg-black bg-opacity-40 backdrop-blur-sm ">
        <div className={`p-5 mb-4 text-center ${bgColor} rounded w-72`}>
          {children}
        </div>
      </div>
    </>
  );
}
ModalLayout.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
};
export default ModalLayout;

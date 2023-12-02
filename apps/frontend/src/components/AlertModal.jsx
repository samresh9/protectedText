import { useEffect } from "react";
import PropTypes from "prop-types";

function AlertModal({ onCloseAlert, isDeleteSite }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseAlert();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onCloseAlert]);
  return (
    <>
      <div className="absolute z-40 flex items-center justify-center text-white md:inset-x-80 inset-x-1 top-40 ">
        <div
          className={`p-2 mb-4 text-center bg-slate-500 rounded w-55 
          bg-opacity-70`}
        >
          {isDeleteSite ? (
            <div className="text-lg ">Deleted Successfully!!!</div>
          ) : (
            <div className="text-lg ">Saved Successfully!!!</div>
          )}
        </div>
      </div>
    </>
  );
}
AlertModal.propTypes = {
  onCloseAlert: PropTypes.func,
  isDeleteSite: PropTypes.bool,
};
export default AlertModal;

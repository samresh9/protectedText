import PropTypes from "prop-types";
import CustomButton from "./CustomButton.jsx";

const Navbar = ({
  onSaveClick,
  isSaveButtonDisabled,
  onChangeClick,
  password,
}) => {
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-around gap-5 p-2 bg-blue-700 md:flex-nowrap md:p-4 ">
          <p className="text-xl">ProtectedText </p>
          <div className="flex justify-center gap-2 md:gap-3">
            <CustomButton
              onClick={onSaveClick}
              buttonDisabled={isSaveButtonDisabled}
            >
              Save
            </CustomButton>
            <CustomButton onClick={onChangeClick} buttonDisabled={!password}>
              Change Password
            </CustomButton>
            <CustomButton>Delete</CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};
Navbar.propTypes = {
  onSaveClick: PropTypes.func,
  isSaveButtonDisabled: PropTypes.bool,
  onChangeClick: PropTypes.func,
  password: PropTypes.string,
};
export default Navbar;

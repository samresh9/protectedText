import PropTypes from "prop-types";
import CustomButton from "./CustomButton.jsx";

const Navbar = ({
  onSaveClick,
  isSaveButtonDisabled,
  onChangeClick,
  onDelete,
  isDeleteAndPasswordButtonDisabled,
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
            <CustomButton
              onClick={onChangeClick}
              buttonDisabled={isDeleteAndPasswordButtonDisabled}
            >
              Change Password
            </CustomButton>
            <CustomButton
              onClick={onDelete}
              buttonDisabled={isDeleteAndPasswordButtonDisabled}
            >
              Delete
            </CustomButton>
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
  onDelete: PropTypes.func,
  password: PropTypes.string,
  isDeleteAndPasswordButtonDisabled: PropTypes.bool,
};
export default Navbar;

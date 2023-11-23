import { useState } from "react";
import PropTypes from "prop-types";
import GenericModal from "./ModalLayout.jsx";
import PasswordInput from "./PasswordInput.jsx";
import ModalCustomButton from "./ModalCustomButton.jsx";

const NewPasswordModal = ({
  onEncryption,
  modalMessage,
  modalTitle,
  onClose,
  modalType,
  setPassword,
}) => {
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isnotMatch, setIsNotMatch] = useState();
  const handleOnClose = () => {
    onClose();
  };
  const handleEncryption = (e) => {
    e.preventDefault();
    if (newPassword === repeatPassword) {
      setIsNotMatch(false);
      if (modalType === "changePassword") {
        onEncryption(newPassword);
      } else if (modalType === "newPassword") {
        setPassword(newPassword);
        onEncryption();
      }
      handleOnClose();
    } else {
      setIsNotMatch(true);
    }
  };
  return (
    <>
      <GenericModal bgColor="bg-white">
        <p className="flex justify-center p-4 mb-4 text-lg font-bold shadow-lg">
          {modalTitle}
        </p>
        <p className="mb-2 text-sm italic">{modalMessage}</p>
        <p className="mb-4 text-sm italic">
          (If the password is forgotten, the data can not be accessed.) Longer
          passwords are more secure.
        </p>
        {isnotMatch && (
          <p className="italic text-red-500">Password donot match</p>
        )}
        <form onSubmit={handleEncryption}>
          <div className="flex flex-col mb-4 justify-evenly">
            <PasswordInput
              focus={true}
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <ModalCustomButton
              type="submit"
              text=" Encrypt The Site"
              bgColor="bg-green-400"
            />
            <ModalCustomButton
              text=" Cancel"
              bgColor="bg-red-400"
              onClick={handleOnClose}
            />
          </div>
        </form>
      </GenericModal>
    </>
  );
};

export default NewPasswordModal;

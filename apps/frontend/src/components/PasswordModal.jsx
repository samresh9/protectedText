import { useState } from "react";
import encryptionHandler from "encrypt-handler";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput.jsx";
import ModalLayout from "./ModalLayout.jsx";
import ModalCustomButton from "./ModalCustomButton.jsx";
import "../App.css";

const { decryptData, hashData } = encryptionHandler;
function PasswordModal({
  data,
  setDecryptedData,
  password,
  setPassword,
  setInitHash,
}) {
  const [wrongPassword, setWrongPassword] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const handleOnClose = () => {
    setCloseModal((prevcloseModal) => !prevcloseModal);
  };
  function handleDecryption(e) {
    e.preventDefault();
    try {
      const decrypted = decryptData(data, password);
      if (!decrypted) {
        setWrongPassword(true);
        return;
      }
      const initHash = hashData(decrypted, password);
      setWrongPassword(false);
      setDecryptedData(decrypted);
      setInitHash(initHash);
      handleOnClose();
    } catch (err) {
      setWrongPassword(true);
    }
  }

  return (
    <>
      {closeModal && (
        <ModalLayout bgColor="bg-white">
          <p className="mb-4 italic">
            This site already exists. If this is your site enter the password,
            or you can try using different url.
          </p>

          {wrongPassword ? (
            <>
              <p
                className={
                  wrongPassword
                    ? "italic text-red-500 animate-shake "
                    : "italic text-red-500 "
                }
              >
                Your password is incorrect.
              </p>
              <p className="italic">
                Try different password, or go to
                <p className="font-bold underline">
                  <Link to="/">(Homepage)</Link>{" "}
                </p>
              </p>
            </>
          ) : null}
          <p className="mt-2">Enter your password to enter site</p>
          <form onSubmit={handleDecryption}>
            <div className="flex flex-col justify-evenly">
              <PasswordInput
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <ModalCustomButton
                type="submit"
                bgColor="bg-green-300"
                text=" Decrypt The Site"
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </>
  );
}
PasswordModal.propTypes = {
  showModal: PropTypes.bool,
  data: PropTypes.string,
  setDecryptedData: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  setInterval: PropTypes.func,
  setInitHash: PropTypes.func,
};
export default PasswordModal;

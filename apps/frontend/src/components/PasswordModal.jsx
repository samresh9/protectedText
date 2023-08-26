import { useState } from "react";
import encryptionHandler from "encrypt-handler";
import PropTypes from "prop-types";

const { decryptData } = encryptionHandler;
function PasswordModal({
  showModal,
  data,
  setDecryptedData,
  password,
  setPassword,
}) {
  const [wrongPassword, setWrongPassword] = useState(false);
  const [closeModal, setCloseModal] = useState(showModal);
  const handleOnClose = () => {
    setCloseModal((prevcloseModal) => !prevcloseModal);
  };
  function handleDecryption(e) {
    e.preventDefault();
    const decrypted = decryptData(data.content.encrypted, password);

    if (!decrypted) {
      setWrongPassword(true); // Set wrongPassword if decryption fails
    } else {
      setWrongPassword(false); // Reset wrongPassword if decryption is successful
      setDecryptedData(decrypted);
      setPassword("");
      handleOnClose();
    }
  }

  return (
    <>
      {closeModal && (
        <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-30 backdrop-blur-sm ">
          <div className="p-5 mb-4 text-center rounded bg-zinc-800 w-72">
            <p className="mb-4">Site already exists</p>
            <p>Enter your password to decrypt the site</p>
            {wrongPassword ? <p>Your password is incorrect</p> : null}
            <form onSubmit={handleDecryption}>
              <div className="flex flex-col justify-evenly">
                <input
                  type="password"
                  className="p-2 mt-1 text-black bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="submit"
                  className="px-3 py-1 mt-5 bg-green-300 rounded"
                >
                  Decrypt The Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
PasswordModal.propTypes = {
  showModal: PropTypes.bool,
  data: PropTypes.object,
  setDecryptedData: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
};
export default PasswordModal;

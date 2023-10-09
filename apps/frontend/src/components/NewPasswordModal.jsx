import { useState } from "react";

import encryptionHandler from "encrypt-handler";
import PropTypes from "prop-types";

const { encrtptData } = encryptionHandler;

const NewPasswordModal = ({ newPassword, setNewPassword, onEncryption }) => {
  const [closeModal, setCloseModal] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isnotMatch, setIsNotMatch] = useState();
  const handleOnClose = () => {
    setCloseModal((prevcloseModal) => !prevcloseModal);
  };
  const handleEncryption = (e) => {
    e.preventDefault();
    if (newPassword === repeatPassword) {
      setIsNotMatch(false);
      onEncryption();
      handleOnClose();
    }
    setIsNotMatch(true);
  };
  return (
    <>
      {closeModal && (
        <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-30 backdrop-blur-sm ">
          <div className="p-5 mb-4 text-center rounded bg-zinc-800 w-72">
            <p className="flex justify-center p-4 mb-4 bg-gray-500 rounded-lg shadow-lg">
              Create a New Password
            </p>
            <p className="mb-2">
              Make sure to remember the password. We do not store passwords,
              just the encrypted data.{" "}
            </p>
            <p className="mb-4">
              (If the password is forgotten, the data can not be accessed.)
              Longer passwords are more secure.
            </p>
            {isnotMatch && <p className="text-red-500">Password donot match</p>}
            <form onSubmit={handleEncryption}>
              <div className="flex flex-col mb-4 justify-evenly">
                <input
                  type="password"
                  className="p-2 mt-1 text-black bg-white"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col justify-evenly">
                <input
                  type="password"
                  className="p-2 mt-1 text-black bg-white"
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="submit"
                  className="px-3 py-1 mt-5 bg-green-300 rounded"
                >
                  Encrypt The Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPasswordModal;

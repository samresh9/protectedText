import { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import encryptionHandler from "encrypt-handler";
import Navbar from "./NavBar.jsx";
import ContentArea from "./ContentArea.jsx";
import CreateNewModal from "./CreateNewModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import NewPasswordModal from "./NewPasswordModal.jsx";
import Loader from "./Loader.jsx";
import ModalLayout from "./ModalLayout.jsx";
import AlertModal from "./AlertModal.jsx";
import DeleteModal from "./DeleteModal.jsx";

const { encryptData, hashData } = encryptionHandler;
const modalType = Object.freeze({
  changePassword: "changePassword",
  newPassword: "newPassword",
});
function WrapperComponent() {
  const [decryptedData, setDecryptedData] = useState();
  const [encryptedData, setEncryptedData] = useState();
  const [initHash, setInitHash] = useState("");
  const [isLoadingSaveData, setIsLoadingSaveData] = useState(false);
  const [isNewSite, setIsNewSite] = useState(false);
  const [password, setPassword] = useState("");
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isOpenCreateNewModal, setIsOpenCreateNewModal] = useState(true);
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [errors, setErrors] = useState("");
  const [isDeleteSite, setIsDeleteSite] = useState(false);
  const [isDeleteSuccessfull, setIsDeleteSuccessful] = useState(false);
  const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
  };

  const { id } = useParams();
  const lowercaseId = id.toLowerCase();

  const {
    data: res,
    error,
    isLoading,
  } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}api/notes/${lowercaseId}`,
    fetcher,
    {
      onSuccess: (responseData) => {
        if (responseData.code === "NOT_FOUND") {
          setIsNewSite(true);
        } else {
          setEncryptedData(responseData.data.content.encrypted);
        }
      },
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (error)
    return (
      <>
        <div className="flex items-center justify-center min-h-screen text-center text-red-500">
          Error Occured: Try Again
        </div>
      </>
    );
  const handlePostData = async (choosenPassword) => {
    setIsLoadingSaveData(true);
    const encryptedContent = encryptData(textAreaValue, choosenPassword);
    const currentHash = hashData(textAreaValue, choosenPassword);
    let initialHash = initHash;
    if (isNewSite && !initialHash) {
      initialHash = currentHash;
    }

    const postData = {
      id: lowercaseId,
      encryptedContent,
      initHash: initialHash,
      currentHash,
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    return { response, currentHash };
  };
  const handleDelteData = async () => {
    try {
      if (!isDeleteSite) {
        setIsDeleteSite(true);
        return;
      }
      const postData = {
        id,
        initHash,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/notes`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong Please Reload");
      }
      setIsDeleteSuccessful(true);
      setIsSavedAlert(true);
      setIsDeleteSite(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!password && !isNewPassword) {
        setIsNewPassword(true);
        return;
      }
      const choosenPassword = password;
      const { response, currentHash } = await handlePostData(choosenPassword);
      if (!response.ok) {
        throw new Error("Something Went Wrong Please Reload");
      }
      setIsSavedAlert(true);
      setIsSaveButtonDisabled(true);
      setInitHash(currentHash);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setIsLoadingSaveData(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!isChangePassword) {
        setIsChangePassword(true);
        return;
      }
      const choosenPassword = password;
      const { response, currentHash } = await handlePostData(choosenPassword);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      setIsSavedAlert(true);
      setIsChangePassword(false);
      setIsSaveButtonDisabled(true);
      setInitHash(currentHash);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setIsLoadingSaveData(false);
    }
  };
  return (
    <>
      {res && (
        <Main>
          {errors && (
            <ModalLayout bgColor="bg-white">
              <p className="z-50 text-center text-red-500 ">{errors}</p>
            </ModalLayout>
          )}

          <Navbar
            onSaveClick={handleSaveClick}
            onChangeClick={handleChangePassword}
            onDelete={handleDelteData}
            isSaveButtonDisabled={isSaveButtonDisabled}
            password={password}
          />
          {isLoadingSaveData && <Loader />}
          {isSavedAlert && (
            <AlertModal
              isDeleteSite={isDeleteSuccessfull}
              onCloseAlert={() => {
                setIsSavedAlert(false);
              }}
            />
          )}
          {!errors && (
            <Content>
              <>
                <ContentArea
                  data={decryptedData}
                  password={password}
                  textAreaValue={textAreaValue}
                  setTextAreaValue={setTextAreaValue}
                  setIsSaveButtonDisabled={setIsSaveButtonDisabled}
                  isOpenCreateNewModal={isOpenCreateNewModal}
                />
                {isNewSite && (
                  <CreateNewModal
                    isOpenCreateNewModal={isOpenCreateNewModal}
                    urlId={lowercaseId}
                    onToggle={() =>
                      setIsOpenCreateNewModal((prevopenModal) => !prevopenModal)
                    }
                  />
                )}
                {!isNewSite && (
                  <PasswordModal
                    data={encryptedData}
                    setDecryptedData={setDecryptedData}
                    setInitHash={setInitHash}
                    password={password}
                    setPassword={setPassword}
                  />
                )}
                {isChangePassword && (
                  <NewPasswordModal
                    password={password}
                    setPassword={setPassword}
                    onEncryption={handleChangePassword}
                    onClose={() => {
                      setIsChangePassword(false);
                    }}
                    modalTitle="Enter a New password"
                    modalMessage="Do not forgot"
                    modalType={modalType.changePassword}
                  />
                )}
                {isNewPassword && (
                  <NewPasswordModal
                    password={password}
                    setPassword={setPassword}
                    onEncryption={handleSaveClick}
                    onClose={() => {
                      setIsNewPassword(false);
                    }}
                    modalType={modalType.newPassword}
                    modalTitle="Create a password"
                    modalMessage=" Make sure to remember the password. We do not store passwords,
                  just the encrypted data."
                  />
                )}
                {isDeleteSite && (
                  <DeleteModal
                    urlId={id}
                    onClose={() => {
                      setIsDeleteSite(false);
                    }}
                    onDeleteSite={handleDelteData}
                  />
                )}
              </>
            </Content>
          )}
        </Main>
      )}
    </>
  );
}
function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}
Main.propTypes = {
  children: PropTypes.node,
};
function Content({ children }) {
  return (
    <>
      <main className="content">{children}</main>
    </>
  );
}
Content.propTypes = {
  children: PropTypes.node,
};
export default WrapperComponent;

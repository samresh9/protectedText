import { useState, useEffect } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import encryptionHandler from "encrypt-handler";
import Navbar from "./NavBar.jsx";
import ContentArea from "./ContentArea.jsx";
import CreateNewModal from "./CreateNewModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import NewPasswordModal from "./NewPasswordModal.jsx";
import Loader from "./Loader.jsx";

const { encryptData, hashData } = encryptionHandler;

function WrapperComponent() {
  const [decryptedData, setDecryptedData] = useState();
  const [encryptedData, setEncryptedData] = useState();
  const [isNewSite, setIsNewSite] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [errors, setErrors] = useState("");
  const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
    // try {
    //   const res = await fetch(...args);
    //   // console.log(res);
    //   const data = await res.json();
    //   console.log(data,"data")
    //   if (data.code === "NOT_FOUND") {
    //     setIsNewSite(true);
    //   } else {
    //     setEncryptedData(data.data.content.encrypted);
    //   }
    //   setLoadComponent(true);
    // } catch (err) {
    //   setError(err);
    // }
  };

  const { id } = useParams();
  const {
    data: responseData,
    error,
    isLoading,
  } = useSWR(`http://localhost:7000/api/notes/${id}`, fetcher, {
    onSuccess: (data) => {
      if (data.code === "NOT_FOUND") {
        setIsNewSite(true);
      } else {
        setEncryptedData(data.data.content.encrypted);
      }
    },
  });

  // useEffect(() => {
  //   fetcher(`http://localhost:7000/api/notes/${id}`);
  // }, [id]);

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

  const handleSaveClick = async () => {
    try {
      if (!password && !isNewPassword) {
        setIsNewPassword(true);
        return;
      }
      const choosenPassword = isNewPassword ? newPassword : password;
      const encryptedContent = encryptData(textAreaValue, choosenPassword);
      const hash = hashData(textAreaValue, choosenPassword);
      const postData = {
        id,
        encryptedContent,
        hash,
      };

      const response = await fetch(`http://localhost:7000/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      alert("saved");
      setIsSaveButtonDisabled(true);
    } catch (err) {
      setErrors(err.message);
    }
  };

  return (
    <>
      {errors && (
        <div className="min-h-full text-center text-red-600">{errors}</div>
      )}
      {responseData && (
        <>
          <Navbar
            onSaveClick={handleSaveClick}
            isSaveButtonDisabled={isSaveButtonDisabled}
          />
          <ContentArea
            data={decryptedData}
            password={password}
            textAreaValue={textAreaValue}
            setTextAreaValue={setTextAreaValue}
            setIsSaveButtonDisabled={setIsSaveButtonDisabled}
          />
          {isNewSite && <CreateNewModal />}
          {!isNewSite && (
            <PasswordModal
              data={encryptedData}
              setDecryptedData={setDecryptedData}
              password={password}
              setPassword={setPassword}
            />
          )}
          {isNewPassword && (
            <NewPasswordModal
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              onEncryption={handleSaveClick}
            />
          )}
        </>
      )}
    </>
  );
}

export default WrapperComponent;

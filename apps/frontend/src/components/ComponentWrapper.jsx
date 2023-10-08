import { useState, useEffect } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import encryptionHandler from "encrypt-handler";
import Navbar from "./NavBar.jsx";
import ContentArea from "./ContentArea.jsx";
import CreateNewModal from "./CreateNewModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import NewPasswordModal from "./NewPasswordModal.jsx";

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
  const [loadComponent, setLoadComponent] = useState("");
  const [error, setError] = useState("");
  const fetcher = async (...args) => {
    try {
      const res = await fetch(...args);
      // console.log(res);
      const data = await res.json();
      if (data.code === "NOT_FOUND") {
        setIsNewSite(true);
      } else {
        setEncryptedData(data.data.content.encrypted);
      }
      setLoadComponent(true);
    } catch (err) {
      setError(err);
    }
  };

  const { id } = useParams();
  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:7000/api/notes/${id}`,
  //   fetcher
  // );

  useEffect(() => {
    fetcher(`http://localhost:7000/api/notes/${id}`);
  }, [id]);

  // if (error) console.log(error); // <div className="text-red-500">Error occured</div>;

  // if (isLoading) return <div>Lodaing...</div>;

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
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(postData), // Convert the data to JSON format
      });
    
    } catch (err) {
      alert(err);
      console.log(err);
    }
    alert("saved");
  };

  return (
    <>
      {error && <div>{error}</div>}
      {loadComponent && (
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

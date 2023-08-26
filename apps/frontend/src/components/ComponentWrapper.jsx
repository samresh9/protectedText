import { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import Navbar from "./NavBar.jsx";
import ContentArea from "./ContentArea.jsx";
import CreateNewModal from "./CreateNewModal.jsx";
import PasswordModal from "./PasswordModal.jsx";

function WrapperComponent() {
  const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
  };
  const [decryptedData, setDecryptedData] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:7000/api/notes/${id}`,
    fetcher
  );

  if (error) return <div className="text-red-500">Error occured</div>;

  if (isLoading) return <div>Lodaing...</div>;

  return (
    <>
      <Navbar />
      <ContentArea data={decryptedData} password={password} />
      <PasswordModal
        showModal={!data?.data.newUser}
        data={data?.data}
        setDecryptedData={setDecryptedData}
        password={password}
        setPassword={setPassword}
      />
      <CreateNewModal showModal={data?.data.newUser} />
    </>
  );
}

export default WrapperComponent;

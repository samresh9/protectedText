import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function CreateNewModal() {
  const [closeModal, setCloseModal] = useState(true);
  const handleOnClose = () => {
    setCloseModal((prevcloseModal) => !prevcloseModal);
  };
  return (
    <>
      {closeModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-30 backdrop-blur-sm ">
            <div className="p-5 mb-4 text-center bg-white rounded w-72">
              <p className="mb-4"> Create New Site?</p>
              <p>Would you like to create new Site with id $id ?</p>
              <div className="flex justify-evenly">
                <button
                  className="px-3 py-1 mt-5 bg-green-300 rounded"
                  onClick={handleOnClose}
                >
                  Create Site
                </button>
                <Link to="/">
                  <button className="px-3 py-1 mt-5 bg-red-300 rounded">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
CreateNewModal.propTypes = {
  showModal: PropTypes.bool,
};
export default CreateNewModal;

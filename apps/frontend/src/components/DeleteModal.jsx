import { useState } from "react";
import PropTypes from "prop-types";
import ModalLayout from "./ModalLayout.jsx";

function DeleteModal({ urlId, onClose, onDeleteSite }) {
  const [openModal, setOpenModal] = useState(true);
  const handleOnClose = () => {
    setOpenModal(false);
    onClose();
  };
  return (
    <>
      {openModal && (
        <>
          <ModalLayout bgColor="bg-white">
            <>
              <p className="mb-4"> Delete the Site?</p>
              <p>
                Would you like to DELETE Site with Site Name{" "}
                <span className="font-mono text-lg"> {` ${urlId} ?`}</span>
              </p>
              <div className="flex justify-evenly">
                <button
                  className="px-3 py-1 mt-5 bg-green-300 rounded"
                  onClick={handleOnClose}
                >
                  cancel
                </button>

                <button
                  className="px-3 py-1 mt-5 bg-red-300 rounded"
                  onClick={onDeleteSite}
                >
                  Yes
                </button>
              </div>
            </>
          </ModalLayout>
        </>
      )}
    </>
  );
}
DeleteModal.propTypes = {
  showModal: PropTypes.bool,
  isOpenCreateNewModal: PropTypes.bool,
  onClose: PropTypes.func,
  urlId: PropTypes.string,
  onDeleteSite: PropTypes.func,
};
export default DeleteModal;

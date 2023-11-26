import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ModalLayout from "./ModalLayout.jsx";

function CreateNewModal({ isOpenCreateNewModal, onToggle, urlId }) {
  const handleOnClose = () => {
    onToggle();
  };
  return (
    <>
      {isOpenCreateNewModal && (
        <>
          <ModalLayout bgColor="bg-white">
            <>
              <p className="mb-4"> Create New Site?</p>
              <p>
                Would you like to create new Site with Site Name{" "}
                <span className="font-mono text-lg"> {` ${urlId} ?`}</span>
              </p>
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
            </>
          </ModalLayout>
        </>
      )}
    </>
  );
}
CreateNewModal.propTypes = {
  showModal: PropTypes.bool,
  isOpenCreateNewModal: PropTypes.bool,
  onToggle: PropTypes.func,
  urlId: PropTypes.string,
};
export default CreateNewModal;

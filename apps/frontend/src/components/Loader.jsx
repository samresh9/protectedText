import ModalLayout from "./ModalLayout.jsx";

function Loader() {
  return (
    <>
      <ModalLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </ModalLayout>
    </>
  );
}

export default Loader;

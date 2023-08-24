import CustomButton from "./CustomButton.jsx";

const Navbar = () => {
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-around gap-5 p-2 bg-blue-700 md:flex-nowrap md:p-4 ">
          <p className="text-xl">ProtectedText </p>
          <div className="flex justify-center gap-2 md:gap-3">
            <CustomButton>Save</CustomButton>
            <CustomButton>Change Password</CustomButton>
            <CustomButton>Delete</CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

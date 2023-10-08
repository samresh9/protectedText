function ContentArea() {
  return (
    <>
      <div className="fixed left-0 right-0 flex justify-center min-h-screen">
        <div className="flex w-full max-w-screen-lg p-5 mx-auto">
          <textarea
            className="w-full h-full p-2 overflow-auto text-black bg-white border border-gray-300 resize-none"
            placeholder="your text goes here..."
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default ContentArea;

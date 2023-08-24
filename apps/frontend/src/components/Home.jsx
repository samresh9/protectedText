import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomButton from "./CustomButton.jsx";

function Home() {
  const [id, setId] = useState("");
  const Navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && id) {
      Navigate(`/${id}`);
    }
  };
  return (
    <>
      <div className="grid content-center min-h-screen grid-cols-1 bg-blue-700 md:grid-cols-2 justify-items-center ">
        <div className="p-4">
          <p className="text-3xl font-bold text-center">Protected Text</p>
        </div>
        <div className="px-10 py-4 md:px-20">
          <ul className="space-y-4 list-disc list-outside">
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore, ad blanditiis. Blanditiis veritatis tempora quis,
            </li>
            <li>
              iusto, corporis dolorum, accusamus atque at eligendi odit saepe.
              Reprehenderit eveniet expedita distinctio modi sed.
            </li>
            <li>
              iusto, corporis dolorum, accusamus atque at eligendi odit saepe.
              Reprehenderit eveniet expedita distinctio modi sed.
            </li>
          </ul>
        </div>
        <div className="flex justify-center mt-4 md:col-span-2">
          <div className="flex flex-col items-center w-full gap-2 p-4 md:self-center md:flex-row">
            <span className="text-center">Go to baseUrl.com/</span>
            <div>
              <input
                className="p-2 mx-3 text-black bg-white"
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              ></input>
              <span>
                <Link to={`/${id}`}>
                  <CustomButton>GO</CustomButton>
                </Link>
              </span>
            </div>
            <div>
              <p>(or write directly on the address bar)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

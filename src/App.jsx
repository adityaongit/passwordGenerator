import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  const copyClipBoard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-black h-screen w-full justify-center flex flex-col items-center">
      <div className="heading text-white sm:text-5xl font-medium text-4xl">
        Password Generator
      </div>
      <div className="input-box mt-16 mx-auto">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="border border-gray-800 text-white px-4 ml-5 sm:w-[320px] py-2 rounded-xl bg-[#0A0A0A]"
        />
        <button
          onClick={copyClipBoard}
          className="rounded-xl text-black bg-[#EDEDED] px-4 py-2 hover:bg-[#dbd9d9] mx-5"
        >
          Copy
        </button>
      </div>
      <div className="custom">
        <div className="length flex items-center w-full">
          <input
            type="range"
            value={length}
            min={8}
            max={64}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="range range-xs range-success m-6"
            step={2}
          />
          <label htmlFor="lengthRange" className="text-white pl-4 pr-1">
            Length:
          </label>
          <div className="text-white flex justify-center">{length}</div>
        </div>

        <div className="num flex justify-center items-center mt-2">
          <input
            type="checkbox"
            name=""
            id=""
            value={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
            className="checkbox checkbox-success checkbox-xs"
          />
          <div className="text-white px-4">Include Numbers</div>
        </div>

        <div className="char flex justify-center pl-[10px] pt-2 items-center">
          <input
            type="checkbox"
            name=""
            id=""
            value={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            className="checkbox checkbox-success checkbox-xs"
          />
          <label className="text-white px-4">Include Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;

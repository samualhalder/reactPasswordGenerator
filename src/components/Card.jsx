import { useCallback, useState, useEffect, useRef } from "react";

export function Card() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState(null);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) string += "1234567890";
    if (char) string += "!#~$^%&*(){}[]`";
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(index);
    }
    setPassword(pass);
  }, [number, char, length]);
  let copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [number, char, length, setPassword]);
  return (
    <>
      <div className="bg-violet-400 w-full max-w-lg mx-auto rounded-lg shadow-sm my-8 p-6">
        <h1 className="text-white justify-center text-center text-xl">
          Password Generator
        </h1>
        <div className=" bg-violet-600 flex shadow rounded-md mb-8 overflow-hidden">
          <input
            type="text"
            className="outline-none p-3 m-2 rounded-lg w-full"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
          ></input>
          <button
            className="hover:bg-yellow-200 bg-yellow-500 outline-none p-2 mx-1 my-2 rounded-lg w-[20%]"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-row accent-yellow-300">
          <div className="mx-2 my-2 text-white">
            <input
              type="range"
              className="cursor-pointer  bg-white"
              min={6}
              max={20}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range"> Length:{length}</label>
          </div>
          <div className="mx-2 my-2 text-white">
            <input
              type="checkbox"
              value={number}
              onChange={() => setNumber(!number)}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className="mx-2 my-2 text-white">
            <input
              type="checkbox"
              value={char}
              onChange={() => setChar(!char)}
            />
            <label htmlFor="">Charecters</label>
          </div>
        </div>
      </div>
    </>
  );
}

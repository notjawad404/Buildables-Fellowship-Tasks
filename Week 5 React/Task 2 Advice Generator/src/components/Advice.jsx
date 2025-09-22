import React, { useState, useEffect } from "react";
import axios from "axios";

function Advice() {
  const [id, setId] = useState(117);
  const [advice, setAdvice] = useState(
    "It is easy to sit up and take notice, what's difficult is getting up and taking action."
  );
  const [loading, setLoading] = useState(true);

  const newAdvice = async () => {
    setLoading(true);
    try {
      const [{ data }] = await Promise.all([
        axios.get("https://api.adviceslip.com/advice"),
        new Promise((resolve) => setTimeout(resolve, 2000)), // fake delay
      ]);
      setId(data.slip.id);
      setAdvice(data.slip.advice);
    } catch (error) {
      setId(404);
      setAdvice(" - No advice found. - ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    newAdvice();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(218,23%,16%)] font-['Manrope'] text-[24px] text-[hsl(193,38%,86%)] px-4">
      <main className="relative bg-[hsl(217,19%,24%)] rounded-2xl text-center max-w-md w-full p-10">
        {/* Title */}
        <h1 className="text-[hsl(150,100%,66%)] text-[12px] uppercase tracking-[0.2rem] font-extralight mb-6">
          Advice #{id}
        </h1>

        {/* Advice text */}
        <div className="my-6">"{advice}"</div>

        {/* Divider (horizontal line) */}
        <div className="relative border-t border-[hsl(217,19%,38%)] my-8">
          <div className="absolute bg-[hsl(217,19%,24%)] w-12 h-5 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-between items-center px-1">
            <div className="w-[6px] h-[16px] bg-[hsl(193,38%,86%)] rounded-full"></div>
            <div className="w-[6px] h-[16px] bg-[hsl(193,38%,86%)] rounded-full"></div>
          </div>
        </div>

        {/* Dice button */}
        <div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[hsl(150,100%,66%)] h-16 w-16 rounded-full flex items-center justify-center transition-transform duration-500 ${
            loading ? "animate-spin" : ""
          }`}
        >
          <button onClick={newAdvice} disabled={loading}>
            <img
              src="/src/assets/icon-dice.svg"
              alt="Dice"
              className={loading ? "opacity-50" : ""}
            />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Advice;

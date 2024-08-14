import React, { useState } from "react";
import CanvasImageScroller from "./component/CanvasImageScroller";

function App() {
  const [isCar, setIsCar] = useState(false);
  const [show, setShow] = useState(false);
  const [hoverAbstract, setHoverAbstract] = useState(false);
  const [hoverCar, setHoverCar] = useState(false);

  return (
    <>
      {!show && (
        <div className="h-screen w-full bg-zinc-950 flex flex-col sm:flex-row justify-center items-center p-10 sm:p-20 space-y-10 sm:space-x-20">
          <div className="h-1/2 w-full sm:w-1/2 rounded-xl overflow-hidden">
            <button
              className="h-full w-full relative"
              onClick={() => {
                setIsCar(false);
                setShow(true);
              }}
            >
              <img
                className={`h-full w-full object-cover transition-all duration-500 ${
                  hoverAbstract && "scale-110 opacity-40"
                }`}
                src="/porsce/frame_0001.jpeg"
                alt="PORSCHE"
              />
              <h1
                onMouseEnter={() => {
                  setHoverAbstract(true);
                }}
                onMouseLeave={() => {
                  setHoverAbstract(false);
                }}
                className={`absolute top-0 left-0 h-full w-full flex justify-center items-center text-8xl text-white font-bold font-mono opacity-0 hover:opacity-100 transition-opacity duration-500`}
              >
                PORSCHE
              </h1>
            </button>
          </div>
          <div className="h-1/2 w-full sm:w-1/2 rounded-xl overflow-hidden">
            <button
              className="h-full w-full relative"
              onClick={() => {
                setIsCar(true);
                setShow(true);
              }}
            >
              <img
                className={`h-full w-full object-cover transition-all duration-500 ${
                  hoverCar && "scale-110 opacity-40"
                }`}
                src="/car/frame_0001.jpeg"
                alt="Car"
              />
              <h1
                onMouseEnter={() => {
                  setHoverCar(true);
                }}
                onMouseLeave={() => {
                  setHoverCar(false);
                }}
                className={`absolute top-0 left-0 h-full w-full flex justify-center items-center text-8xl text-white font-bold font-mono opacity-0 hover:opacity-100 transition-opacity duration-500`}
              >
                BMW
              </h1>
            </button>
          </div>
        </div>
      )}
      {show && (
        <div className="h-[1000vh] parent w-full relative">
          <div className="h-screen w-full sticky top-0 left-0">
            <CanvasImageScroller isCar={isCar} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

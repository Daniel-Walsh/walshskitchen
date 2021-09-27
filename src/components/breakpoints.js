import { useEffect, useState } from "react";

const { screens } = require("tailwindcss/defaultTheme");
const breakpoints = { xs: "0px", ...screens };

const Breakpoints = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState();
  const [viewportWidth, setViewportWidth] = useState();
  const [isLocaldev, setIsLocaldev] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "localhost") {
      setIsLocaldev(true);
    }

    function getScreenSize() {
      setViewportWidth(window.innerWidth);
    }

    ["load", "resize"].forEach((eventType) => {
      addEventListener(eventType, getScreenSize);
    });

    return () => {
      ["load", "resize"].forEach((eventType) => {
        removeEventListener(eventType, getScreenSize);
      });
    };
  }, []);

  useEffect(() => {
    Object.keys(breakpoints).forEach((screen) => {
      const size = +breakpoints[screen].replace("px", "");
      if (viewportWidth >= size) {
        setCurrentBreakpoint(screen);
      }
    });
  }, [viewportWidth]);

  return (
    <>
      {isLocaldev && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bg-black text-white opacity-50 z-10 text-center px-2 pb-1 rounded-b-xl">
          <div className="font-semibold font-mono">{currentBreakpoint}</div>
          <div className="text-xs">&gt;={breakpoints[currentBreakpoint]}</div>
        </div>
      )}
    </>
  );
};

export default Breakpoints;

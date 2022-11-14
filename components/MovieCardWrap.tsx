import React, { useState } from "react";
import { Fade } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
}

const MovieCardWrap = ({ children, title }: Props) => {
  const [showShadow, setShowShadow] = useState(true);
  const handleScroll = (e: any) => {
    if (e.target.scrollLeft > 40) {
      setShowShadow(false);
    } else {
      setShowShadow(true);
    }
  };
  return (
    <section className="main-container mx-auto relative">
      <Fade in={showShadow} timeout={800}>
        <div
          className="absolute z-20 top-0 h-full bg-black right-0 w-[7rem]"
          style={{
            background:
              "linear-gradient(to right, transparent,transparent,  #fff)",
          }}
        ></div>
      </Fade>
      <div
        onScroll={handleScroll}
        className="mt-5 overflow-x-scroll style-scroll w-full"
      >
        <h1 className="font-semibold px-10 mb-3 text-2xl">{title}</h1>
        <div className="flex">{children}</div>
      </div>
    </section>
  );
};

export default MovieCardWrap;

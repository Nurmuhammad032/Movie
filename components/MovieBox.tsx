import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsThreeDots, BsFillBookmarkFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";

import {
  Rating,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Fade,
} from "@mui/material";

interface Props {
  name: string;
  date: string;
  imgUrl: string;
  rate: number;
}

const style = {
  position: "absolute",
  top: "2.5rem",
  left: "2rem",
  padding: "0.5rem 0",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "7px",
  zIndex: 100,
  maxWidth: 400,
  width: "100%",
};

const listItemStyle = {
  flex: "0 auto",
  marginLeft: "0.5rem",
  color: "rgba(0,0,0,0.6)",
};

const MovieBox = ({ name, date, imgUrl, rate }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const dateRelease = new Date(date).toString().slice(4, 10);
  const year = new Date(date).getFullYear();


  return (
    <div className="min-w-[150px] max-w-[150px] w-full relative">
      <div className="relative w-full min-h-[225px] rounded-lg h-full">
        {openModal && (
          <div className="backDrop" onClick={() => setOpenModal(false)}></div>
        )}
        <Fade in={openModal}>
          <Box sx={style}>
            <ListItem button sx={{ justifyContent: "center" }}>
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                }}
              >
                <IoMdHeart className="text-lg" />
              </ListItemIcon>
              <ListItemText sx={listItemStyle}>
                <span className="text-sm font-semibold">Favorite</span>
              </ListItemText>
            </ListItem>
            <ListItem button sx={{ justifyContent: "center" }}>
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                }}
              >
                <BsFillBookmarkFill className="text-sm" />
              </ListItemIcon>
              <ListItemText sx={listItemStyle}>
                <span className="text-sm font-semibold">Watchlist</span>
              </ListItemText>
            </ListItem>
          </Box>
        </Fade>
        <div
          onClick={() => setOpenModal(true)}
          className="z-20 cursor-pointer hover:!bg-[#00b7ea] rounded-full absolute right-2 top-2 p-1"
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <BsThreeDots className="text-lg text-[#212121]" />
        </div>
        <Link
          href={"/"}
          className="w-full h-full absolute left-0 right-0 top-0"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
            className=" w-full h-full object-cover rounded-lg"
            alt="tv"
          />
        </Link>
      </div>
      <div className="mt-3">
        <Tooltip title={rate}>
          <div>
            <Rating readOnly name="read-only" value={rate / 2} /> <br />
          </div>
        </Tooltip>
        <Link
          href={"/"}
          className="font-semibold hover:text-[#01b4e4] text-[16px] p-0"
        >
          {name}
        </Link>
        <p className="text-[16px] text-[rgba(0,0,0,0.6)] p-0">
          {dateRelease + ", " + year}
        </p>
      </div>
    </div>
  );
};

export default MovieBox;

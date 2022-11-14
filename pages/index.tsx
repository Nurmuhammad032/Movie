import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import favorite, { markAsFavorite } from "../app/slices/favorite";
import { Movie } from "..";
import { setQueryFunc } from "../app/slices/search";
import { MovieBox, MovieCardWrap } from "../components";
import requests from "../constants/requests";
import { RootState } from "../rootReducer";
import { select } from "../app/slices/favorite";
import setFavorite from "../constants/favorite";
{
  /* <canvas height="120" width="120" style="height: 60px; width: 60px;"></canvas> */
}
interface Props {
  onTv: Movie[];
}

const bg = "/images/bg.jpg";

const index = ({ onTv }: Props) => {
  console.log(onTv);
  
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const {favorite} = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const { searchQuery } = useSelector((state: RootState) => state.search);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setFavorite()
  }, []);

  console.log(favorite);
  useEffect(() => {
    console.log(favorite);
    
  }, [favorite])

  useEffect(() => {
    setQuery(inputValue);
  }, [inputValue]);
  // pageXOffset
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQueryFunc(query));
    setInputValue("");
  };

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <>
      <section className="bg-white">
        <div
          className="main-container flex items-center mx-auto relative min-h-[300px] mt-16 w-full"
          style={{
            background: `linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="px-10 py-8 text-white w-full">
            <div>
              <h1 className="text-5xl font-semibold">Welcome.</h1>
              <p className=" text-[30px] font-semibold">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </p>
            </div>
            <div className="mt-9">
              <form className="relative w-full" onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  value={inputValue}
                  type="text"
                  placeholder="Search for a movie, tv show, person......"
                  className="px-5 py-3 rounded-full outline-none w-full h-[46px] placeholder:text-[#757575] text-[#757575]"
                />
                <button
                  type="submit"
                  className="absolute right-0 h-full rounded-full px-7 hover:text-black text-lg font-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%)",
                  }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="main-container mx-auto relative">
        <MovieCardWrap title={"What is On tv"}>
          {onTv?.map((tv) => (
            <div className="ml-10" key={tv.id}>
              <MovieBox
                name={tv.name}
                date={tv.first_air_date}
                imgUrl={tv.backdrop_path}
                rate={tv.vote_average}
              />
            </div>
          ))}
        </MovieCardWrap>
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const [onTv] = await Promise.all([
    fetch(requests.fetchTv).then((res) => res.json()),
  ]);

  return {
    props: {
      onTv: onTv.results,
    },
  };
};

export default index;

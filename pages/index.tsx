import React, { ReactHTMLElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setQueryFunc } from "../app/slices/search";
import { RootState } from "../rootReducer";

const bg = "/images/bg.jpg";

const index = ({ data }) => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.search);
  console.log(searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQueryFunc(query));
  };

  return (
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
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </div>
          <div className="mt-9">
            <form className="relative w-full" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
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
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=918ac020185cb84503489642e0a33bbe&language=en-US&query=will&page=1&include_adult=false"
  );
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};

export default index;

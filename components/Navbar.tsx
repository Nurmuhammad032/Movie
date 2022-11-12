import Link from "next/link";
import { useRouter } from "next/router";
import { movies, people, tvShows } from "../constants/link";
import type { Links } from "../constants/link";
import { getToken, createSessiodId, api } from "../app/auth/index";
import { setUser } from "../app/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

interface AppProps {
  links: Links[];
}

const DropDownLink = ({ links }: AppProps) => {
  return (
    <div className="group-hover:flex flex-col items-stretch nav_li-hidden">
      {links.map(({ text, value }: Links, i) => (
        <Link href={`/${value}`} key={i} className="nav_li-link">
          {text}
        </Link>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const {
    avatar: {
      tmdb: { avatar_path },
    },
  } = user;

  let token: string | null = "";

  // Next.js performs a server render before the client render, that's why localstorage could be is not defined
  useEffect(() => {
    token = localStorage.getItem("request_token");
  }, []);

  useEffect(() => {
    const login = async () => {
      if (token && typeof window !== "undefined") {
        let sessionId: string | null = localStorage.getItem("session_id");

        if (sessionId) {
          const { data: userData } = await api.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessiodId();
          const { data: userData } = await api.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    login();
  }, [token]);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
    router.push("/");
  };

  return (
    <nav className="w-full z-50 bg-darkBlue fixed top-0 left-0 right-0 h-16 flex items-center justify-center">
      <div className="main-container px-8 flex items-center text-white justify-between">
        <div className="flex space-x-5 items-center">
          <div>
            <Link href={"/"}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="logo"
                className="w-[159px] object-cotain"
              />
            </Link>
          </div>
          <ul className="flex space-x-5 items-center">
            <li className="nav_li group">
              Movies
              <DropDownLink links={movies} />
            </li>
            <li className="nav_li group">
              TV Shows
              <DropDownLink links={tvShows} />
            </li>
            <li className="nav_li group">
              People
              <DropDownLink links={people} />
            </li>
          </ul>
        </div>
        <div className="flex">
          {!isAuthenticated ? (
            <button className="cursor-pointer" onClick={getToken}>
              Login
            </button>
          ) : (
            <button
              className="relative"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              <div>
                <img
                  src={`${
                    avatar_path !== null
                      ? `https://www.themoviedb.org/t/p/w64_and_h64_face${avatar_path}`
                      : "/images/userphoto.jpg"
                  }`}
                  alt="user"
                  className="rounded-full h-10 w-10"
                />
              </div>
              {openModal && (
                <ul className="bg-white absolute border-[1px] rounded py-2 right-0 top-14">
                  <li className="text-black nav_li-link">Profile</li>
                  <li className="text-black nav_li-link" onClick={logOut}>
                    Log Out
                  </li>
                </ul>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

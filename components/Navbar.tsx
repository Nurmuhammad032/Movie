import Link from "next/link";
import { movies, people, tvShows } from "../constants/link";
import type { Links } from "../constants/link";
import { getToken, createSessiodId, api } from "../app/auth/index";
import { setUser } from "../app/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

interface AppProps {
  links: Links[];
}

const DropDownLink = ({ links }: AppProps) => {
  return (
    <div className="group-hover:flex flex-col items-stretch nav_li-hidden">
      {links.map(({ text, value }: Links, i) => (
        <Link
          href={`/${value}`}
          key={i}
          className="nav_li-link whitespace-nowrap"
        >
          {text}
        </Link>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  let token: string | null = "";
  let sessionId: string | null;

  const isServer = typeof window === "undefined";

  useEffect(() => {
    token = localStorage.getItem("request_token");
    sessionId = localStorage.getItem("session_id");
  }, []);

  useEffect(() => {
    const login = async () => {
      if (token) {
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

  console.log(isAuthenticated);
  

  return (
    <nav className="w-full bg-darkBlue h-16 flex items-center justify-center">
      <div className="main-container flex items-center text-white justify-between">
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
        <div>
          <p className="cursor-pointer" onClick={getToken}>
            Login
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

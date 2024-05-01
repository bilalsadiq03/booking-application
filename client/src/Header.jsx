import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <header className="flex justify-between items-center ">
        <div>
          <Link to={'/'} className="logo">
            <span className="font-bold text-xl">SHE SHARE</span>
          </Link>
        </div>

        <div>
          <Link
            to={user ? '/account' : "/login"}
            className="flex items-center gap-3 border border-gray-300 rounded-full text-md p-2"
          >
            {/* <RxHamburgerMenu /> */}
            <IoPersonCircleSharp  />
            {
              !!user && (
                <div>{user.name}</div>
                )
            }
          </Link>
        </div>
      </header>
    </div>
  );
}

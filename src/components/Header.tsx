import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate()
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Links = [
    { path: "/", title: "Home" },
    { path: "/ingredients", title: "Ingredients" },
    { path: "/categories", title: "Categories" },
    { path: "/area", title: "Area" },
  ]

  return (
    <header className={`header  ${isScrolled && "move"}`}>
      <h2
        className={`first-letter:text-7xl  align-text-top  font-bold first-letter:text-sky-800 cursor-pointer select-none`}
        onClick={() => navigate("/")}
      >
        B
        <span className="text-3xl text-white relative -left-4 -top-4">
          Chief
        </span>
      </h2>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
        <CiMenuFries className={`${isMenuOpen ? "rotate-90" : "rotate-0"} transition-all duration-300 `} size={"2rem"} fill="white" fontWeight={900} />
      </button>

      <nav className={`flex justify-center items-center gap-5 text-capitalize font-bold md:flex-row flex-col md:static transition-all duration-500 fixed 
      inset-0 top-20 ${isMenuOpen ? "h-44" : "h-0"} md:h-auto overflow-hidden bg-gray-400 md:bg-transparent shadow-2xl md:shadow-none`}>
        {
          Links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={` text-base text-white px-5 py-px rounded-xl`}
            >
              {link.title}
            </NavLink>
          ))
        }
      </nav>
    </header>
  );
}

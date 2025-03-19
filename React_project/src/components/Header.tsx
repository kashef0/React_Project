import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const username = localStorage.getItem("username");
  const userEmail = localStorage.getItem('Email');
  useSelector((state: RootState) => state.auth);
  // stänga profil menu när klicka ut navmenu
  useEffect(() => {
    const closeProfileMenu = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#profile-menu")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("click", closeProfileMenu);
    return () => document.removeEventListener("click", closeProfileMenu);
  }, []);

  return (
    <nav className="bg-gray-800 max-w-[1200px] mx-auto">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* huvud navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  to="/"
                >
                  Hem
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  to={"/AboutProjectPage"}
                >
                  Om Projekt
                </NavLink>
              </div>
            </div>
          </div>

          {/* datum */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
              <p>{isAuthenticated && userEmail}</p>
            </div>

            {/* Profil Dropdown menu */}
            <div className="relative ml-3">
              <button
                id="profile-menu"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                type="button"
                className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
              >
                <p className="size-8 rounded-full bg-slate-200 content-center hover:bg-white font-bold">
                  {isAuthenticated
                    ? username?.substring(0, 2).toLocaleUpperCase()
                    : "?"}
                </p>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                  <NavLink
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                    to="/profile"
                  >
                    profil
                  </NavLink>
                  <NavLink
                    to={isAuthenticated ? "" : "/login"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    <LogoutButton />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
          <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  to="/"
                >
                  Hem
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  to={"/AboutProjectPage"}
                >
                  Om Projekt
                </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

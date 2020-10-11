import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <p
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            >
              <Link to="/">My Movie List</Link>
            </p>
          </div>

        </div>
      </nav>
    </>
  );
}

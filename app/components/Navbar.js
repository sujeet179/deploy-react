"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faHouse,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  const home = () => {
    router.push("/dashboard");
  };
  return (
    <div className=" fixed top-0 w-full  z-20">
      <div className="flex items-center h-16 bg-indigo-700 text-black pr-4 md:pr-14 justify-end font-sans">
        <div className="fixed top-0 left-0 flex items-center space-x-3 p-4">
          <img src="/round.png" className="h-8" alt="" />
          <span className="self-center font-semibold whitespace-nowrap text-white md:text-2xl sm:text-base">
            AB Software
          </span>
        </div>
        <div className="md:hidden cursor-pointer mr-4" onClick={handleToggle}>
          <svg viewBox="0 0 10 8" width="30">
            <path
              d="M1 1h8M1 4h 8M1 7h8"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {isMobile && (
          <div className="absolute top-16 left-0 right-0 bg-gray-200 text-black  flex flex-col z-50">
            {/* Menu Dropdown */}
            <div className="relative group inline-block mt-3">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-black">
                <span className="pr-1 font-semibold flex-0">Bill Setting</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-slate-50 border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top-left min-w-32 z-30">
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Organisation Details
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Greeting Master
                </li>
              </ul>
            </div>

            {/* Bill Setting Dropdown */}
            <div className="relative group inline-block mt-3">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center text-black">
                <span className="pr-1 font-semibold flex-0">Menu</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-slate-50 border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top-left min-w-32 z-30">
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Menu List
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Sub-menu List
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Group List
                </li>
              </ul>
            </div>

            <div className="relative group inline-block mt-3">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center text-black">
                <span className="pr-1 font-semibold flex-0">Table</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-slate-50 border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top-left  z-30">
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Sections
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Table List
                </li>
              </ul>
            </div>

            <div className="relative group inline-block mt-3">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-black">
                <span className="pr-1 font-semibold flex-0">Billing</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-slate-50 border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top-left  z-30">
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Bill
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                  Order
                </li>
              </ul>
            </div>
          </div>
        )}{" "}
        <div className="hidden md:block  ">
          <div className="flex items-center h-16 bg-indigo-700 text-black pr-14 md:pr-14 justify-end font-sans">
            <div className="relative group inline-block">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center min-w-32 text-white">
                <span className="pr-1 font-semibold flex-1">Configuration</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                <Link href="/reports">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Table Reports</span>
                  </button>
                  </Link>
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                <Link href="/paymentReports">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Payment Reports</span>
                  </button>
                  </Link>
                </li>
                <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                <Link href="/hotel">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Organisation Details</span>
                  </button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative group inline-block   ">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-white">
                <span className="pr-1 font-semibold flex-1 ">Menu</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-white border w-40 rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                <li className="rounded-md px-3 py-1 hover:bg-gray-100">
                <Link href="/main">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Menu List</span>
                  </button>
                  </Link>
                </li>
                <li className="rounded-md relative px-3 py-1 hover:bg-gray-100">
                <Link href="/menu">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Sub-menu List</span>
                  </button>
                  </Link>
                </li>
                <li className="rounded-md relative px-3 py-1 hover:bg-gray-100">
                <Link href="/group">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Group Menu</span>
                  </button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative group inline-block   ">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-white">
                <span className="pr-1 font-semibold flex-1 ">Table</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>

              <ul className="bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                <li className="rounded-md px-3 py-1 hover:bg-gray-100">
                <Link href="/section">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                  <span className="pr-1 flex-1">Sections</span>
                  </button>
                </Link>
                </li>
                <li className="rounded-md relative px-3 py-1 hover:bg-gray-100 w-40">
                 <Link href="/tables">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                  <span className="pr-1 flex-1">Tables</span>
                  </button>
                </Link>
                
                </li>
              </ul>
            </div>

            <div className="relative group inline-block   ">
            <Link href="/bill">
              <button className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-white">
                <span className="pr-1 font-semibold flex-1 ">Bill</span>
              </button>
              </Link>

              {/* <ul className="bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                <li className="rounded-md px-3 py-1 hover:bg-gray-100">
                <Link href="/bill">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Bill</span>
                  </button>
                  </Link>
                  </li> */}
                {/* <li className="rounded-md relative px-3 py-1 hover:bg-gray-100">
                <Link href="/order">
                  <button className="w-full text-left flex items-center outline-none focus:outline-none">
                    <span className="pr-1 flex-1">Order</span>
                  </button>
                  </Link>
                </li> */}
              {/* </ul> */}
            </div>
          </div>
        </div>
        <div className="">
          <FontAwesomeIcon
            icon={faHouse}
            onClick={home}
            className="cursor-pointer text-xl text-white"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar
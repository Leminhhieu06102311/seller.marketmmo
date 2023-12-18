"use client";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import TRUserManagerLoader from "./TRusers-managerLoader";

export default function UsersManagerLoader() {
  return (
    <div className="p-6 max-w-[1536px] w-full m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-lg ">
          {" "}
          <span className="bg-gray-200 text-gray-200 animate-pulse rounded-lg px-10 py-1"></span>
        </h1>
      </div>
      <div>
        <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
          <div className="flex items-center bg-gray-200 text-gray-200 animate-pulse border px-3 py-4 rounded-lg">
            <IoIosSearch className="text-lg mr-2 bg-gray-200 text-gray-200 animate-pulse flex-shrink-0" />
            <p
              className="bg-transparent focus:outline-none w-full px-20"
            ></p>
          </div>
          <p className="p-2 rounded-[50%] bg-gray-200 text-gray-200 animate-pulse">
            <IoFilterOutline />
          </p>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
                <th className="text-start text-sm p-4"><p className="bg-gray-200 text-gray-200 animate-pulse rounded-lg py-3"></p></th>
              </tr>
            </thead>
            <tbody>
              {" "}
              <TRUserManagerLoader />
            </tbody>
          </table>
        </div>
        <div className="rounded-b-xl overflow-hidden">
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <div className="text-sm bg-gray-200 text-gray-200 animate-pulse rounded-lg">
                  Hiển thị từ
                  <span className="font-medium mx-1">1</span>
                  đến
                  <span className="font-medium mx-1">3</span>
                  của
                  <span className="font-medium mx-1">00</span>
                  kết quả
                </div>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <p className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-gray-200 text-gray-200 animate-pulse">
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                  {/* previous button o tren */}
                  <p className="relative bg-gray-200 text-gray-200 animate-pulse z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    0
                  </p>
                  <p className="relative bg-gray-200 text-gray-200 animate-pulse z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    0
                  </p>
                  <p className="relative bg-gray-200 text-gray-200 animate-pulse z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    0
                  </p>
                  <p className="relative bg-gray-200 text-gray-200 animate-pulse z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    0
                  </p>
                  {/* next button */}
                  <p className="relative bg-gray-200 text-gray-200 animate-pulse inline-flex items-center rounded-r-md px-2 py-2">
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Calendar, Copy, Eye, PencilLine, Share2, Trash } from "lucide-react";
import { FormatDate } from "../utils/formatDate";


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Search Box */}
      <input
        className="text-black mt-5 w-[70%] border border-input rounded-md p-2 outline-blue-500"
        type="search"
        placeholder="Search Paste Here...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className=" flex flex-row items-start w-[70%] mt-5 text-2xl font-semibold border rounded-t-md p-1">
        <p className="px-2">All Pastes</p>
      </div>

      <div className="flex flex-col gap-5 w-[70%] border rounded-b-md p-3 ">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border flex flex-row justify-between px-3 rounded-md "
                key={paste?._id}
              >
                <div className="flex flex-col justify-center">
                  <div className="text-2xl font-semibold">{paste.title}</div>

                  <div className="text-sm mt-1 text-gray-500">
                    {paste.content}
                  </div>
                </div>

                {/* Button And Date */}
                <div className=" flex flex-col py-3 items-end">
                  <div className=" flex flex-row gap-2 ">
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        <PencilLine className="size-[25px] border p-1 hover:text-pink-500 hover:border-pink-500" />
                      </a>

                      {/* <NavLink to={`/pastes/${paste?._id}`}>
                      View
                    </NavLink> */}
                    </button>

                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                        <Eye className="size-[25px] border p-1 hover:text-pink-500 hover:border-pink-500" />
                      </a>

                      {/* <NavLink to={`/pastes/${paste?._id}`}>
                      View
                    </NavLink> */}
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      <Trash className="size-[25px] border p-1 hover:text-pink-500 hover:border-pink-500" />
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copy to Clipboard");
                      }}
                    >
                      <Copy
                        className="size-[25px] border p-1 hover:text-pink-500 hover:border-pink-500"
                        size={20}
                      />
                    </button>

                  </div>

                  <div className="gap-x-2 flex flex-row justify-center items-center mt-1">
                    <Calendar className="text-black" size={15} />
                    {FormatDate(paste?.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;

import React from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((paste) => paste._id === id)[0];

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      {/* Search Area */}
      <div className="w-full h-full flex justify-center">
        <input
          className="text-black mt-5 w-[70%] border border-input rounded-md p-2"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-5 h-9 w-[70%] border rounded-t-md flex flex-row px-2">
        <div className="w-full flex gap-x-[6px] items-center select-none group">
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

          <div
            className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
          />

          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
        </div>

        <button
          className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to Clipboard");
          }}
        >
          <Copy className="group-hover:text-sucess-500" size={20} />
        </button>
      </div>

      {/* Text Area */}
      <div className="w-full flex justify-center">
        <textarea
          className="text-black w-[70%] border rounded-b-md p-2"
          value={paste.content}
          disabled
          placeholder="enter content here"
          rows={15}
        />
      </div>
    </div>
  );
};

export default ViewPaste;

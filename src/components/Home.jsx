import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";
import { CircleFadingPlus, Copy } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-5">
      {/* Title Field */}
      <div className="w-[70%] flex flex-row justify-center items-center">
        <div className="w-full flex flex-row items-start">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black border border-input rounded-md p-2 outline-blue-500"
          />
        </div>

        <div className="h-full w-[22%] flex flex0row justify-end items-end gap-2">
          {/* Button */}
          <button
            onClick={createPaste}
            className="bg-blue-500 hover:bg-blue-700 text-white text-center text-sm rounded h-10 px-5 text-  "
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
          {pasteId && (
            <button onClick={resetPaste}>
              <CircleFadingPlus className="border rounded-md bg-blue-500 hover:bg-blue-700 text-white w-10 h-10 p-2 " />
            </button>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div className="mt-5 h-9 w-[70%] border rounded-t-md flex flex-row px-2">
        <div className="w-full flex gap-x-[6px] items-center select-none group">
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

          <div
            className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
          />

          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copied to Clipboard", {
              position: "top-right",
            });
          }}
        >
          <Copy className="group-hover:text-sucess-500" size={20} />
        </button>
      </div>

      <div className="w-[70%] flex flex-row justify-center items-center">
        <textarea
          value={value}
          placeholder="Write Your Content Here...."
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full p-3 text-black border border-input rounded-b-md outline-blue-500"
          style={{
            caretColor: "#000",
          }}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;

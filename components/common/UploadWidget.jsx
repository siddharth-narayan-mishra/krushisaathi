"use client";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadWidget = ({ text, onUploadSuccess }) => {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result) => {
        onUploadSuccess(result.info);
      }}
      onQueuesEnd={(result, { widget }) => {
        console.log("All files uploaded", result);
        console.log("Widget instance", widget);
      }}
      onClose={() => {
        console.log("Widget closed");
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <button
            type="button"
            onClick={handleOnClick}
            className="bg-green-700 cursor-pointer text-sm rounded-sm px-2 py-1 text-white hover:bg-green-800 transition duration-200 ease-in-out"
          >
            {text}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;

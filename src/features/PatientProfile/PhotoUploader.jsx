import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useRef, useState } from "react";

const PhotoUploader = () => {
  const { control } = useFormContext(); // Access the form context

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative h-[210px] w-[210px] shrink-0 rounded-2xl bg-[url('/uploader.svg')] bg-center bg-no-repeat">
      <div
        onClick={handleDivClick}
        className="font-poppins flex h-full w-full flex-col items-center justify-center gap-[8px] text-[14px] text-black"
      >
        <img
          alt="Photo Frame"
          className={
            previewUrl
              ? `z-30 h-[210px] w-[210px] rounded-2xl object-cover`
              : ""
          }
          src={previewUrl ? previewUrl : "/photo-frame.svg"}
        />

        {/* Hidden input file selector */}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {/* Use Controller to integrate with react-hook-form */}
      <Controller
        name="photo" // Specify the field name
        control={control} // Control object from useFormContext
        defaultValue={null} // Initial value
        render={({ field }) => (
          <input
            {...field}
            type="hidden" // Hide the input to avoid rendering a visible input
          />
        )}
      />
    </div>
  );
};

export default PhotoUploader;

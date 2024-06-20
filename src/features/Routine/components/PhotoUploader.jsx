import { useRef, useState } from "react";

const PhotoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  console.log(fileInputRef);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
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
      {previewUrl && (
        <span
          onClick={() => {
            setPreviewUrl(null);
            setSelectedFile(null);
          }}
          className="absolute right-0.5 top-0.5 z-50 block h-6 w-6 -translate-y-1/2 translate-x-1/2 transform bg-[url('/red-cross.svg')]"
        />
      )}
      <div
        onClick={handleDivClick}
        className="flex h-full w-full flex-col items-center justify-center gap-[8px] text-[14px] text-black"
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

        {!previewUrl && <div>Upload Image</div>}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PhotoUploader;

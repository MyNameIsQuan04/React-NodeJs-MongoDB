import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  initialImage: string;
  onImageChange: (newImage: string) => void;
}

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImage,
  onImageChange,
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const [onlineImage, setOnlineImage] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"keep" | "online" | "local">(
    "keep"
  );

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImage(data.secure_url);
    onImageChange(data.secure_url);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleOnlineImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setOnlineImage(url);
    setImage(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadMethod"
            value="keep"
            checked={uploadMethod === "keep"}
            onChange={() => setUploadMethod("keep")}
            className="form-radio"
          />
          <span>Giữ nguyên ảnh cũ</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadMethod"
            value="online"
            checked={uploadMethod === "online"}
            onChange={() => setUploadMethod("online")}
            className="form-radio"
          />
          <span>Sử dụng link ảnh online</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadMethod"
            value="local"
            checked={uploadMethod === "local"}
            onChange={() => setUploadMethod("local")}
            className="form-radio"
          />
          <span>Upload ảnh từ local</span>
        </label>
      </div>

      {uploadMethod === "online" && (
        <input
          type="text"
          placeholder="Link ảnh online"
          value={onlineImage}
          onChange={handleOnlineImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      )}

      {uploadMethod === "local" && (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Kéo và thả file tại đây, hoặc nhấp để chọn file
          </p>
        </div>
      )}

      {image && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Ảnh đã chọn:</p>
          <img
            src={image}
            alt="Selected"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

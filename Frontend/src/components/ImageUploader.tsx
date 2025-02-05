import React, { useState } from "react";

type ImageUploaderProps = {
  onImageUpload: (image: File | null) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
      setError("");
      onImageUpload(file);
    } else {
      setError("Por favor, selecciona un archivo JPG.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
      setError("");
      onImageUpload(file);
    } else {
      setError("Por favor, selecciona un archivo JPG.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUpload(null);
  };

  return (
    <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg relative">
      <div
        className="flex justify-center items-center h-40 border-2 border-dashed border-gray-300 bg-gray-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Imagen cargada"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-center text-gray-500">
            Arrastra y suelta o selecciona una imagen JPG
          </p>
        )}
      </div>
      <label
        htmlFor="file_upload"
        className="mt-4 inline-block cursor-pointer py-2 px-4 text-white rounded-lg hover:bg-gray-700 bg-gray-500 duration-300"
      >
        Seleccionar Imagen
      </label>
      <input
        id="file_upload"
        type="file"
        accept="image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />
      {image && (
        <span
          className="absolute flex items-start justify-center top-1 right-1 text-2xl border-1 rounded-full border-gray-400 w-10 h-10 bg-white hover:cursor-pointer hover:bg-gray-100"
          onClick={handleRemoveImage}
        >
          &times;
        </span>
      )}
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default ImageUploader;

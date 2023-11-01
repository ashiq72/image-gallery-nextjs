"use client";

import ImageGallery from "./components/ImageGallery";

import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const fileInputRef = useRef(null);
  function selectFiles() {
    fileInputRef.current.click();
  }
  function handleImage(e) {
    setImages(e.target.files[0]);
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  const handleCheckboxChange = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(
        selectedImages.filter((selectedId) => selectedId !== index)
      );
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };
  function handleDelete() {
    const updatedImages = images.filter((_, i) => !selectedImages.includes(i));
    setImages(updatedImages);
    setSelectedImages([]);
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("text/plain");
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <div>
      <div className="flex justify-between border-b-2 py-4 px-8">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedImages.length > 0}
            id="vehicle1"
            name="vehicle1"
            value="Bike"
          />
          <h1 className="text-lg font-semibold">
            {selectedImages.length} Files Selected
          </h1>
        </div>

        <div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md mt-2"
            disabled={selectedImages.length === 0}
          >
            Delete Selected
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {images?.map((image, index) => (
          <div
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`${
              index === 0 ? "row-span-2 col-span-2" : "row-auto "
            } col-span-1 relative border-2 border-gray-100 rounded-md`}
          >
            <input
              type="checkbox"
              className="absolute top-2 left-2"
              checked={selectedImages.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <Image
              src={image.url}
              alt={index}
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        ))}
        <div
          onClick={() => handleImage}
          className={`${
            images?.length <= 0
              ? "row-span-2 col-span-2 w-full h-full p-[100%] "
              : "row-auto col-auto "
          }col-span-1 row-span-1 bg-slate-300 flex items-center justify-center border-dotted border-2 rounded-md border-gray-500 min-content relative p-[43%] `}
        >
          <span className="text-blue-600" role="button" onClick={selectFiles}>
            {" "}
            Add image
          </span>
          <input
            name="file"
            type="file"
            className="hidden "
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          ></input>
        </div>
      </div>
    </div>
  );
}

// const Home = () => {
//   const images = [
//     { id: "1", url: "/image-1.webp", isFeature: false },
//     { id: "2", url: "/image-2.webp", isFeature: true },
//     { id: "3", url: "/image-3.webp", isFeature: false },
//     { id: "4", url: "/image-4.webp", isFeature: false },
//     { id: "5", url: "/image-5.webp", isFeature: false },
//     { id: "6", url: "/image-6.webp", isFeature: false },
//   ];

//   return (
//     <div className="App">
//       <h1>Image Gallery</h1>
//       <div className="grid grid-cols-5 gap-4 p-4">
//         <ImageGallery images={images} />
//       </div>
//     </div>
//   );
// };

// export default Home;

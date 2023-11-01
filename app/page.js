"use client";
import Image from "next/image";
import ImageCard from "./components/ImageCard";
import { useRef, useState } from "react";
import Link from "next/link";

// async function getData() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/photos");
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function Home() {
  const [images, setImages] = useState([]);
  console.log(images);
  const fileInputRef = useRef(null);
  function selectFiles() {
    fileInputRef.current.click();
  }
  function handleImage(e) {
    setImages(e.target.files[0]);
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log(index);
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

  // const data = await getData();
  // console.log(data);

  return (
    <div>
      <div className="flex justify-between border-b-2 py-4 px-8">
        <div className="flex gap-2">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <h1 className="text-lg font-semibold">3 Files Selected</h1>
        </div>

        <div>
          <button className="text-red-700">Delete files</button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "row-span-2 col-span-2" : "row-auto"
            } col-span-1 relative`}
          >
            <span
              onClick={() => deleteImage(index)}
              className="z-50 absolute right-2 text-red-600 text-2xl cursor-pointer"
            >
              &times;
            </span>
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
            images?.length <= 0 ? "row-span-2 col-span-2 " : "row-auto "
          }  flex items-center justify-center border-dotted border-2 rounded-md border-gray-500 h-44`}
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

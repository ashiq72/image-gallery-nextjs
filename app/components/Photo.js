"use client";
import Image from "next/image";
import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      ...style,
    };
    const { selectedImages, setSelectedImages } = props;
    console.log(selectedImages);
    const handleCheckboxChange = (index) => {
      // console.log("handleC", index);
      if (selectedImages.includes(index)) {
        setSelectedImages(
          selectedImages.filter((selectedId) => selectedId !== index)
        );
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    };

    return (
      <>
        <div
          ref={ref}
          style={inlineStyles}
          {...props}
          className="image-container"
        >
          <input
            type="checkbox"
            checked={selectedImages?.includes(index)}
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the default checkbox behavior

              handleCheckboxChange(index);
            }}
            className="absolute m-2"
          />
          <Image
            src={url}
            alt={index}
            width={200}
            height={200}
            className="image w-full h-full border-2 border-gray-300 rounded-lg"
          />
        </div>
      </>
    );
  }
);

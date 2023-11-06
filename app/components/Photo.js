"use client";
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
      backgroundImage: `url("${url}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
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
          className="border-2 border-gray-300 rounded-lg relative z-10 "
        >
          <input
            type="checkbox"
            checked={selectedImages?.includes(index)}
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the default checkbox behavior

              handleCheckboxChange(index);
            }}
            className="m-2"
          />
          {/* <div
            className={` absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity`}
          ></div> */}
        </div>
      </>
    );
  }
);

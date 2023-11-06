"use client";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

// eslint-disable-next-line react/display-name
export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const [checkboxShow, setCheckboxShow] = useState(false);

    // Style for image card
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      border: "3px solid #e0e0e0",
      borderRadius: "10px",
      ...style,
    };

    // props destructuring
    const { selectedImages, setSelectedImages, activeId } = props;

    //Handle-checkbox function for selecting images
    const handleCheckboxChange = (index) => {
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
          onMouseOver={() => setCheckboxShow(true)}
          onMouseLeave={() => setCheckboxShow(false)}
        >
          {selectedImages?.includes(index) || checkboxShow ? (
            <input
              type="checkbox"
              checked={selectedImages?.includes(index)}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent the default checkbox behavior
                handleCheckboxChange(index);
              }}
              className="absolute m-2"
            />
          ) : null}
          <Image
            src={url}
            alt={index}
            width={200}
            height={200}
            style={{ opacity: url === activeId ? 0 : 1 }}
            className="image w-full h-full rounded-lg"
          />
        </div>
      </>
    );
  }
);

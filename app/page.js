"use client";
import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { Grid } from "./components/Grid";
import { SortablePhoto } from "./components/SortablePhoto";
import { Photo } from "./components/Photo";

const Home = () => {
  const [items, setItems] = useState([
    "https://i.postimg.cc/tTn9s24Q/image-1.webp",
    "https://i.postimg.cc/brQ8Trnm/image-2.webp",
    "https://i.postimg.cc/nV7HZRWq/image-3.webp",
    "https://i.postimg.cc/FsVNkfNR/image-4.webp",
    "https://i.postimg.cc/28DC5dpM/image-5.webp",
    "https://i.postimg.cc/qvB0skvG/image-6.webp",
    "https://i.postimg.cc/x1sQgWkV/image-7.webp",
    "https://i.postimg.cc/FK84X3gP/image-8.webp",
    "https://i.postimg.cc/vmcsK39g/image-9.webp",
    "https://i.postimg.cc/76zyHhKq/image-10.jpg",
    "https://i.postimg.cc/nrtfCxWB/image-11.jpg",
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor));

  // Handle-delete function for the selected image
  function handleDelete() {
    const updatedImages = items.filter((_, i) => !selectedImages.includes(i));
    setItems(updatedImages);
    setSelectedImages([]);
  }

  // Handle-dragStart function by dnd-kit/sortable package
  function handleDragStart(event) {
    setActiveId(event.active?.id);
  }
  // Handle-dragEnd function by dnd-kit/sortable package
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
  return (
    <div className="2xl:mx-96 mx-2 my-4 lg:p-4 p-1 bg-slate-100 shadow-lg rounded">
      <div className="flex justify-between border-b-2 py-4 px-4">
        <div className="flex items-center gap-2">
          {selectedImages.length > 0 ? (
            <>
              <input
                type="checkbox"
                checked={selectedImages.length > 0}
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <h1 className="text-xl font-semibold">
                {selectedImages.length}
                <span> Files Selected</span>
              </h1>
            </>
          ) : (
            <>
              <span className="text-2xl font-semibold">Gallery</span>
            </>
          )}
        </div>

        <div>
          {selectedImages.length > 0 ? (
            <>
              <button
                onClick={handleDelete}
                className="text-xl font-semibold hover:underline hover:underline-offset-2 duration-300 text-red-500 "
                disabled={selectedImages.length === 0}
              >
                Delete files
              </button>
            </>
          ) : null}
        </div>
      </div>
      {/* image card item  */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 pt-6">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items}>
            {items.map((url, index) => (
              <SortablePhoto
                key={url}
                url={url}
                index={index}
                activeId={activeId}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            ))}
          </SortableContext>

          <DragOverlay adjustScale={true}>
            {activeId ? (
              <Photo url={activeId} index={items.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
        {/* Add Image section */}
        <div
          // onClick={() => handleImage}
          className={`${
            items?.length <= 0
              ? "row-span-2 col-span-2 w-full h-full p-[100%] "
              : "row-auto col-auto "
          }col-span-1 row-span-1 bg-slate-300 flex items-center justify-center border-dotted border-[3px]  rounded-md border-gray-400 min-content relative xl:py-[30%] lg:py-[30%] md:py-[25%] py-[20%] `}
        >
          <span
            className="text-blue-600"
            role="button"
            //  onClick={selectFiles}
          >
            Add image
          </span>
          <input
            name="file"
            type="file"
            className="hidden "
            multiple
            // ref={fileInputRef}
            // onChange={onFileSelect}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Home;

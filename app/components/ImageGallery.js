import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash, FaStar } from "react-icons/fa";

const ImageGallery = ({ images }) => {
  const [imageList, setImageList] = useState(images);
  console.log(imageList);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log("selectedImages", selectedImages);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(imageList);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImageList(reorderedImages);
  };

  const handleDelete = () => {
    const updatedImages = imageList.filter(
      (_, i) => !selectedImages.includes(i)
    );
    setImageList(updatedImages);
    setSelectedImages([]);
  };

  //   const handleSetFeatureImage = (index) => {
  //     const updatedImages = imageList.map((image, i) => ({
  //       ...image,
  //       isFeature: i === index,
  //     }));
  //     setImageList(updatedImages);
  //   };

  const toggleImageSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(
        selectedImages.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  return (
    <div>
      <div className="image-actions">
        <button> {selectedImages.length} Image Selected</button>
        <button onClick={handleDelete}>Delete Selected</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <ul
              className="image-gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageList?.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="image-card">
                        <img src={image.url} alt={`Image ${index}`} />
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(index)}
                          onChange={() => toggleImageSelection(index)}
                        />
                        <div className="image-options">
                          {/* <button onClick={() => handleDelete(index)}>
                            <FaTrash />
                          </button> */}
                          {/* <button onClick={() => handleSetFeatureImage(index)}>
                            <FaStar />
                          </button> */}
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;

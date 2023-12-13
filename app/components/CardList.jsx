"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import Lightbox from "./Lightbox";

export default function CardList({
  data,
  setLoadMoreClicked,
  loadMoreClicked,
  searchQuery,
}) {
  // state initialization
  const [collection, setCollection] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [collectedPhotos, setCollectedPhotos] = useState(null);

  // run whenever there is a change in the data dependency
  useEffect(() => {
    // if loadmore clicked concatenates the new photos to the existing collection and reset the flag
    if (loadMoreClicked) {
      setCollection((prev) => prev.concat(data.photos));
      setLoadMoreClicked(false);
    }
    // resets the collection and sets it to the new set of photos
    else if (searchQuery) {
      setCollection([]);
      setCollection((prev) => prev.concat(data.photos));
    }
    // sets the collection to the initial set of photos
    else {
      setCollection(data.photos);
    }
  }, [data]);

  // dynamically adjusts the number of columns based on the screen width
  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setNumColumns(2);
    } else if (screenWidth <= 1024) {
      setNumColumns(3);
    } else {
      setNumColumns(4);
    }
  });

  // function for when a user clicks on a photo
  const openLightbox = (photo) => {
    // sets the selected photo
    setSelectedPhoto(photo);

    // collects the current set of photos for display in the lightbox
    setCollectedPhotos(collection);

    document.body.style.overflow = "hidden";
  };

  // function for when the lightbox is closed
  const closeLightbox = () => {
    setSelectedPhoto(null);

    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Lightbox
        photo={selectedPhoto}
        onCloseLightbox={closeLightbox}
        collectedPhotos={collectedPhotos}
        onOpenLightbox={openLightbox}
      />

      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {[...Array(numColumns)].map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2 md:gap-5">
              {collection &&
                collection
                  .filter((_, index) => index % 4 === colIndex)
                  .map((photo, index) => (
                    <Card
                      key={`${colIndex}-${index}`}
                      photo={photo}
                      onOpenLightbox={openLightbox}
                    />
                  ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

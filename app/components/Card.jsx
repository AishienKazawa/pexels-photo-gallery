import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowRoundDown } from "react-icons/io";

export default function Card({ photo, onOpenLightbox }) {
  // state initialization
  const [isBlurred, setIsBlurred] = useState(true);

  // dynamically adjusts the height of the card based on its current height
  useEffect(() => {
    const presetHeight = ["20rem", "24rem", "28rem"];
    const cards = document.querySelectorAll(".card-container");

    // if the height is below 300 or above 450, it randomly sets a new height from a predefined array of heights
    cards.forEach((card) => {
      if (card.offsetHeight < 300 || card.offsetHeight > 450) {
        const randomIndex = Math.floor(Math.random() * presetHeight.length);
        card.style.height = presetHeight[randomIndex];
      }
    });
  });

  // handles the blurring effect on the image
  useEffect(() => {
    const large = photo.src.large;

    // create a new object
    const img = new Image();

    // set the source of the image to the large version of the photo
    img.src = large;

    // when the image is loaded apply blur effect
    img.onload = () => {
      setIsBlurred(true);

      // after delay remove the blur effect
      setTimeout(() => {
        setIsBlurred(false);
      }, 200);
    };
  }, [photo]);

  // function for download image
  const handleDownload = async () => {
    try {
      // fetch the original image from the provided URL
      const response = await fetch(photo.src.original);

      //  convert the image data into a Blob
      const blob = await response.blob();

      // create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // create an <a> element and set the href attribute of the link to the Blob URL
      const link = document.createElement("a");
      link.href = url;

      // set the download attribute of the link (file name)
      link.download = photo.alt + ".jpg";

      // trigger a click on the link to initiate download
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        key={photo.id}
        onClick={() => onOpenLightbox(photo)}
        className="card-container block relative overflow-hidden"
      >
        <motion.img
          animate={{ filter: isBlurred ? "blur(10px)" : "blur(0)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={photo.src.large}
          style={{ filter: "blur(10px)" }}
          className="img"
        />

        <div className="card-cover absolute top-0 left-0 z-10">
          <div className="card-information relative h-full p-5">
            <button
              onClick={handleDownload}
              className="absolute top-2 right-2 px-3 py-3 rounded-lg bg-ctm-secondary/80"
            >
              <IoMdArrowRoundDown />
            </button>
            <h3 className="text-lg font-semibold mb-3">
              {photo.alt ? photo.alt : "Timeless Beauty in Every Frame"}
            </h3>

            <div className="flex items-center gap-x-2">
              <span className="photographer-avatar">
                {photo.photographer.charAt(0)}
              </span>
              <h4>{photo.photographer}</h4>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

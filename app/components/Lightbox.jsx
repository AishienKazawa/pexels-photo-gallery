import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";

export default function Lightbox({
  photo,
  onCloseLightbox,
  collectedPhotos,
  onOpenLightbox,
}) {
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
    photo && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="lightbox-container w-full h-full fixed top-0 left-0 flex justify-center items-center z-30 bg-ctm-secondary/75"
      >
        <div className="lightbox-content grid gap-y-5 w-full h-full p-6">
          {/* lightbox tools */}
          <div className="flex gap-x-2 ml-auto mr-0">
            <button
              onClick={handleDownload}
              className="px-3 py-3 rounded-lg text-xl"
            >
              <IoMdArrowRoundDown />
            </button>

            <button
              onClick={onCloseLightbox}
              className="close-button px-3 py-3 rounded-lg text-xl"
            >
              <IoMdClose />
            </button>
          </div>

          {/* lightbox selected image */}
          <img
            src={photo.src.large}
            alt={photo.alt}
            className="lightbox-image h-full mx-auto"
          />
          <div className="text-ctm-primary text-center">
            <p className="">Photo by - {photo.photographer}</p>
            <span className="block">
              {photo.width} x {photo.height}
            </span>
          </div>

          {/* lightbox thumbnails */}
          <div className="overflow-x-auto pb-3">
            <div className="slider-container w-fit flex gap-x-2">
              {collectedPhotos &&
                collectedPhotos.map((photo, index) => (
                  <div key={index} className="w-24 h-24">
                    <img
                      src={photo.src.large}
                      alt={photo.alt}
                      onClick={() => onOpenLightbox(photo)}
                      className="img"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}

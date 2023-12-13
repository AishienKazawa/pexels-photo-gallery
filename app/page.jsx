"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import CardList from "./components/CardList";

export default function Home() {
  // state initialization
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  // fetching data form an API
  const fetchData = async () => {
    let response = null;

    try {
      // fetching data depends on whether a search query is present
      if (searchQuery) {
        response = await fetch(`api?searchQuery=${searchQuery}&page=${page}`);
      } else {
        response = await fetch(`api?page=${page}`);
      }

      const res = await response.json();

      // set the response data to the state and increment the page value
      setData(res);
      setPage(page + 1);
    } catch (error) {
      console.log("Error at fetching: " + error);
    }
  };

  // function for search submission
  const handleSearch = (e) => {
    e.preventDefault();

    fetchData();
  };

  // function for load more images
  const loadMoreImages = () => {
    fetchData();
    setLoadMoreClicked(true);
  };

  // fetch data when a component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="px-5 py-24 grid gap-y-24 relative">
      {/* header */}
      <header className="h-fit md:h-40">
        <div className="max-w-screen-xl h-full mx-auto flex flex-col justify-between md:items-center md:flex-row">
          <div className="mb-5 md:mb-0 md:w-2/5">
            <h1 className="text-5xl font-bold mb-2">Pexels Photos</h1>
            <p>
              The finest collection of free stock photos and royalty-free
              images, generously shared by creators.
            </p>
          </div>

          <div className="h-13 bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSearch} className="flex items-center ">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos..."
                className="bg-transparent w-full h-full px-5 py-4 text-black"
              />
              <button
                type="submit"
                className="h-full px-5 py-4 text-black hover:opacity-95"
              >
                <FiSearch className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* list of images */}
      <CardList
        data={data}
        loadMoreClicked={loadMoreClicked}
        setLoadMoreClicked={setLoadMoreClicked}
        searchQuery={searchQuery}
      />

      {/* load more button */}
      <button
        type="button"
        onClick={loadMoreImages}
        className="mx-auto flex gap-x-2 items-center py-3 px-8 rounded-md bg-ctm-accent hover:opacity-95"
      >
        <FiPlus /> Load More
      </button>
    </main>
  );
}

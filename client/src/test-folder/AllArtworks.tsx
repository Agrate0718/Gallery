import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Artlist from "../components/Partials/ArtList";
import ArtWorkCard from "../components/Partials/ArtworkCard";
let x = 0;
export default function AllArtworks() {
  console.log("test page");
  const server = process.env.REACT_APP_SERVER_URL;

  // Artwork from the backend
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  // State for error message from backend
  const [errorMessage, setErrorMessage] = useState("");

  useMemo(() => {
    console.log("useEffect happened");
    const getArtworks = async () => {
      console.log("getArtworks function called");
      try {
        console.log("try block called");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/artworks/get`
        );
        // const filteredArtworks = response.data.filter((course: any) => {
        //   return course.title.toLowerCase().includes(search.toLowerCase());
        // });
        const artData = response.data.artworks;
        console.log("response:", artData);
        setArtworks(artData);
      } catch (err: any) {
        console.warn(err);
        if (err.response) {
          setErrorMessage(err.response.data.message);
        }
      }
    };
    getArtworks();
  }, []); // empty array makes useEffect run only once
  console.log("artworks:", artworks);
  const artworkCardComponents = artworks.map((artwork: any) => {
    return <ArtWorkCard artwork={artwork} />;
  });

  return (
    <div className="flex items-center justify-center my-20">
      <div className=" grid gap-5 w-10/12  lg:grid-cols-3 md:grid-cols-2  place-items-center">
        {artworkCardComponents}
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}

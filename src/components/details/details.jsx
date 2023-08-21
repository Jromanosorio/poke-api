import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { API_URL_CHAIN } from "../../config/api";

function Details() {
  const [info, setInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(API_URL_CHAIN)
      .then((response) => response.json())
      .then((data) => setInfo(data.chain));
  }, [id]);

  const chainEvolution = (chain) => {
    const evolution = [];

    while (chain) {
      const speciesName = chain.species.name;
      evolution.push(speciesName);

      if (chain.evolves_to.length > 0) {
        chain = chain.evolves_to[0];
      } else {
        chain = null;
      }
    }

    return <p>{evolution.join(" -> ")}</p>;
  };

  return (
    <div>
      <Navbar />
      {chainEvolution(info)}
    </div>
  );
}

export default Details;

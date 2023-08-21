import { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonCard from "./components/card/card";
import Navbar from "./components/navbar/navbar";
import Details from "./components/details/details";
import { API_URL_POKEMON } from "./config/api";

function PokemonList() {
  const [list, setList] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  const getPokemonList = (url) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setList(data.results);
        setNext(data.next);
        setPrev(data.previous)
      });
  };

  const loadMore = () => {
    getPokemonList(next);
  };

  const loadPrev = () => {
    getPokemonList(prev);
  }

  useEffect(() => {
    getPokemonList(API_URL_POKEMON);
  }, []);

  return (
    <div>
      {next && (
        <div>
          <button className="nextPage" onClick={() => loadPrev(prev)}>
            Prev
          </button>
          <button className="nextPage" onClick={() => loadMore(next)}>
          Next
        </button>
        </div>
      )}
      <div className="app">
        {list.map((item, index) => {
          return <PokemonCard url={item.url} key={index} />;
        })}
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList/>,
  },
  {
    path: '/:id',
    element: <Details />
  }
])

function App() {
 
  return (
    <div>
      <Navbar />
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

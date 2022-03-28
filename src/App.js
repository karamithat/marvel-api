import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CharacterTable from "./components/CharacterTable";
import Search from "./components/Search";

const apikey = "9f8c78a1619ee42bf6a3f4da5e052a99";
const hash = "62c7a005d896b30a04c643c8e28c4be6";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if(query===""){
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      }else{
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=${apikey}&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      }
    
    };
    fetch();
  }, [query]);

  return (
    <div className="container">
      <Header />
      <Search search={(q)=>setQuery(q)}/>
     <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;

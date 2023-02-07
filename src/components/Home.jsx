import { useEffect, useState } from "react";
import { getData } from "../utils/getData.js";
import SearchBar from "./SearchBar.jsx";

/* Se exporta el componente Home. 
A través del useState guardamos la información que retorna la ejecución de la función getData que se ejecuta dentro del useEfect, es decir cuando se monta el componente
La función getData hace el llamado a la API y retorna la información en formato JavaScript

Home tiene un componente hijo llamado SearchBar al cual le pasa por props la información almacenada en el state DataGlobal
*/
export const Home = () => {
  const [dataGlobal, setDataGlobal] = useState([]);
  useEffect(() => {
    const data = async () => {
      const info = await getData();
      setDataGlobal(info);
    };
    data();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to InDatum Airlines</h1>
      <SearchBar flights={dataGlobal}></SearchBar>
    </div>
  );
};

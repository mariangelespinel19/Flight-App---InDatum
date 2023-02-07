import { useEffect, useState } from "react";
import { getData } from "../utils/getData.js";
import SearchBar from "./SearchBar.jsx";

/* The Home component is exported. 
Through the useState we store the information returned by the execution of the getData function that is executed inside the useEfect, that is, when the component is mounted.
The getData function makes the call to the API and returns the information in JavaScript format.

Home has a child component called SearchBar to which the information stored in the state DataGlobal is passed by props. 
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

import { useEffect, useState } from "react";
import { getData } from "../utils/getData";
import SearchBar from "./SearchBar";

/* The Home component is exported. 
Through the useState we store the information returned by the execution of the getData function that is executed inside the useEfect, that is, when the component is mounted.
The getData function makes the call to the API and returns the information in JavaScript format.

Home has a child component called SearchBar to which the information stored in the state DataGlobal is passed by props. 
*/
export const Home = () => {

  /**
   * 
   * 
   * @useState State with the information returned by the getData function that makes the API call.
   * @useEffect when the component is mounted we execute an asynchronous function where we make the API call via
   * of the getData function, the result is stored in the dataGlobal state
   * @returns {html} return the SearchBar component inside a div.
   */

  const [dataGlobal, setdataGlobal] = useState([]);
  useEffect(() => {
    const data = async () => {
      const info = await getData();
      setdataGlobal(info);
    };
    data();
  }, []);

  return (
    <div className="App">
      <SearchBar flights={dataGlobal}></SearchBar>
    </div>
  );
};

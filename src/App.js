import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [flights, setflights] = useState([]);
    useEffect(() => {
        fetch('https://flights-api-production.up.railway.app/api/flights')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setflights(data)
            })
            .catch((error) =>{
                console.log(error.message);
            })
    }, []);

  return (
   <div className='App'>
    <h1>Hola Usuario</h1>
    <SearchBar/>
   </div>
  );
}

export default App;

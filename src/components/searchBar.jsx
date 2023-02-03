import React from "react";
export default function SearchBar(){
    return(
        <div>
            <input
                type= "text"
                placeholder = "City From"
            />

            <input
                type= "text"
                placeholder = "City to"
            />

            <input
                type= "date"
                placeholder = "Departure date"
            />


            <input
                type= "number"
                placeholder = "Number of passengers"
            />

            <input
                type= "text"
                placeholder = "search"
            />
            <button type ="submit">
                Search
            </button>    
            
        </div>
    )

}
 
import React, { useEffect, useState } from "react";
import style from "./searchBar.module.css";

const SearchBar = ({handleSubmit, text}) => {

    const [inputText, setInputText] = useState("");

    useEffect(() => {
        handleSubmit(inputText);
    }, [inputText]);
    
    return (
        <div>
            <input value={inputText} onChange={e => setInputText(e.target.value)} type="search" placeholder={`${text}`}/>
        </div>
    )
}

export default SearchBar;
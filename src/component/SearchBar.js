import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./SearchBar.css";
import mic from "../img/voice_mic.png";


const SearchBar = () => {

    const [inputs, setInputs] = useState();
    const [url, setUrl] = useState("/search/");
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setValue(`"` + result + 
        `"`);
      },
    });

    useEffect(()=>{
        console.log("저장값: " +value);
        updateURL(value);
        console.log("주소값: " +url);
    }, [inputs, url, value]);

    const OnInputChange = (e) => {
        console.log("입력값: " + e.target.value);
        setInputs(e.target.value);
    };

    const updateURL = (query) => {
        var newURL;
        newURL = "/search/" + query.substring( 1, query.length-1 )
        setUrl(newURL);
    }

    return <form className="SearchBar">
        <Link to={url}>
            <button className="mic_button" onMouseDown={listen} onMouseUp={stop}><img src={mic} alt="mic" /></button>
        </Link>
        {listening && <div></div>}
        <input placeholder={value} />
    </form>

}

export default SearchBar;
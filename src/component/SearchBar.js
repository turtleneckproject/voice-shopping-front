import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./SearchBar.css";
import mic from "../img/voice_mic.png";


const SearchBar = ({voiceInput}) => {

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
        // console.log("저장값: " +value);
        updateURL(value);
        // console.log("주소값: " +url);
    }, [inputs, url, value, voiceInput]);

    const OnInputChange = (e) => {
        setInputs(e.target.value);
    };

    const updateURL = (query) => {
        var newURL;
        if(query == `"상세보기"`){
            voiceInput("상세보기");
            
            return;
        }
        newURL = "/search/" + query.substring( 1, query.length-1 )
        
        setUrl(newURL);
    }

    return <form className="SearchBar">
        <button className="mic_button"><img src={mic} alt="mic" onMouseEnter={listen} onMouseLeave={stop} /></button>
        <input placeholder={value} />
        <Link to={url}><button className="search">검색</button></Link>
    </form>

}

export default SearchBar;
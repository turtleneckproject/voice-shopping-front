import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import mic from "../img/voice_mic.png";

const SearchBar = () => {

    const [inputs, setInputs] = useState();
    const [url, setUrl] = useState("/search/");
    useEffect(()=>{
        console.log("저장값: " +inputs);
        updateURL(inputs);
        console.log("주소값: " +url);
    }, [inputs, url]);

    const OnInputChange = (e) => {
        console.log("입력값: " + e.target.value);
        setInputs(e.target.value);
    };

    const updateURL = (query) => {
        var newURL = "/search/" + query;
        setUrl(newURL);
    }

    return <form className="SearchBar">
        <Link to={url}><img src={mic} alt="voice_mic" /></Link>
        <input type="search" placeholder="음성인식 텍스트 예시" onChange={OnInputChange}/>
    </form>

}

export default SearchBar;
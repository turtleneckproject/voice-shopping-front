import "./SearchBar.css";
import { useSpeechRecognition } from 'react-speech-kit';
import React, { useState } from 'react'
export default function SearchBar(){
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setValue(result);
      },
    });
    return <form className="SearchBar">
      <button onMouseDown={listen} onMouseUp={stop} className="mic"><img src="img/voice_mic.png"/>
      </button>
      {listening}
        <input placeholder={value}/>
    </form>

}
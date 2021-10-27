import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./SearchBar.css";
import mic from "../img/voice_mic.png";


const SearchBar = (props) => {
    const history = useHistory();

    //검색페이지 호출을 위한 url 주소를 담는 state
    const [url, setUrl] = useState("/search/");

    //음성 데이터를 string으로 변환시킨 값을 담는 state
    const [value, setValue] = useState('');

    //음성 입력이 끝났는지 여부를 저장하는 state
    const [isVoiceDone, setIsVoiceDone] = useState(false); 


    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => { // 음성이 입력이 들어오면 실행되는 부분
        console.log("onResult 시작")
        setIsVoiceDone(false);
        setValue(result);
        props.voiceInput(result); // 팝업창에 음성을 출력하기 위한 app.js의 state를 업데이트 한다.
        setIsVoiceDone(true);
        console.log("onResult 끝")
      },
      onEnd: () => { // 음성 입력이 완전히 끝났을 때 실행되는 부분
        
        // 검색어를 말했을 때 해당 검색어로 검색한 페이지 호출
        history.push({pathname:url});
      }
    });

    useEffect(()=>{
        console.log("저장값: " + value);
        updateURL(value);
    }, [value, props.voiceInput]);


    //웹페이지에서의 음성출력이 끝나면 사용자의 음성을 입력 받는다.
    useEffect(()=>{
        // app.js에서 관리하는 state. 각 페이지에서 음성 출력이 끝나면 해당 값을 true로 바꿔준다. 
        if(props.isSpeakDone){ 
            console.log("듣기 시작");
            listen();
        }
    },[props.isSpeakDone]);

    //음성 입력이 들어오지 않을 때 실행되는 부분
        useEffect(()=>{
        if(isVoiceDone){ //음성 입력이 들어오지 않는 상황에서만 실행
            setTimeout(function(){ // 3초동안 카운트를 센다.
                console.log("음성 입력 없이 3초가 지났습니다.");
                stop(); // 음성 입력 완전히 종료
            }, 3000);
        }
    }, [isVoiceDone]);

    const updateURL = (query) => {
        var newURL;
        if(query == `"상세보기"`){
            props.voiceInput("상세보기");
            return;
        }
        newURL = "/search/" + query;
        
        setUrl(newURL);
    }

    return <form className="SearchBar">
        <button className="mic_button"><img src={mic} alt="mic" onMouseEnter={stop} /></button>
        <input />
        <Link to={url}><button className="search">검색</button></Link>
    </form>

}

export default SearchBar;
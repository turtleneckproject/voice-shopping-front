import React, { useState, useEffect } from "react";
import Breadcrumbs from '../component/Breadcrumbs';
import ProductGrid from '../component/ProductGrid';
import SearchFilter from '../component/SearchFilter';
import SearchResult from '../component/SearchResult';

// import ReactDOM from 'react-dom';
import '../index.css';
import '../css/Mainpage.css'
import Logo from '../component/Logo';
import SearchBar from '../component/SearchBar';
// import App from '../App';
// import reportWebVitals from '../reportWebVitals';
// import "../static/fonts/fonts.css";

const MainPage = ({msgInput}) => {

  const voices = window.speechSynthesis.getVoices();
  const [msg, setMsg] = useState("안녕하십니까? 보이스 쇼핑몰에 오신것을 환영합니다. 찾으시는 상품명을 말씀해주세요.");

  function btnRead(message) {
      speak( message, {
          rate: 1.0,
          pitch: 1.0,
          // lang: "ko-KR"
      })
  }

  function speak(text, opt_prop) {
      if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
          alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
          return
      }

      window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

      const prop = opt_prop || {}

      const speechMsg = new SpeechSynthesisUtterance()
      speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
      speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
      // speechMsg.lang = prop.lang
      speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
      speechMsg.text = text

      // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
      window.speechSynthesis.speak(speechMsg)
  }

  useEffect(()=>{
    msgInput(msg);
    btnRead(msg);
  },[msg]);

  return (
    <div className="main_page">
      <div className="main_logo" ><Logo /></div>
        <SearchBar />
    </div>
  );
};

export default MainPage; 


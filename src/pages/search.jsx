import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../component/Breadcrumbs';
import ProductGrid from '../component/ProductGrid';
import SearchFilter from '../component/SearchFilter';
import SearchResult from '../component/SearchResult';
import '../index.css';
import '../component/Container.css';
import Header from '../component/Header';


const SearchPage = (props) => {
  var voices = window.speechSynthesis.getVoices();
  const query = useParams().keyword;
  const [msg, setMsg] = useState("'" + query+ "' 상품 검색 결과입니다. 대표상품 정보를 듣기 원하시면 상세보기라고 말씀해주세요. ");

const btnRead = (e) => {
  console.log("말하겠습니다");

    speak(msg , {
        rate: 1.0,
        pitch: 1.0,
    })
    console.log("말하기 종료")
}

function speak(text, opt_prop) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        return
    }

    window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

    const prop = opt_prop || {}

    const speechMsg = new SpeechSynthesisUtterance()
    speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
    speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
    speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
    speechMsg.text = text

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg)
}

useEffect(()=>{
  props.msgInput(msg);
  btnRead();
}, []);

  return (
    <div>
      <Header voiceInput={props.voiceInput} msg={msg}/>
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter />
        <SearchResult />
        <ProductGrid keyword={useParams().keyword} voice={props.voice} voiceInput={props.voiceInput}/>
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};


export default SearchPage;
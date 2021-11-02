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
  const [searchOpt, setSearchOpt] = useState("sim");
  const [searchOptKR, setSearchOptKR] = useState("정확도순");
  const [productInfo, setProductInfo] = useState({
    set: 0,
    idx: 0,
    title: "unknown",
    price: 0
  });
  const [msg, setMsg] = useState("");
  const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
  const [speakOnce, setSpeakOnce] = useState(false);

  const handleSetProductInfo = (input) => {
    setMsg("검색어 " + query+ "에 대한 " + searchOptKR +  ` 검색 결과를 불러왔습니다. 검색옵션을 변경하시려면 검색옵션을, 가장 유사한 상품 정보를 들으려면 가격듣기를 말씀해주세요.`);
    setSpeakOnce(true);
    setProductInfo({
      set: input.set,
      idx: input.idx,
      title: input.title,
      price: input.price
    });
  }

const btnRead = () => {
    speak(msg , {
        rate: 1.1,
        pitch: 1.0,
    })
}

function speak(text, opt_prop) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        return
    }

    // window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

    const prop = opt_prop || {}

    setIsSpeakDone(false);
    const speechMsg = new SpeechSynthesisUtterance()
    speechMsg.rate = prop.rate || 1.2 // 속도: 0.1 ~ 10      
    speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
    speechMsg.voice = voices.filter(function(voice) { return voice.name === 'Google 한국의'; })[0];
    speechMsg.text = text

    speechMsg.onend = function(){
      setIsSpeakDone(true);
    }

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg)
}

useEffect(()=>{
  if(speakOnce){
    props.msgInput(msg);
    btnRead();
    setSpeakOnce(false);
  }
  else{
    console.log("음성 출력되지 않음")
  }
}, [speakOnce]);

useEffect(()=>{
  switch(props.nextAction){
    case "select_reading_items":
      setMsg(`검색옵션과 가장 유사한 대표상품은 ` + productInfo.title +`이며, 가격은 ` + productInfo.price + `원 입니다. 현재 상품의 정보를 자세히 들으려면 "상세 듣기"라고 말씀해주세요.`);
      setSpeakOnce(true);
      break;
    case "change_search_option":
      setMsg(`검색 결과 정렬 옵션에는 "정확도순", "날짜순", "가격오름차순", "가격내림차순"이 있습니다. 원하시는 옵션을 말씀해주세요.`);
      setSpeakOnce(true);
      break;
    case "set_search_option_sim":
      setSearchOpt("sim");
      setSearchOptKR("정확도순");
      setSpeakOnce(true);
      break;
    case "set_search_option_date":
      setSearchOpt("date");
      setSearchOptKR("날짜순");
      setSpeakOnce(true);
      break;
    case "set_search_option_asc":
      setSearchOpt("asc");
      setSearchOptKR("가격오름차순");
      setSpeakOnce(true);
      break;
    case "set_search_option_dsc":
      setSearchOpt("dsc");
      setSearchOptKR("가격내림차순");
      setSpeakOnce(true);
      break;
    default:
      break;
  }
}, [props.nextAction]);

  return (
    <div>
      <Header voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput} searchOptInput={setSearchOpt}/>
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter option={searchOptKR}/>
        <SearchResult />
        <ProductGrid setProduct={handleSetProductInfo} targetIdx={productInfo.idx} keyword={useParams().keyword} option={searchOpt} voice={props.voice} voiceInput={props.voiceInput} nextAction={props.nextAction}/>
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};


export default SearchPage;
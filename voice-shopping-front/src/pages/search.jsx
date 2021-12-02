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
  const [isLoad, setIsLoad] = useState("false"); // 음성인식이 끝났을때마다 true로 세팅되는 추가 flag.
  const [nextAction, setNextAction] = useState("");
  const [targetIdx, setTargetIdx] = useState(0);
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
    setProductInfo({
      set: input.set,
      idx: input.idx,
      title: input.title,
      price: input.price
    });
  }

  const handleIsLoadInput = (input) => {
    if(input === true){
      setMsg("검색어 " + query+ "에 대한 " + searchOptKR +  ` 검색 결과를 불러왔습니다. 검색옵션을 변경하시려면 검색옵션을, 가장 유사한 상품 정보를 들으려면 가격듣기를 말씀해주세요.`);
      setSpeakOnce(true);
    }
  }

  const nextItem = () => {
    var idx = targetIdx;
    setTargetIdx(idx+1);
  }

  const prevItem = () => {
    var idx = targetIdx;
    setTargetIdx(idx-1);
  }

const btnRead = () => {
  setIsSpeakDone(false);
  speak(msg, {
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
  console.log("next Action parts");
  switch(nextAction){
    case "select_reading_items":
      setMsg(`현재 상품은 ` + productInfo.title +`이며, ` + productInfo.price + `원 입니다. 현재 상품의 정보를 자세히 들으려면 "상세 듣기", 다음 상품 정보를 들으려면 "다음", 이전 상품정보를 들으려면 "이전"이라고 말씀해주세요.`);
      setSpeakOnce(true);
      break;
    case "next_item":
      if(targetIdx === 26){
        setMsg(`목록의 마지막 상품입니다. 이전 상품의 정보를 들으려면 "이전", 현재 상품의 정보를 자세히 들으려면 "상세 듣기"라고 말씀해주세요.`);
        setSpeakOnce(true);
      }
      else {
        nextItem();
        setTimeout(()=>setNextAction("select_reading_items"), 1000);
      }
      break;
    case "prev_item":
      if(targetIdx === 0){
        setMsg(`목록의 첫 상품입니다. 다음 상품의 정보를 들으려면 "다음", 현재 상품의 정보를 자세히 들으려면 "상세 듣기"라고 말씀해주세요.`);
        setSpeakOnce(true);
      }
      else {
        prevItem();
        setTimeout(()=>setNextAction("select_reading_items"), 1000);
      }
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
  setIsLoad(false);
}, [nextAction]);

useEffect(()=>{
  if(isLoad){ 
    setNextAction(props.nextAction);
  }
}, [props.nextAction, isLoad]);

useEffect(()=>{
  console.log("nextAction 업데이트 됨: "+nextAction);
}, [nextAction]);
useEffect(()=>{
  console.log("productInfo 업데이트 됨: ");
}, [productInfo]);
useEffect(()=>{
  console.log("isLoad 업데이트 됨: "+isLoad);
}, [isLoad]);

useEffect(()=>{
  console.log("targetIdx 업데이트 됨: "+ targetIdx);
}, [targetIdx]);

  return (
    <div>
      <Header 
        nowPage={"SearchPage"} 
        loginID={props.loginID} 
        voiceInput={props.voiceInput} 
        msg={msg} 
        isSpeakDone={isSpeakDone} 
        nextActionInput={props.nextActionInput} 
        setLoad={setIsLoad}
      />
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter option={searchOptKR}/>
        <SearchResult />
        <ProductGrid 
          setProduct={handleSetProductInfo}
          isLoadInput={handleIsLoadInput}
          targetIdx={targetIdx} 
          keyword={useParams().keyword} 
          option={searchOpt} 
          voice={props.voice} 
          voiceInput={props.voiceInput} 
          nextAction={props.nextAction}
        />
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};


export default SearchPage;
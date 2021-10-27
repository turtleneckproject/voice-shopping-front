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
  const [productInfo, setProductInfo] = useState({
    set: 0,
    idx: 0,
    title: "첫번째",
    price: 0
  });
  const [msg, setMsg] = useState("");
  const [isSet, setIsSet] = useState(false);

  const handleSetProductInfo = (input) => {
    setMsg("검색어 '" + query+ "' 정확도순 검색 결과입니다.\n검색옵션과 가장 유사한 대표상품은 " + input.title +"이며, 가격은 " + input.price + "원 입니다.");
    setProductInfo({
      set: input.set,
      idx: input.idx,
      title: input.title,
      price: input.price
    });

    console.log("isSet: " + isSet);
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

    const speechMsg = new SpeechSynthesisUtterance()
    speechMsg.rate = prop.rate || 1.2 // 속도: 0.1 ~ 10      
    speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
    speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
    speechMsg.text = text

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg)
}

useEffect(()=>{
  if(productInfo.set === 1){
    console.log("진입")
    // setMsg("검색어 '" + query+ "' 정확도순 검색 결과입니다.\n검색옵션과 가장 유사한 대표상품은 " + productInfo.title +"이며, 가격은 " + productInfo.price + "원 입니다.")
    console.log(query + productInfo.title +productInfo.price + msg)
    props.msgInput(msg);
    btnRead();
    setProductInfo({set: 0});
  }
  else{
    console.log("실행되지 않음")
  }
}, [productInfo]);

// useEffect(()=>{
//   if(productInfo.set)

// });

  return (
    <div>
      <Header voiceInput={props.voiceInput} msg={msg}/>
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter />
        <SearchResult />
        <ProductGrid setProduct={handleSetProductInfo} targetIdx={productInfo.idx} keyword={useParams().keyword} voice={props.voice} voiceInput={props.voiceInput}/>
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};


export default SearchPage;
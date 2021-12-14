import React, { useState, useEffect } from "react";
import '../index.css';
import '../css/Mainpage.css'
import Logo from '../component/Logo';
import SearchBar from '../component/SearchBar';
import { useHistory } from "react-router";

const MainPage = (props) => {
  const history= useHistory();
  const voices = window.speechSynthesis.getVoices();
  const [msg, setMsg] = useState("");
  const [speakOnce, setSpeakOnce] = useState(false);
  const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
  const [isLogin, setIsLogin] = useState(false);
  const [nextAction, setNextAction] = useState("");

  function btnRead() {
    setIsSpeakDone(false);
    speak( msg, {
        rate: 1.2,
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
      speechMsg.rate = prop.rate || 1.3 // 속도: 0.1 ~ 10      
      speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
      // speechMsg.lang = prop.lang
      speechMsg.voice = voices.filter(function(voice) { return voice.name === 'Google 한국의'; })[0];
      speechMsg.text = text

      speechMsg.onend = function(){
        setIsSpeakDone(true);
      }

      // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
      window.speechSynthesis.speak(speechMsg)
  }

  useEffect(()=>{
    if(props.loginID == null){
      setSpeakOnce(false);
      setMsg(`보이스 쇼핑몰에 오신것을 환영합니다. 현재 로그인이 되어있지 않습니다. 보이스 쇼핑몰은 로그인 후에 이용할 수 있습니다. 등록된 아이디가 있다면 "로그인", 없다면 "회원가입"이라고 말씀해주세요.`);
      setSpeakOnce(true);
    }
    else{
      setSpeakOnce(false);
      setIsLogin(true);
      setMsg(props.loginID+`님, 보이스 쇼핑몰에 오신것을 환영합니다. 찾으려는 검색어를 말씀하시거나, "장바구니", "결제 내역"을 말해 바로 이동할수도 있습니다.`);
      setSpeakOnce(true);
    }
  },[]);

  useEffect(()=>{
    switch(props.nextAction){
      case "login_first":
        setSpeakOnce(false);
        setMsg(`로그인을 먼저 해주세요. 등록된 아이디가 있다면 "로그인", 없다면 "회원가입"이라고 말씀해주세요.`);
        setSpeakOnce(true);
        break;
      default:
        break;
    }
  }, [props.nextAction]);


  useEffect(()=>{
  }, [props.loginID, isLogin]);

  useEffect(()=>{
    if(speakOnce){
      props.voiceInput("");
      props.msgInput(msg);
      btnRead();
      setSpeakOnce(false);
    }
    else{
      console.log("음성 출력되지 않음")
    }
  }, [speakOnce]);

  useEffect(()=>{
  }, [msg, props.nextAction]);

  // useEffect(()=>{

  // }, [props.nextAction]);

  return (
    <div className="main_page">
      {props.nextAction === "join_member" && history.push({pathname: `/join`})}
      {props.nextAction === "login" && history.push({pathname: `/login`})}
      {props.nextAction === "go_cart" && history.push({pathname: `/cart`})}
      {props.nextAction === "go_pay" && history.push({pathname: `/pay`})}

      <div className="main_logo" ><Logo /></div>
        <SearchBar 
          nowPage={"MainPage"} 
          voiceInput ={props.voiceInput} 
          isSpeakDone={isSpeakDone} 
          nextActionInput={props.nextActionInput}
          searchFlag={isLogin}
          />
    </div>
  );
};

export default MainPage; 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./SearchBar.css";
import mic from "../img/voice_mic.png";
import sound from "../sound/mic_on.mp3";

const playMicOnSound = () => {
  let audio = new Audio(sound);
  audio.play();
}

const SearchBar = (props) => {
  const history = useHistory();

  //검색페이지 호출을 위한 url 주소를 담는 state
  const [url, setUrl] = useState("/search/");

  //음성 데이터를 string으로 변환시킨 값을 담는 state
  const [value, setValue] = useState("");

  //음성 입력이 끝났는지 여부를 저장하는 state
  const [isVoiceDone, setIsVoiceDone] = useState(false);

  //현재 위치한 페이지 정보
  const [nowPage, setNowPage] = useState(props.nowPage);

  //검색 기능 on/off 결정할 스위치
  const [searchFlag, setSearchFlag] = useState(false);

    //테스트용 함수
    const onChange = (e) => {
      console.log(e.target.value);
      setValue(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
    }

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      if(result == ""){}
      else{
      // 음성이 입력이 들어오면 실행되는 부분
      // console.log("onResult 시작");
      setIsVoiceDone(false);
      if(props.nowPage === "LoginPage" || props.nowPage === "JoinPage"|| props.nowPage === "CartPage"|| props.nowPage === "PayPage")
        result = convertVoice(result);
      setValue(result);
      props.voiceInput(result); // 팝업창에 음성을 출력하기 위한 app.js의 state를 업데이트 한다.
      setIsVoiceDone(true);
      // console.log("onResult 끝");
      }
    },
    onEnd: () => {
      // 음성 입력이 완전히 끝났을 때 실행되는 부분
      var voiceValue = value;
      setValue(""); //음성 데이터 초기화
      switch (nowPage){ //현재 어떤 페이지에서 작업중인지 확인
        case "MainPage":
          switch(voiceValue){
            case "회원가입": case "회원 가입":
              setNowPage("JoinPage");
              props.nextActionInput("join_member");
              break;
            case "로그인":
              props.nextActionInput("login");
              break;
            case "장바구니":
              props.nextActionInput("go_cart");
              break;
            case "결제내역": case "결제 내역":
              props.nextActionInput("go_pay");
              break;
            default:
              // 검색어를 말했을 때 해당 검색어로 검색한 페이지 호출
              if(searchFlag){
                props.nextActionInput("search_by_keyword");
                history.push({ pathname: url });
                break;
              }
              else{
                props.nextActionInput("login_first");
                break;
              }
          }
          break;
        case "LoginPage": //로그인
          props.loginFieldValueInput("");
          props.loginFieldValueInput(voiceValue); //음성으로 입력받은 값을 로그인 페이지에 보내준다.
          break;
        case "JoinPage": //회원가입 페이지
          switch(voiceValue){
            case "계속":
              props.nextActionInput("next");
              break;
            case "다시입력": case "다시 입력":
              props.nextActionInput("again");
              break;
            case "생략":
              props.nextActionInput("skip");
              break;
            case "처음":
              props.nextActionInput("first");
              break;
            default:
              props.nextActionInput("normal");
              props.joinFieldValueInput(voiceValue); //음성으로 입력받은 값을 회원가입 페이지에 보내준다.
              break;
          }
          break;
        case "SearchPage":
          switch(voiceValue){
            case "검색옵션": case "검색 옵션":
              props.nextActionInput("change_search_option");
              break;
            case "정확도순": case "정확도 순":
              props.nextActionInput("set_search_option_sim");
              break;
            case "날짜순": case "날짜 순":
              props.nextActionInput("set_search_option_date");
              break;
            case "가격오름차순":  case "가격 오름차순": case "가격오름차 순": case "가격 오름차 순":
              props.nextActionInput("set_search_option_asc");
              break;
            case "가격내림차순": case "가격 내림차순": case "가격내림차 순": case "가격 내림차 순":
              props.nextActionInput("set_search_option_dsc");
              break;
            case "가격듣기": case "가격 듣기":
              props.nextActionInput("select_reading_items");
              break;
            case "상세듣기": case "상세 듣기":
              props.nextActionInput("detail_info");
              break;
            case "다음":
              props.nextActionInput("next_item");
              break;
            case "이전":
              props.nextActionInput("prev_item");
              break;
            default:
              break;
          }
          props.setLoad(true);
          break;
        case "ProductPage":
          switch(voiceValue){
            case "이동":
              props.nextActionInput("go_cart");
              break;
            case "장바구니":
              props.nextActionInput("put_cart");
              break;
            default:
              break;
          }
          break;
        case "CartPage":
          switch(voiceValue){
            case "네":
              props.nextActionInput("yes");
              break;
            case "아니요": case "아니오":
              props.nextActionInput("no");
              break;
            case "결제":
              props.nextActionInput("add");
              break;
            case "다음":
              props.nextActionInput("next_item");
              break; 
            case "이전":
              props.nextActionInput("prev_item");
              break;
            case "계속":
              props.nextActionInput("next");
              break;   
            case "다음 카드": case "다음카드":
              props.nextActionInput("next");
              break;
            case "생략":
              props.nextActionInput("skip");
              break;         
            case "결제하기": case "결제 하기": case "결재하기": case "결재 하기":
              props.nextActionInput("comfirm_pay");
              break;
            case "카드 등록": case "카드 등록":
              props.nextActionInput("register_card");
              break;
            case "카드 비밀번호": case "카드 비밀번호":
              props.nextActionInput("card_pwd");
              break;
            case "카드 확인":  case "카드확인":
              props.nextActionInput("comfirm_card");
              break;
            case "주소 확인":  case "주소확인":
              props.nextActionInput("comfirm_address");
              break;
            case "상품 듣기": case "상품듣기":
              props.nextActionInput("product_info");
              break;
            case "전체 삭제":
              props.nextActionInput("delete_all");
              break;
            case "다시입력": case "다시 입력":
              props.nextActionInput("again");
              break;
            default:
              props.nextActionInput("normal");
              props.cartFieldValueInput(voiceValue); //음성으로 입력받은 값을 회원가입 페이지에 보내준다.
              break;
          }
          break;
        case "PayPage":
          switch(voiceValue){
            case "상품 확인": case "상품확인":
              props.nextActionInput("comfirm_list");
              break;
            case "처음":
              props.nextActionInput("first");
              break;
            case "다음": 
              props.nextActionInput("next_item");
              break;
            case "내역 삭제": 
              props.nextActionInput("delete");
              break;
            case "월별 구분":  case "월별구분": 
              props.nextActionInput("month_part");
              break;
            case "날짜 구분":  case "날짜구분": 
              props.nextActionInput("day_part");
              break;
            case "구분 없음":  case "구분없음": 
              props.nextActionInput("no_part");
              break;
            default:
              props.nextActionInput("normal");
              props.payFieldValueInput(voiceValue); //음성으로 입력받은 값을 회원가입 페이지에 보내준다.
              break;
          }
          break;
        default:
          break;
      }
    },
  });

  const convertVoice = (input) => {
    switch(input){
      case "한개": case "한 개": case "1개": case "1 개":
        return "1";
      case "두개": case "두 개": case "2개": case "2 개":        
        return "2";
      case "세개": case "세 개": case "3개": case "3 개": case "세계":        
        return "3";
      case "네개": case "네 개": case "4개": case "4 개":        
        return "4";
      case "다섯개": case "다섯 개": case "5개": case "5 개":        
        return "5";
      case "여섯개": case "여섯 개": case "6개": case "6 개":        
        return "6";
      case "일곱개": case "일곱 개": case "7개": case "7 개":        
        return "7";
      case "여덟개": case "여덟 개": case "8개": case "8 개":        
        return "8";
      case "아홉개": case "아홉 개": case "9개": case "9 개":        
      return "9";
      case "열개": case "열 개": case "10개": case "10 개":        
      return "10";
      case "샵":
        return "#";
      case "골뱅이":
        return "@";
      case "느낌표":
        return "!";
      case "달러":
        return "$";
      case "별표":
        return "*";
      case "일": case "하나":
        return "1";
      case "둘":
        return "2";
      case "삼": case "산":
        return "3";
      case "사":
        return "4";
      case "os":
        return "5s";
      case "5일":
        return "51";
      case "오하나":
        return "51";
      case "4일":
        return "41";
      case "사육":
        return "46";
      case "오":
        return "5";
      case "육":
        return "6";
      case "칠":
        return "7";
      case "팔":
        return "8";
      case "8일":
        if(props.nowPage === "LoginPage") return "81";
      case "9일": case "91":
        if(props.nowPage === "PayPage") return "9";
      case "10일": case "11":
        if(props.nowPage === "PayPage")   return "10";
      case "11일": case "10일":
      if(props.nowPage === "PayPage")   return "11";
      case "1월":
        return "1";
      case "2월":
        return "2";
      case "3월":
        return "3";
      case "4월":
        return "4";
      case "5월":
        return "5";
      case "6월":
        return "6";
      case "7월":
        return "7";
      case "8월":
        return "8";
      case "9월":
        return "9";
      case "10월":
        return "10";
      case "11월":
        return "11";
      case "12월":
        return "12";
      case "구":
        return "9";
      case "영": case "공":
        return "0";
      case "삼육":
        return "36";
      case "월별 9분":  case "월별9분": 
      if(props.nowPage === "PayPage") return "월별 구분";
      case "날짜 9분":  case "날짜9분": 
      if(props.nowPage === "PayPage")  return "날짜 구분";
      case "9분없음": case "9분 없음":
        if(props.nowPage === "PayPage") return "구분 없음"; 
      case "이":
        if(props.nowPage === "CartPage") return "2";
        if(props.nowPage === "JoinPage" || props.nowPage === "LoginPage") return "e";
      case "키": case "티":
        return "t";
      default:
        return input;
    };
  }
  useEffect(() => {
    // console.log("저장값: " + value);
    updateURL(value);
  }, [value, props.voiceInput]);

  //웹페이지에서의 음성출력이 끝나면 사용자의 음성을 입력 받는다.
  useEffect(() => {
    // app.js에서 관리하는 state. 각 페이지에서 음성 출력이 끝나면 해당 값을 true로 바꿔준다.
    if (props.isSpeakDone) {
      console.log("듣기 시작");
      props.voiceInput("듣고 있어요");
      playMicOnSound();
      listen();
    }
  }, [props.isSpeakDone]);

 //음성 입력이 들어오지 않을 때 실행되는 부분
 useEffect(() => {
  if (isVoiceDone  && (value !== "")) {// 음성이 입력된 적이 있고, 음성 입력이 들어오지 않는 상황일 때
    var timer = 3; 
    var counter = setInterval(function(){
      if(isVoiceDone){
        if(timer === 0){
          console.log("음성 입력 없이 3초가 지났습니다.");
          stop(); // 음성 입력 완전히 종료
          setIsVoiceDone(false);
          clearInterval(counter);
        }
        timer--;
      }
      else {}
    }, 1000);

    // setTimeout(function () {
    //   // 3초동안 카운트를 센다.
      
    // }, 3000);
  }
}, [isVoiceDone]);

useEffect(()=>{
  console.log("입력된 음성 :" + value);
}, [value]);

useEffect(()=>{
  setSearchFlag(props.searchFlag);
}, [props.searchFlag]);

useEffect(()=>{
  console.log("SearchFlag: "+searchFlag);
}, [searchFlag]);

  const updateURL = (query) => {
    var newURL;
    if (query === `"상세보기"`) {
      return;
    }
    newURL = "/search/" + query;

    setUrl(newURL);
  };

  return (
    <form className="SearchBar">
      <button className="mic_button">
        <img src={mic} alt="mic" onMouseEnter={()=> stop()} />
      </button>
      <input type="text" onChange={onChange}/>
      {/* <Link to={url}> */}
        <button className="search">검색</button>
      {/* </Link> */}
    </form>
  );
};

export default SearchBar;
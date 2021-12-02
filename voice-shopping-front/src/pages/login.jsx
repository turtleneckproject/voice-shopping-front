import React ,{ useEffect, useState } from 'react';
import { useHistory } from "react-router";
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import LoginArea from '../component/LoginArea';

const LoginPage = (props) => {
    const history = useHistory();
    var voices = window.speechSynthesis.getVoices();
    const [msg, setMsg] = useState("로그인을 시작합니다. 보안을 위해 이어폰 착용을 권장하며, 모든 글자의 대소문자는 구분하지 않습니다. 아이디를 말씀해주세요. ");
    const [id, setId] = useState("");
    const [pwdLength, setPwdLength] = useState(0);
    const [pwdCheckCnt, setPwdCheckCnt] = useState(3); // 통과해야 할 비밀번호 질문의 count
    const [rndIdx, setRndIdx] = useState({first: -1, second: -1}); // 랜덤으로 물어볼 비밀번호의 인덱스
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(true);
    const [fieldValue, setFieldValue] = useState(""); // 음성인식 모듈에서 넘어온 음성 데이터 값
    const [nextField, setNextField] = useState("id"); // 현재 작업 구간을 나타내는 커서
    const [loginSuccess, setLoginSuccess] = useState(false);  // 로그인 성공 여부

    const getPwdLength = (input) => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/login/length', {
                    params: {
                        userid: input
                    }});
                console.log(response.data);
                setPwdLength(response.data);
                speakPwdChecking(response.data, true, 0);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    //랜덤 인덱스 2개에 대한 비밀번호 검증
    const checkPwd = (idx1, idx2, input) => {
        const fetchData = async () => {

            //음성 입력 값의 공백제거, 소문자화, 각각의 글자 2개로 쪼개는 작업
            var str = input.replace(/(\s*)/g, "").toLowerCase();
            var ch1 = str.substr(0,1);
            var ch2 = str.substr(1,1);

            try{
                //첫번째 글자 검증
                const response1 = await axios.get('https://springservertest.herokuapp.com/login/check', {
                    params: {
                        userid: id,
                        index: idx1,
                        input: ch1
                    }});
                    console.log("1차 비밀번호 검증 결과: "+response1.data);
                if(response1.data === 1){ //첫번째 글자 통과시 두번째 글자 검증
                    const response2 = await axios.get('https://springservertest.herokuapp.com/login/check', {
                    params: {
                        userid: id,
                        index: idx2,
                        input: ch2
                    }});
                    console.log("2차 비밀번호 검증 결과: "+response2.data);
                    if(response2.data === 1){ //두번째 글자까지 통과하면 카운터 1 감소시키고 검증 작업 반복
                        if(pwdCheckCnt-1 === 0){ // 로그인 성공 시
                            setSpeakOnce(false);
                            setMsg("로그인이 완료되었습니다. 메인 페이지로 돌아갑니다.");
                            console.log("로그인 성공");
                            setLoginSuccess(true);
                            setSpeakOnce(true);
                        }
                        else{
                            setPwdCheckCnt(pwdCheckCnt-1);
                            speakPwdChecking(pwdLength, true, -1, -1);
                        }
                    }
                    else{ //두번째 글자 통과 실패 시 같은 인덱스로 재검증
                        speakPwdChecking(pwdLength, false, idx1, idx2);
                    }
                }
                else{ //첫번째 글자 통과 실패 시  같은 인덱스로 재검증
                    speakPwdChecking(pwdLength, false, idx1, idx2);
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    const rand = (length, checkIdx) =>{
        var idx;
        do{
            idx = Math.floor(Math.random()*length) + 1;
        }
        while (idx == checkIdx)
        return idx;
    }

    // 랜덤 인덱스를 생성하여 사용자에게 비밀번호 글자를 말하도록 고지
    const speakPwdChecking = (pwdLength, isPass, falseIdx1, falseIdx2) => {
        if(pwdLength === -1){ // 서버에 없는 아이디를 말했을 경우
            setSpeakOnce(false);
            setMsg("해당 아이디가 존재하지 않습니다. 다시 말씀해주세요.");
            setNextField("id"); //id 입력과정으로 돌아감
            setSpeakOnce(true);
        }
        else{
            if(pwdCheckCnt > 0){ // 카운터가 0이상일 때
                setSpeakOnce(false);
                //랜덤 인덱스 2개 생성
                var rndNum1 = rand(pwdLength, -1);
                var rndNum2 = rand(pwdLength, rndNum1);
                if(isPass){ // 이전 검증을 통과했을 때 -> 랜덤 생성한 인덱스 사용
                    setMsg("비밀번호의 "+rndNum1+"번째 글자와 " + rndNum2+"번째 글자를 순서대로 말씀해주세요.");
                    setRndIdx({first: rndNum1, second: rndNum2});
                } 
                else{ //이전 검증을 통과하지 못했을 때 -> 이전 인덱스를 그대로 사용
                    setMsg("비밀번호가 일치하지 않습니다. 비밀번호의 "+falseIdx1+"번째 글자와 " + falseIdx2+"번째 글자를 순서대로 말씀해주세요.");
                    setRndIdx({first: falseIdx1, second: falseIdx2});
                } 
                setNextField("pwd") // 비밀번호 입력 과정으로 넘어감
                setSpeakOnce(true);
            }
        }
    };

    useEffect(()=>{
        if(fieldValue !== ""){
            switch(nextField){
                case "id": //아이디 입력과정
                    setSpeakOnce(false);
                    var tempID = (fieldValue).replace(/(\s*)/g, "").toLowerCase();
                    console.log("아이디: " + tempID);
                    setId(tempID);
                    getPwdLength(tempID);
                    break;
                case "pwd": //비밀번호 입력과정
                    checkPwd(rndIdx.first, rndIdx.second, fieldValue);
                    break;
                case "done": //로그인 성공 시
                    break;
                default:
                    break;
            }    
        }
        // setCnt(cnt+1);
    }, [fieldValue]);

    //3번의 비밀번호 확인을 모두 통과했을 때
    // useEffect(()=>{
    //     if(pwdCheckCnt === 0){
    //         setSpeakOnce(false);
    //         setMsg("로그인이 완료되었습니다. 메인 페이지로 돌아갑니다.");
    //         props.loginIDInput(id);
    //         console.log("로그인 성공");
    //         setLoginSuccess(true);
    //         setSpeakOnce(true);
    //     }
    // }, [pwdCheckCnt]);
    
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
        console.log("pwdLength 업데이트 됨: "+pwdLength);
    }, [pwdLength]);
    useEffect(()=>{
        console.log("nextField 업데이트 됨: "+nextField);
    }, [nextField]);
    useEffect(()=>{
        console.log("rndIdx 업데이트 됨: "+rndIdx);
    }, [rndIdx]);
    useEffect(()=>{
        console.log("pwdCheckCnt 업데이트 됨: "+pwdCheckCnt);
    }, [pwdCheckCnt]);
    useEffect(()=>{
        console.log("isSpeakDone 업데이트 됨: "+isSpeakDone);
    }, [isSpeakDone]);
    useEffect(()=>{
        console.log("loginSuccess 업데이트 됨: "+loginSuccess);
    }, [loginSuccess]);

    const btnRead = (e) => {
        setIsSpeakDone(false);
        speak(msg , {
            rate: 1.1,
            pitch: 1.0,
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
        speechMsg.rate = prop.rate || 1.1 // 속도: 0.1 ~ 10      
        speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
        speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
        speechMsg.text = text

        speechMsg.onend = function(){
            if(loginSuccess){
                props.loginIDInput(id);
                props.nextActionInput("");
                history.push({pathname: "/"});
            }
            else{
                setIsSpeakDone(true);
            }
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    return (
        <div>
            <Header 
                nowPage={"LoginPage"} 
                loginID={props.loginID} 
                voiceInput={props.voiceInput} 
                isSpeakDone={isSpeakDone} 
                loginFieldValueInput={setFieldValue}
                />
            <div className="Container">
                <LoginArea />
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default LoginPage; 
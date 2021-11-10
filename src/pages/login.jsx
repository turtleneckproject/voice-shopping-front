import React ,{ useEffect, useState } from 'react';
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import LoginArea from '../component/LoginArea';

const LoginPage = (props) => {

    var voices = window.speechSynthesis.getVoices();
    const [msg, setMsg] = useState("로그인을 시작합니다. 아이디를 말씀해주세요. ");
    const [id, setId] = useState("");
    const [pwdLength, setPwdLength] = useState(0);
    const [pwdCheckCnt, setPwdCheckCnt] = useState(5);
    const [rndIdx, setRndIdx] = useState(-1);
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(true);
    const [fieldValue, setFieldValue] = useState("");
    const [nextField, setNextField] = useState("id");

    const getPwdLength = (input) => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/login/length', {
                    params: {
                        userid: input
                    }});
                setPwdLength(response.data);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    const checkPwd = (input, idx) => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/login/check', {
                    params: {
                        userid: id,
                        index: idx,
                        input: input
                    }});
                return(response.data);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    const rand = (length) =>{
        return Math.floor(Math.random()*length) + 1;
    }

    const speakPwdChecking = () => {
        if(pwdLength == -1) setNextField("no_id_exist");
        else{
            if(pwdCheckCnt > 0){
                setNextField("continue");
                setSpeakOnce(false);
                var rndNum = rand(pwdLength);
                console.log("랜덤 인덱스: "+rndNum);
                setMsg("비밀번호의 "+rndNum+"번째 글자를 말씀해주세요.")
                setRndIdx(rndNum);
                setNextField("pwd")
                setSpeakOnce(true);
            }
        }
    };

    useEffect(()=>{
        if(fieldValue !== ""){
            switch(nextField){
                case "id":
                    setSpeakOnce(false);
                    var tempID = (props.voice).replace(/(\s*)/g, "").toLowerCase();
                    console.log("아이디: " + tempID);
                    setId(tempID);
                    getPwdLength(tempID);
                    speakPwdChecking();
                    // setMsg("알파벳, 숫자 혹은 둘을 조합한 비밀번호를 말씀해주세요.");
                    break;
                case "pwd":
                    var result = checkPwd(fieldValue, rndIdx, props.voice);
                    if(result === 1){
                        setPwdCheckCnt(pwdCheckCnt-1);
                        speakPwdChecking();
                    }
                    else{
                        setMsg("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
                        setSpeakOnce(true);
                        speakPwdChecking();
                    }
                    break;
                case "no_id_exist":
                    setSpeakOnce(false);
                    setMsg("해당 아이디가 존재하지 않습니다. 다시 말씀해주세요.");
                    setNextField("id");
                    setSpeakOnce(true);
                    break;
                case "done":
                    break;
                default:
                    break;
            }    
        }
        // setCnt(cnt+1);
    }, [fieldValue, nextField]);

    //5번의 비밀번호 확인을 모두 통과했을 때
    useEffect(()=>{
        if(pwdCheckCnt === 0)
        alert("로그인 성공");
    }, [pwdCheckCnt]);
    
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
        console.log(pwdLength);
        console.log(nextField);
    }, [pwdLength, nextField]);

    const btnRead = (e) => {

        speak(msg , {
            rate: 1.0,
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

        setIsSpeakDone(false);
        const speechMsg = new SpeechSynthesisUtterance()
        speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
        speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
        speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
        speechMsg.text = text

        speechMsg.onend = function(){
            setIsSpeakDone(true);
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    return (
        <div>
            <Header nowPage={"LoginPage"} voiceInput={props.voiceInput} isSpeakDone={isSpeakDone} loginFieldValueInput={setFieldValue}/>
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
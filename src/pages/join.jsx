import React ,{ useEffect, useState } from 'react';
import { useHistory } from "react-router";
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import JoinArea from '../component/JoinArea';
import { prop } from 'cheerio/lib/api/attributes';

const JoinPage = (props) => {
    const history= useHistory();
    var voices = window.speechSynthesis.getVoices();
    const [joinId, setJoinId] = useState("");
    const [joinPwd, setJoinPwd] = useState("");
    const [joinForm, setJoinForm] = useState({
        id: "",
        pwd: ""
    })
    const [msg, setMsg] = useState("회원가입을 시작합니다. 보안을 위해 이어폰 착용을 권장하며, 모든 글자의 대소문자는 구분하지 않습니다. 사용할 아이디를 말씀해주세요. ");
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(true);
    const [fieldValue, setFieldValue] = useState(""); //음성인식으로 받아온 raw 데이터
    const [nextField, setNextField] = useState("id"); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [joinSuccess, setJoinSuccess] = useState(false);

    const handleFormInput = (input) => {
        setJoinForm({
            id: input.id,                                                                                                                                                                                                                                                                                                                                                                                                                       
            pwd: input.pwd
        });
    }

    const handleJoinFieldValueInput = (input) => {
        setFieldValue(input);
    }

    const callJoinApi = (id, pwd) => {
        const fetchData = async () => {
            try{
                const response = await axios.post('https://springservertest.herokuapp.com/register', {
                    id: id,
                    pwd: pwd
                    });
                console.log(response.data);
                const result = response.data;
                if(result === 1){
                    setMsg("회원가입이 완료되었습니다. 메인페이지로 돌아갑니다.");
                    setJoinSuccess(true);
                    setSpeakOnce(true);
                }
                else if(result === -1){
                    setMsg("이미 등록된 아이디입니다. 사용할 아이디를 다시 말씀해주세요.");
                    setNextField("id");
                    setSpeakOnce(true);
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    const convertToJson = (input) => {
        let jsonData = JSON.stringify(input);
        console.log(jsonData);
    }

    const convertStr = (input) => {
        var resultStr = "";
        var strLen = input.length;

        for(var i=0; i<strLen; i++){
            var tmp = input.substr(i,1);
            if(tmp == ';') resultStr += tmp;
            else resultStr += (tmp + ';');
        }
        console.log(resultStr);
        return resultStr;
    }

    useEffect(()=>{
        console.log("저장된 아이디: " + joinForm.id);
        console.log("저장된 비밀번호: " + joinForm.pwd);
    }, [joinForm]);

    useEffect(()=>{
        if(fieldValue !== ""){
            switch(nextField){
                case "id":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("사용하실 비밀번호를 말씀해주세요.");
                            setNextField("pwd");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg("사용하실 아이디를 말씀해주세요.");
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempID = (props.voice).replace(/(\s*)/g, "").toLowerCase();
                            var tempID2 = convertStr(tempID);
                            console.log("아이디: " +tempID);
                            setJoinId(tempID);
                            setMsg(`입력된 아이디는 "`+tempID2+`" 입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "pwd":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            console.log("ID: "+joinId +", Password: "+joinPwd);
                            setJoinForm({id:joinId, pwd: joinPwd});
                            callJoinApi(joinId, joinPwd);
                            console.log("호출완료");
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg("사용하실 비밀번호를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempPWD = (props.voice).replace(/(\s*)/g, "").toLowerCase();
                            var tempPWD2 = convertStr(tempPWD);
                            console.log("비밀번호: " +tempPWD);
                            setJoinPwd(tempPWD);
                            setMsg("입력된 비밀번호는 "+tempPWD2+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "done":
                    break;
                default:
                    break;
            }    
        }
        // setCnt(cnt+1);
    }, [fieldValue, nextAction]);

    useEffect(()=>{
        setNextAction(props.nextAction);
    }, [props.nextAction]);

    useEffect(()=>{
        console.log(nextField);
    },[nextField]);

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
            if(joinSuccess) history.push({pathname: `/`});
            setIsSpeakDone(true);
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    return (
        <div>
            <Header nowPage={"JoinPage"} voiceInput={props.voiceInput} nextActionInput={props.nextActionInput} isSpeakDone={isSpeakDone} joinFieldValueInput={handleJoinFieldValueInput}/>
            <div className="Container">
                <JoinArea joinFormInput={handleFormInput} />
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default JoinPage; 
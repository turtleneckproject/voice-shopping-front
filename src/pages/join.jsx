import React ,{ useEffect, useState } from 'react';
import { useHistory } from "react-router";
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import JoinArea from '../component/JoinArea';

const JoinPage = (props) => {
    const history= useHistory();
    var voices = window.speechSynthesis.getVoices();
    const [joinId, setJoinId] = useState("");
    const [joinPwd, setJoinPwd] = useState("");
    const [joinName, setJoinName] = useState("");
    const [joinAddress, setJoinAddress] = useState("");
    const [joinCardComp, setJoinCardComp] = useState(null);
    const [joinCardNum, setJoinCardNum] = useState(null);
    const [joinForm, setJoinForm] = useState({
        id: "",
        pwd: "",
        name: "",
        address: "",
        card_company: null,
        card_num: null
    })
    const [msg, setMsg] = useState("회원가입을 시작합니다. 보안을 위해 이어폰 착용을 권장하며, 모든 글자의 대소문자는 구분하지 않습니다. 사용할 아이디를 말씀해주세요. ");
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(true);
    const [fieldValue, setFieldValue] = useState(""); //음성인식으로 받아온 raw 데이터
    const [nextField, setNextField] = useState("id"); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [joinSuccess, setJoinSuccess] = useState(false);
    const [cardPwd, setCardPwd] = useState("");
    const [rndIdx, setRndIdx] = useState({first: -1, second: -1}); // 랜덤으로 물어볼 비밀번호의 인덱스

    const handleFormInput = (input) => {
        setJoinForm({
            id: input.id,                                                                                                                                                                                                                                                                                                                                                                                                                       
            pwd: input.pwd
        });
    }

    const handleJoinFieldValueInput = (input) => {
        setFieldValue(input);
    }

    const checkID = (input) => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://springservertest.herokuapp.com/register/check',{
                    params:{
                        checkid: input
                    }
                });
                console.log("아이디 중복체크 결과: "+response.data);
                if(response.data === -1){
                    setMsg("이미 등록된 아이디입니다. 사용할 아이디를 다시 말씀해주세요.");
                    setNextField("id");
                    setSpeakOnce(true);
                }
                else if(response.data === 1){
                    setMsg("사용 가능한 아이디입니다. 사용하실 비밀번호를 말씀해주세요.");
                    setNextField("pwd");
                    setSpeakOnce(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }

    const callJoinApi = () => {
        const fetchData = async () => {
            try{
                const response = await axios.post('https://springservertest.herokuapp.com/register', {
                    id: joinId,
                    pwd: joinPwd,
                    name: joinName,
                    address: joinAddress
                    });
                console.log(response.data);
                const result = response.data;
                if(result === 1){
                    await axios.post('https://springservertest.herokuapp.com/card/pluscard', {
                        userid: joinId,
                        cardcompany: joinCardComp,
                        card_num: joinCardNum,
                        pwd : cardPwd
                    });
                    setJoinSuccess(true);
                }
                else if(result === -1){
                    setJoinSuccess(true);
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
        
    const rand = (checkIdx) =>{
        var idx;
        do{
            idx = Math.floor(Math.random()*4) + 1;
        }
        while (idx == checkIdx)
        return idx;
    }

    // useEffect(()=>{
    //     console.log("저장된 아이디: " + joinForm.id);
    //     console.log("저장된 비밀번호: " + joinForm.pwd);
    // }, [joinForm]);

    useEffect(()=>{
        if(fieldValue !== ""){
            switch(nextField){
                case "id":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            checkID(joinId);
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
                            setMsg("이름을 말씀해주세요.");
                            setNextField("name");
                            setSpeakOnce(true);
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
                case "name":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("주소 등록을 시작합니다. 주소는 도로명 주소 사용을 권장합니다. 등록하실 주소를 말씀해주세요.");
                            setNextField("address");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg("이름을 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            console.log("이름: " +props.voice);
                            setJoinName(props.voice);
                            setMsg("입력된 이름은 "+props.voice+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "address":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg(`주로 사용할 카드 정보를 등록합니다. 회원가입 단계에서 카드 정보 입력은 생략 가능합니다. 생략하시려면 "생략"이라고 말씀해주세요. 입력하시려면 카드사를 말씀해주세요.`);
                            setNextField("card_company");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg("등록할 주소를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempAddr = convertStr(props.voice);
                            console.log("주소: " +tempAddr);
                            setJoinAddress(props.voice);
                            setMsg("확인을 위해 주소를 한글자씩 읽어드립니다. 입력된 주소는 "+tempAddr+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                            
                        default:
                            break;
                    }
                    break;
                case "card_company":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("카드 번호 16자리 중 첫번째 4자리를 말씀해주세요.");
                            setNextField("card_num1");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg("카드사를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            console.log("카드사: " +props.voice);
                            setJoinCardComp(props.voice);
                            setMsg("입력된 카드사는 "+props.voice+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        case "skip":
                            callJoinApi();  
                            setSpeakOnce(false);
                            setMsg(`카드 등록이 생략된 상태로 회원가입이 완료되었습니다. 잠시 후  처음 화면으로 돌아갑니다.`);
                            setSpeakOnce(true);
                            setTimeout(function () {
                                console.log("메인 화면 이동");
                                history.push({pathname: `/`}); 
                                }, 5000); 
                            break;
                        default:
                            break;
                    }
                    break;
                case "card_num1":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("카드 번호 16자리 중 두번째 4자리를 말씀해주세요.");
                            setNextField("card_num2");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setJoinCardNum(null);
                            setMsg("카드 번호 16자리 중 첫번째 4자리를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempNum1 = convertStr(props.voice);
                            console.log("카드 번호1: " + props.voice);
                            setJoinCardNum(props.voice);
                            setMsg(`입력된 첫번째 4자리 카드번호는 `+tempNum1+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "card_num2":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("카드 번호 16자리 중 세번째 4자리를 말씀해주세요.");
                            setNextField("card_num3");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            var num1 = joinCardNum.substr(0,4);
                            setJoinCardNum(num1);
                            setMsg("카드 번호 16자리 중 두번째 4자리를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempNum2 = convertStr(props.voice);
                            console.log("카드 번호2: " + props.voice);
                            setJoinCardNum(joinCardNum + props.voice);
                            setMsg(`입력된 두번째 4자리 카드번호는 `+tempNum2+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "card_num3":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg("카드 번호 16자리 중 네번째 4자리를 말씀해주세요.");
                            setNextField("card_num4");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            var num2 = joinCardNum.substr(0,8);
                            setJoinCardNum(num2);
                            setMsg("카드 번호 16자리 중 세번째 4자리를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempNum3 = convertStr(props.voice);
                            console.log("카드 번호3: "+props.voice);
                            setJoinCardNum(joinCardNum+props.voice);
                            setMsg(`입력된 세번째 4자리 카드번호는 `+tempNum3+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "card_num4":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg(`카드 번호 등록이 완료되었습니다. 카드 비밀번호를 말씀해주세요.`);
                            
                            setNextField("check_pwd");
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            var num3 = joinCardNum.substr(0,12);
                            setJoinCardNum(num3);
                            setMsg("카드 번호 16자리 중 네번째 4자리를 말씀해주세요.")
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempNum4 = convertStr(props.voice);
                            console.log("카드 번호4: "+props.voice);
                            setJoinCardNum(joinCardNum+props.voice);
                            setMsg(`입력된 네번째 4자리 카드번호는 `+tempNum4+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                            setSpeakOnce(true);
                            break;
                        default:
                            break;
                    }
                    break;
                case "check_pwd":
                    switch(nextAction){
                        case "next":
                            setSpeakOnce(false);
                            setMsg(`회원가입이 완료되었습니다. 처음 화면으로 돌아가시려면 "처음"이라고 말씀해주세요.`);
                            callJoinApi();
                            setSpeakOnce(true);
                            break;
                        case "again":
                            setSpeakOnce(false);
                            setMsg(`카드 비밀번호를 말씀해주세요.`)
                            setSpeakOnce(true);
                            break;
                        case "normal":
                            setSpeakOnce(false);
                            var tempCard = convertStr(props.voice);
                            console.log("카드 비밀번호: "+props.voice);
                            setCardPwd(props.voice);
                            setMsg(`입력된 카드 비밀번호는 `+tempCard+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
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
        console.log("joinId 업데이트 됨: " + joinId);
    }, [joinId]);
    useEffect(()=>{
        console.log("joinPwd 업데이트 됨: " + joinPwd);
    }, [joinPwd]);
    useEffect(()=>{
        console.log("joinName 업데이트 됨: " + joinName);
    }, [joinName]);
    useEffect(()=>{
        console.log("joinAddress 업데이트 됨: " + joinAddress);
    }, [joinAddress]);
    useEffect(()=>{
        console.log("joinCardComp 업데이트 됨: " + joinCardComp);
    }, [joinCardComp]);
    useEffect(()=>{
        console.log("joinCardNum 업데이트 됨: " + joinCardNum);
    }, [joinCardNum]);

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
        setIsSpeakDone(false);
        speak(msg , {
            rate: 1.2,
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
            <Header nowPage={"JoinPage"} loginID={props.loginID} voiceInput={props.voiceInput} nextActionInput={props.nextActionInput} isSpeakDone={isSpeakDone} joinFieldValueInput={handleJoinFieldValueInput}/>
            <div className="Container">
                <JoinArea joinFormInput={handleFormInput} id={joinId}/>
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default JoinPage; 
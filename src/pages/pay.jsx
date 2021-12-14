import React, { useEffect, useState } from "react";
import PayTitle from "../component/PayTitle";
import { useHistory } from "react-router";
import Header from "../component/Header";
import axios from "axios";
import '../component/Container.css';
import '../component/Footer.css';
import PayArea from "../component/PayArea";
import PayInfo from "../component/PayInfo";
import PayUser from "../component/PayUser";
import PayDeliver from "../component/PayDeliver";
import { add } from "cheerio/lib/api/traversing";

const PayPage = (props) => {
    const history= useHistory();
    var voices = window.speechSynthesis.getVoices();
    const [msg, setMsg] = useState("");
    const [fieldValue, setFieldValue] = useState(""); //음성인식으로 받아온 raw 데이터
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(false);
    const [nextField, setNextField] = useState("id"); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [products, setProducts] = useState([]);
    const [idx, setIdx] = useState(0); //물품 인덱스
    const [title, setTitle] = useState(); // 물품명
    const [price, setPrice] = useState(); // 물품 가격
    const [amount, setAmount] = useState(); //물품 수량
    const [totalPrice, setTotalPrice] = useState();
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [goMain, setGoMain] = useState(false);
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [count, setCount] = useState(0); //장바구니에 있는 총 물품 종류 수


    let tempTitle = [];
    let temp = [];
    let temp2 = [];
    let productPrice = ""
    let isPay = 1;

    const handleCartFieldValueInput = (input) => {
        setFieldValue(input);
    }


    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/payment/showpayment', {
                    params: {
                        customer: props.loginID
                    }});
                setProducts(response.data);
                const cart = response.data;
                const result = cart.map((product, index) => (product.price));
                setPrice(result);
                const result2 = cart.map((product, index) => (product.title));
                setTitle(result2);
                const result3 = cart.map((product, index) => (product.num));
                setAmount(result3);
                confirmUser();
                result.entries();
                let count1 = 0;
                let sum = 0;
                for(let i = 0; i <=10; i++){
                    tempTitle[i] = String(result2[i]);
                }
                for(let i = 0; i <=10; i++){
                    temp[i] = String(result[i]).replace(/,/g, "");
                    temp2[i] = parseInt(temp[i])
                    if(temp[i] != "undefined"){
                    count1 += 1;
                    setCount(count+1);
                    sum += parseInt(temp2[i])
                    }
                    console.log(count1);
                }
                productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setTotalPrice(productPrice);
                setCount(count1);
                if(count1 === 0){
                    setMsg("현재 결제내역에 물품이 존재하지 않습니다. 잠시 후 메인페이지로 돌아갑니다.");
                    setGoMain(true);
                }
                else{
                    setMsg(`결제내역입니다. 월별로 상품을 들으시려면 "월별 구분", 월과 날짜 별로 분류를 하려면 "날짜 구분", 날짜에 상관없이 상품을 들으시려면 "구분 없음"이라고 말씀해주세요. 모든 결제 내역을 지우려면 "내역 삭제"라고 말씀해주세요.`);
                    setNextField("info");
                    setSpeakOnce(true);
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    },[]);


    const showNormal = () => { // 결제 상품 default 정렬
        const fetchData = async () => {
            try{
                const response1 = await axios.get('https://springservertest.herokuapp.com/payment/showpayment', {
                    params: {
                        customer: props.loginID
                    }});
                setProducts(response1.data);
                console.log("타입"+typeof response1.data);

                const pay= response1.data;
                console.log("서버에서 넘어온 값2"+JSON.stringify(response1.data))
                console.log("결제 api"+pay)

                const result = pay.map((product, index) => (product.price));
                setPrice(result);

                const result2 = pay.map((product, index) => (product.title));
                setTitle(result2);

                const result3 = pay.map((product, index) => (product.num));
                setAmount(result3);

                result.entries();
                let sum = 0;

                for(let i = 0; i <=10; i++){
                    tempTitle[i] = String(result2[i]);
                    console.log("상품명"+tempTitle[i])
                }
        
                for(let i = 0; i < pay.length; i++){
                    temp[i] = String(result[i]).replace(/,/g, "");
                    console.log("상품 가격"+temp[i])
                    temp2[i] = parseInt(temp[i])
                    if(temp[i] != "undefined"){
                    sum += parseInt(temp2[i])*parseInt(result3[i]);
                    console.log("넘어온 개수"+result3[i])
                    }
                }
                productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setTotalPrice(productPrice);
                setSpeakOnce(false);
                setMsg("오늘까지 결제된 상품의 종류는 "+pay.length+"개이고 총 가격은 "+productPrice+'원입니다. 결제 품목을 확인하시려면 "상품 확인"이라고 말씀해주세요');
                setSpeakOnce(true);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    const showMonth = (month) => { // 결제 상품 월별 정렬 API
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/payment/showmonth', {
                    params: {    
                        customer : props.loginID,
                        buymonth : month
                    }});
                    const day = response.data;
                    const result = day.map((product, index) => (product.price));
                    setPrice(result);
                    const result2 = day.map((product, index) => (product.title));
                    setTitle(result2);
                    const result3 = day.map((product, index) => (product.num));
                    setAmount(result3);
                    result.entries();
                    let sum = 0;
    
                    for(let i = 0; i <=10; i++){
                        tempTitle[i] = String(result2[i]);
                        console.log("상품명"+tempTitle[i])
                    }
            
                    for(let i = 0; i < day.length; i++){
                        temp[i] = String(result[i]).replace(/,/g, "");
                        console.log("상품 가격"+temp[i])
                        temp2[i] = parseInt(temp[i])
                        if(temp[i] != "undefined"){
                        sum += parseInt(temp2[i])*parseInt(result3[i]);
                        console.log("넘어온 개수"+result3[i])
                        }
                    }
                    productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    setSpeakOnce(false);
                    setMsg(month+`월에 결제된 상품의 종류는 `+day.length+`개이고 총 가격은 `+productPrice+`원입니다. 결제 품목을 확인하시려면 "상품 확인"이라고 말씀해주세요. `);
                    setSpeakOnce(true);
                    console.log("결제 상품 월별 정렬"+response.data)
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
      }

    const showDate = (month, date) => { // 결제 상품 월별 + 날짜 정렬 API
    const fetchData = async () => {
        try{
            const response = await axios.get('https://springservertest.herokuapp.com/payment/showdate', {
                params: {    
                    customer : props.loginID,
                    buymonth : month,
                    buydate : date
                }});
                const day = response.data;
                const result = day.map((product, index) => (product.price));
                setPrice(result);
                const result2 = day.map((product, index) => (product.title));
                setTitle(result2);
                const result3 = day.map((product, index) => (product.num));
                setAmount(result3);
                result.entries();
                let sum = 0;

                for(let i = 0; i <=10; i++){
                    tempTitle[i] = String(result2[i]);
                    console.log("상품명"+tempTitle[i])
                }
        
                for(let i = 0; i < day.length; i++){
                    temp[i] = String(result[i]).replace(/,/g, "");
                    console.log("상품 가격"+temp[i])
                    temp2[i] = parseInt(temp[i])
                    if(temp[i] != "undefined"){
                    sum += parseInt(temp2[i])*parseInt(result3[i]);
                    console.log("넘어온 개수"+result3[i])
                    }
                }
                productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setSpeakOnce(false);
                setMsg(month+`월 `+date+`일에 결제된 상품의 종류는 `+day.length+`개이고 총 가격은 `+productPrice+`원입니다. 결제 품목을 확인하시려면 "상품 확인"이라고 말씀해주세요. `);
                setSpeakOnce(true);
                console.log("결제 상품 월별+날짜 정렬"+response.data)
        } catch(e){
            console.log(e);
        }
    };
    fetchData();
}

    const deletePay = () => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/user/cleardb', {       
                    params:{   
                        userid: props.loginID,         
                        flag: 1,
                    }
                });
                console.log("결제db 삭제"+response.data);
                setSpeakOnce(false);
                setMsg(`모든 결제 내역을 삭제하였습니다.`);
                isPay = 0;
                setTimeout(function () {
                    // 3초동안 카운트를 센다.
                    console.log("음성 입력 없이 3초가 지났습니다.");
                    setNextAction("comfirm_list");// 음성 입력 완전히 종료
                    }, 3000);
                setSpeakOnce(true);
                } catch(e){
                    console.log(e);
                }
            };
            fetchData();
        }
    const confirmUser = () => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/user/showinfo', {       
                    params:{            
                        userid: props.loginID
                    }
                });
            const user = response.data;
            setAddress(user.address);
            setName(user.name);
            } catch(e){
            console.log(e);
        }
    };
    fetchData();
}


useEffect(()=>{
    switch(nextField){
        case "info":
            switch(nextAction){
                case "month_part": // 월별 구분
                    setSpeakOnce(false);
                    setMsg(`확인하시려는 월을 입력해주세요. 예를 들어 12월에 구매한 상품 정보를 듣기 원하시면 "12월"라고 말씀하시면 됩니다.`);
                    setSpeakOnce(true);
                    var temp = props.voice.replace(/월/g,"")
                    setMonth(temp)
                    setNextField("month");
                    break;
                case "day_part": // 날짜 구분
                    setSpeakOnce(false);
                    setMsg(`확인하시려는 월을 입력해주세요. 예를 들어 5월에 구매한 상품 정보를 듣기 원하시면 "5월"라고 말씀하시면 됩니다.`);
                    var temp2 = props.voice.replace(/월/g,"")
                    setMonth(temp2)
                    setSpeakOnce(true);
                    setNextField("day");
                    break;
                case "no_part": // 구분 없음
                    showNormal();
                    break;
                case "comfirm_list":
                if (isPay == 0){
                    setSpeakOnce(false);
                    setMsg(`현재 결재 내역이 존재하지 않습니다. 처음 화면으로 돌아갑니다.`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        console.log("메인 화면 이동");
                        history.push({pathname: `/`}); 
                        }, 5000);
                }
                else if(idx < title.length-1){
                    setSpeakOnce(false);
                    setMsg(title[idx]+"상품의 가격은 "+ price[idx] + `원이고 수량은 `+amount[idx]+`개입니다. 다음 상품을 들으려면 "다음"이라고 말씀해주세요. 모든 결제 내역을 지우려면 "내역 삭제"라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
                else {
                    setSpeakOnce(false);
                    setMsg(`마지막 상품명은 `+title[idx]+"이고 가격은 "+ price[idx] + `원, 수량은 `+amount[idx]+`개입니다. 처음 화면으로 돌아가려면 "처음"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
                break;
                case "next_item":
                    setIdx(idx+1);
                    setNextAction("comfirm_list"); 
                    break;

                case "first":
                    setIdx(0);
                    console.log("메인")
                    history.push({pathname: `/`}); 
                    break;
                case "delete":
                    deletePay();
                    break;
                default:
                    break;
            }
            break;
        case "month":
            switch(nextAction){
                case "normal":
                    setSpeakOnce(false);
                    showMonth(month);
                    break;
                case "comfirm_list":
                if (isPay == 0){
                    setSpeakOnce(false);
                    setMsg(`현재 결재 내역이 존재하지 않습니다. 처음 화면으로 돌아갑니다.`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        console.log("메인 화면 이동");
                        history.push({pathname: `/`}); 
                        }, 5000);
                }
                else if(idx < title.length-1){
                    setSpeakOnce(false);
                    setMsg(title[idx]+"상품의 가격은 "+ price[idx] + `원이고 수량은 `+amount[idx]+`개입니다. 다음 상품을 들으려면 "다음"이라고 말씀해주세요. 모든 결제 내역을 지우려면 "내역 삭제"라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
                else {
                    setSpeakOnce(false);
                    setMsg(`마지막 상품명은 `+title[idx]+"이고 가격은 "+ price[idx] + `원, 수량은 `+amount[idx]+`개입니다. 처음 화면으로 돌아가려면 "처음"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
                break;
                case "next_item":
                    setIdx(idx+1);
                    setNextAction("comfirm_list"); 
                    break;
                case "first":
                    setIdx(0);
                    console.log("메인")
                    history.push({pathname: `/pay`}); 
                    break;
                case "delete":
                    deletePay();
                    break;
                    default:
                        break;
                }
                break;
        case "day":
            switch(nextAction){
                case "normal":
                    setSpeakOnce(false);
                    setMsg(`확인하시려는 날짜를 입력해주세요. 예를 들어 7일에 구입한 상품 정보를 듣기 원하시면 “7일”이라고 말씀하시면 됩니다.`);
                    var temp = props.voice.replace(/일/g,"")
                    setDate(temp)
                    setSpeakOnce(true);
                    setTimeout(function () { 
                        setNextField("days");
                        setNextAction("month_next");
                    }, 11000);
                    break;

                default:
                    break;
            }
            break;
        case "days":
            switch(nextAction){
                case "month_next":   
                    console.log(props.voice)
                    showDate(month, date);
                    break;           

                case "comfirm_list":
                    if (isPay == 0){
                        setSpeakOnce(false);
                        setMsg(`현재 결재 내역이 존재하지 않습니다. 처음 화면으로 돌아갑니다.`);
                        setSpeakOnce(true);
                        setTimeout(function () {
                            console.log("메인 화면 이동");
                            history.push({pathname: `/`}); 
                            }, 5000);
                    }
                    else if(idx < title.length-1){
                        setSpeakOnce(false);
                        setMsg(title[idx]+"상품의 가격은 "+ price[idx] + `원이고 수량은 `+amount[idx]+`개입니다. 다음 상품을 들으려면 "다음"이라고 말씀해주세요. 모든 결제 내역을 지우려면 "내역 삭제"라고 말씀해주세요.`);
                        setSpeakOnce(true);
                    }
                    else {
                        setSpeakOnce(false);
                        setMsg(`마지막 상품명은 `+title[idx]+"이고 가격은 "+ price[idx] + `원, 수량은 `+amount[idx]+`개입니다. 처음 화면으로 돌아가려면 "처음"이라고 말씀해주세요.`);
                        setSpeakOnce(true);
                    }
                    break;
                case "next_item":
                    setIdx(idx+1);
                    setNextAction("comfirm_list"); 
                    break;
                case "first":
                    setIdx(0);
                    console.log("메인")
                    history.push({pathname: `/`}); 
                    break;
                case "delete":
                    deletePay();
                    break;
                default:
                    break;
                }
                break;
            default:
                break;
    }
}, [nextAction]);

    useEffect(()=>{
        setNextAction(props.nextAction);
        console.log(nextAction);
    }, [props.nextAction]);

    useEffect(()=>{
        console.log(nextField);
    },[nextField]);

    useEffect(()=>{
        console.log(price);
    }, [price]);

    useEffect(()=>{
        console.log(amount);
    }, [amount]);

    useEffect(()=>{
        console.log(idx); 
    }, [idx]);

    useEffect(()=>{
        if(goMain){
            setSpeakOnce(true);
        }
    },[goMain]);

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

        setIsSpeakDone(false);
        const speechMsg = new SpeechSynthesisUtterance()
        speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
        speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
        speechMsg.voice = voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
        speechMsg.text = text

        speechMsg.onend = function(){
            if(goMain === true){
                setTimeout(function () { 
                    props.nextActionInput("");
                    history.push({pathname: `/`});
                }, 3000);
            }
            else
                setIsSpeakDone(true);
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    return (
    <div>
        <Header nowPage={"PayPage"} voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput} payFieldValueInput={handleCartFieldValueInput}/>
        <div className="Container">
            <PayTitle />
            {products.map((product, index) => (
                <PayInfo idx={index} num={product.num} key={product.index} info={product} voice={props.voice} nextAction={props.nextAction} />
            ))}            
            <PayDeliver address = {address} name = {name} nextAction={props.nextAction}/>
            <PayArea price = {totalPrice} nextAction={props.nextAction}/>

        </div>
        <footer>
            <p>Footer Area</p>
        </footer>
    </div>
    );
};
export default PayPage;
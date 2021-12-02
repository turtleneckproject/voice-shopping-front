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
import { useLocation } from 'react-router';

const PayPage = (props) => {
    const history= useHistory();
    const [payCard, setPayCard] = useState("");
    var voices = window.speechSynthesis.getVoices();
    const location = useLocation();
    const [cardForm, setCardForm] = useState({
        card: "",
        pwd: ""
    })
    const [info, setInfo] = useState({
        image: "",
        title: "",
        mallName: "",
        id: 0,
        price: 0,
        maker: "",
        brand: "",
        nums: []
    });
    
    const [msg, setMsg] = useState("");
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(false);
    const [fieldValue, setFieldValue] = useState(""); //음성인식으로 받아온 raw 데이터
    const [nextField, setNextField] = useState("id"); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [cardSuccess, setCardSuccess] = useState(false);
    const [products, setProducts] = useState([]);
    const [cards, setCards] = useState([]);
    const [info2, setInfo2] = useState();
    // const [num, setNum] = useState(0);
    // setNum(parseInt(info.priceList[0]) + parseInt(info.priceList[1]));

    let tempTitle = [];
    let temp = [];
    let temp2 = [];
    let productPrice = ""

    const handlePayFieldValueInput = (input) => {
        setFieldValue(input);
    }

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response1 = await axios.get('https://springservertest.herokuapp.com/basket/showbasket', {
                    params: {
                        customer: props.loginID
                    }});
                setProducts(response1.data);
                const cart = response1.data;
                const result = cart.map((product, index) => (product.price));
                const result2 = cart.map((product, index) => (product.title));
                const result_num = cart.map((product, index) => (product.num));
                result.entries();
                let count = 0;
                let sum = 0;
                for(let i = 0; i <=10; i++){
                    tempTitle[i] = String(result2[i]);
                }
                for(let i = 0; i <=10; i++){
                    temp[i] = String(result[i]).replace(/,/g, "");
                    temp2[i] = parseInt(temp[i])
                    if(temp[i] != "undefined"){
                    count += 1;
                    sum += parseInt(temp2[i])
                    console.log("넘어온 개수"+info.nums[i])
                    }
                    console.log(count);
                }
                productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setInfo2(productPrice)
                setMsg("결제페이지입니다. 상품의 종류는 "+count+"개이고 총가격은 "+productPrice+"원입니다. 결제 카드를 확인하려면 카드 확인이라고 말씀해주세요.");
                setSpeakOnce(true);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const registerCard = () => {
        const fetchData = async () => {
            try{
                const response2 = await axios.get('https://springservertest.herokuapp.com/card/checkcard', {
                    params: {
                        userid: props.loginID
                    }});
                    console.log("카드 확인"+response2.data);
                if(response2.data === 1){
                    const response3 = await axios.get('https://springservertest.herokuapp.com/card/showcard', {
                        params: {
                            userid: props.loginID
                        }});
                        let card = response3.data;
                        const result = card.map((product, index) => (product.card_num));
                        result[0] = result[0].replace(/ +/gi, "");
                        let resultStr = "";
                        const leng = result[0].length;
                        for(let i=1; i<=leng; i++){
                            let str = result[0].substr(i-1 ,1);
                            resultStr += (str + ",");
                        }
                        const result2 = card.map((product, index) => (product.card_company));

                        console.log("카드 반환"+JSON.stringify(response3.data));
                        setMsg("등록된 카드의 카드회사는 "+result2[0]+"이고 카드번호는 "+resultStr+"입니다. 맞다면 결제하기라고 말씀해주세요.");
                        setSpeakOnce(true);
                }
                else if (response2.data === -1){
                    const response4 = await axios.post('https://springservertest.herokuapp.com/card/pluscard', {
                        params: {
                            userid: props.loginID,
                            card_company: "삼성",
                            card_num: "00123"
                        }});
                        console.log("카드 추가"+response4.data);
                        setMsg("등록된 카드가 없습니다. 등록하실 카드 번호를 말씀해주세요.");
                        setSpeakOnce(true);
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    useEffect(()=>{
        setNextAction(props.nextAction);
    }, [props.nextAction]);

    useEffect(()=>{
        console.log(nextField);
    },[nextField]);

    useEffect(()=>{
        console.log("받아온 값2: " , location.state);
        setInfo({
            image: location.state.image,
            title: location.state.title,
            mallName: location.state.mallName,
            id: location.state.id,
            price: location.state.price,
            maker: location.state.maker,
            brand: location.state.brand,
            nums: location.state.nums
        });
    },[location.state]);

    useEffect(()=>{
        switch(props.nextAction){
            case "comfirm_card": // "카드 확인"이 인식될 경우 장바구니에 추가하는 api 호출
            registerCard();
                break;
            case "comfirm_pay":
                setMsg("결제가 완료되었습니다. 처음 화면으로 돌아갑니다.");
                setSpeakOnce(true);
                setTimeout(function () {
                    // 3초동안 카운트를 센다.
                    console.log("결제 종료");
                    history.push({pathname: `/`}); // 결제 종료
                  }, 4000);
            default:
                break;
        }
    }, [props.nextAction]);

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
            setIsSpeakDone(true);
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    return (
    <div>
        <Header nowPage={"PayPage"} voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput}/>
        <div className="Container">
            <PayTitle />
            {products.map((product, index) => (
                <PayInfo idx={index} num={product.num} key={product.index} info={product} voice={props.voice} nextAction={props.nextAction} />
            ))}            
            <PayUser />
            <PayDeliver />
            <PayArea price = {info2} productInfo={info} nextAction={props.nextAction}/>

        </div>
        <footer>
            <p>Footer Area</p>
        </footer>
    </div>
    );
};
export default PayPage;
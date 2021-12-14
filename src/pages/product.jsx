import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumbs from "../component/Breadcrumbs";
import Header from "../component/Header";
import '../component/Container.css';
import '../component/Footer.css';
import ProductSerialArea from "../component/ProductSerialArea";
import ProductOrderArea from "../component/ProductOrderArea";
import TabMenuArea from "../component/TabMenuArea";
import MainContent from "../component/MainContent";
import { useLocation } from "react-router";

const ProductPage = (props) => {
    var voices = window.speechSynthesis.getVoices();
    const location = useLocation();
    const [info, setInfo] = useState({
        imgSrc: "",
        title: "",
        mallName: "",
        id: 0,
        price: 0,
        maker: "",
        brand: ""
    });
    const [msg, setMsg] = useState("");
    const [isSet, setIsSet] = useState(false);
    const [speakOnce, setSpeakOnce] = useState(false);
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수

    // 현재 상품을 장바구니에 추가
    const addCart = () => {
        const fetchData = async () => {
            try{
                const response = await axios.post('https://springservertest.herokuapp.com/basket/plusitem', {
                    customer: props.loginID,
                    title: info.title,
                    image: info.imgSrc,
                    price: info.price,
                    pid: info.id
                    });
                if(response.data === 1){
                    console.log("장바구니에 추가 완료");
                    setMsg(`상품이 장바구니에 추가 되었습니다. 장바구니로 이동하시려면 "이동"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    // 이전 페이지에서 넘겨준 상품정보를 저장
    useEffect(()=>{
        console.log("받아온 값: " , location.state);
        setInfo({
            imgSrc: location.state.imgSrc,
            title: location.state.title,
            mallName: location.state.mallName,
            id: location.state.id,
            price: location.state.price,
            maker: location.state.maker,
            brand: location.state.brand
        });
        setMsg(location.state.title + "상품입니다. 브랜드명은 " +location.state.brand+"이고 회사명은 " +location.state.maker+ "입니다. 가격은 " + location.state.price + `원입니다. 해당상품을 장바구니에 담으려면 "장바구니"라고 말씀해주세요.`);
        setSpeakOnce(true);
    },[location.state]);

    useEffect(()=>{
        switch(props.nextAction){
            case "put_cart": // "장바구니가 인식될 경우 장바구니에 추가하는 api 호출
                addCart();
                break;
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
            setIsSpeakDone(true);
        }

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }
    return (
        <div>
        <Header nowPage={"ProductPage"} loginID={props.loginID} voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput}/>
        <div className="Container">
            <Breadcrumbs />
            <ProductSerialArea productId={info.id}/>
            <ProductOrderArea productInfo={info} nextAction={props.nextAction}/>
            <TabMenuArea />
            <MainContent />
        </div>
        <footer>
            <p>Footer Area</p>
        </footer>
    </div>
    );
};

export default ProductPage; 


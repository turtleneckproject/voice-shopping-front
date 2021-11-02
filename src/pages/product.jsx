import React, { useEffect, useState } from "react";
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
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수

    useEffect(()=>{
        console.log("받아온 값: " , location.state);
        setIsSet(true);
        setInfo({
            imgSrc: location.state.imgSrc,
            title: location.state.title,
            mallName: location.state.mallName,
            id: location.state.id,
            price: location.state.price,
            maker: location.state.maker,
            brand: location.state.brand
        });
        setMsg(location.state.title + "상품입니다. 가격은 " + location.state.price + `원입니다.해당상품을 장바구니에 담으려면 "담기"라고 말씀해주세요.`);
    },[location.state]);

    useEffect(()=>{
        if(isSet){
            props.msgInput(msg);
            btnRead();
            setIsSet(false);
        }
        else{
            console.log("음성 출력되지 않음")
        }
    }, [info, isSet]);

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
        <Header voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput}/>
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


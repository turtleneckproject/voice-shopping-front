import React, { useEffect, useState } from "react";
import Breadcrumbs from "../component/Breadcrumbs";
import Header from "../component/Header";
import '../component/Container.css';
import '../component/Footer.css';
import ProductSerialArea from "../component/ProductSerialArea";
import ProductOrderArea from "../component/ProductOrderArea";
import TabMenuArea from "../component/TabMenuArea";
import MainContent from "../component/MainContent";
const ProductPage = ({location}) => {
    var voices = window.speechSynthesis.getVoices();
    const [info, setInfo] = useState({});

    useEffect(()=>{
        console.log("받아온 값: " , location.state);
        setInfo(location.state);
    },[location.state]);

    useEffect(()=>{
        btnRead();
    }, []);

    const btnRead = (e) => {

        speak(location.state.title + "상품입니다. 가격은 " + location.state.price + "원입니다." , {
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

        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }
    return (
    <div>
        <Header />
        <div className="Container">
            <Breadcrumbs />
            <ProductSerialArea productId={info.id}/>
            <ProductOrderArea productInfo={info}/>
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


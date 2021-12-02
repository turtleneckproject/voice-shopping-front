import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import CartTitle from '../component/CartTitle';
import CartArea from '../component/CartArea';
import { useLocation } from 'react-router';
import CartPrice from '../component/CartPrice';

const CartPage = (props) => {
    var voices = window.speechSynthesis.getVoices();
    const location = useLocation();
    const [info, setInfo] = useState({
        image: "",
        title: "",
        mallName: "",
        id: 0,
        price: 0,
        maker: "",
        brand: ""
    });
    
    const [msg, setMsg] = useState("");
    const [isSpeakDone, setIsSpeakDone] = useState(false); //음성출력이 끝났음을 알리는 변수
    const [speakOnce, setSpeakOnce] = useState(false);
    const [products, setProducts] = useState([]);
    const [fieldValue, setFieldValue] = useState(""); //음성인식으로 받아온 raw 데이터
    const [nextField, setNextField] = useState("info"); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [cards, setCards] = useState([]);
    const [nums2, setNums] = useState("");

    let tempTitle = [];
    let temp = [];
    let temp2 = [];
    let result_rowid = []

    const handleCartFieldValueInput = (input) => {
        setFieldValue(input);
    }

    useEffect(()=>{
        const fetchData = async () => {
            try{
                setInfo({
                    imgSrc: location.state.imgSrc,
                    title: location.state.title,
                    mallName: location.state.mallName,
                    id: location.state.id,
                    price: location.state.price,
                    maker: location.state.maker,
                    brand: location.state.brand
                });
                const response = await axios.get('https://springservertest.herokuapp.com/basket/showbasket', {
                    params: {
                        customer: props.loginID
                    }});
                setProducts(response.data);
                const cart = response.data;
                const result = cart.map((product, index) => (product.price));
                const result2 = cart.map((product, index) => (product.title));
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
                    }
                    console.log(count);
                }
                const productPrice = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setMsg("장바구니 페이지입니다. 장바구니에 담긴 상품의 종류는 "+count+"가지이고 총가격은 "+productPrice+"원입니다. 결제페이지로 이동하려면 결제페이지, 장바구니에 담긴 상품을 들으려면 상품듣기라고 말씀해주세요.");
                setSpeakOnce(true);
                console.log(props.voice);
                if(props.voice == "상품듣기" ||props.voice == "상품 듣기"){
                    setNextField("info");
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    },[]);

    const addPay = () => {
        const fetchData = async () => {
            try{
                const response = await axios.post('https://springservertest.herokuapp.com/payment/plusitem', {
                    customer: props.loginID,
                    title: info.title,
                    image: info.imgSrc,
                    price: info.price,
                    pid: info.id,
                    num: "1"
                    });
                console.log("결제페이지에 추가 완료");
                setSpeakOnce(true);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    
const deleteOne = (rowid) => { // 장바구니 물품 하나 삭제
    const fetchData = async () => {
        console.log(cards)
        try{
            const response_card = await axios.get('https://springservertest.herokuapp.com/basket/deleteone', {
                params: {      
                    rowid : rowid
                }});
            setSpeakOnce(true);
            if(response_card.data === 1){
                setSpeakOnce(false);
                console.log("삭제 성공");
                setMsg("물품을 삭제하였습니다");
                setSpeakOnce(true);
                setTimeout(function () {
                    // 3초동안 카운트를 센다.
                    console.log("음성 입력 없이 5초가 지났습니다.");
                    setNextAction("normal"); // 음성 입력 완전히 종료
                  }, 5000);

            }
            else if(response_card.data === -1){ //해당 rowid가 없을때
                setSpeakOnce(false);
                setMsg("삭제에 실패하였습니다.");
                setNextField("info");
                console.log("삭제 실패");
                setSpeakOnce(true);
            }
        } catch(e){
            console.log(e);
        }
    };
    fetchData();
  }
  
  const deleteAll = () => { // 장바구니 전체삭제
    const fetchData = async () => {
        try{
            const response = await axios.get('https://springservertest.herokuapp.com/basket/deleteall', {
                params: {    
                    customer : props.loginID
                }});
            if(response.data === 1){
                console.log("삭제 성공");
                setMsg("장바구니의 모든 물품을 삭제하였습니다. 찾으시는 상품명을 새로 말씀해주세요.");
                setSpeakOnce(true);
            }
            else if(response.data === -1){
                setSpeakOnce(false);
                setMsg("삭제에 실패하였습니다.");
                console.log("삭제 실패");
                setSpeakOnce(true);
            }
            setSpeakOnce(true);
        } catch(e){
            console.log(e);
        }
    };
    fetchData();
  }
  const result3 = products.map((product, index) => (product.price));
  const result4 = products.map((product, index) => (product.title));
  const result5 = products.map((product, index) => (product.num));
  result_rowid = products.map((product, index) => (product.rowid));
  
  useEffect(()=>{
    if(fieldValue !== ""){
        switch(nextField){
            case "info":
                switch(nextAction){
                    case "delete_one":
                        deleteOne(result_rowid[0]);
                        setSpeakOnce(true);
                        break;
                    case "delete_two":
                        deleteOne(result_rowid[1]);
                        setSpeakOnce(true);
                        break;
                    case "delete_three":
                        deleteOne(result_rowid[2]);
                        setSpeakOnce(true);
                        break;
                    case "delete_all":
                        deleteAll();
                        setSpeakOnce(true);
                        break;
                    case "one":
                        setSpeakOnce(false);
                        setMsg(`첫번째 상품은 `+result4[0]+'이고 가격은 '+result3[0]+"원, 수량은" +result5[0]+"개입니다. 다른 상품정보를 들으시려면 해당 번호를, 수량 변경은 수량 변경, 상품 삭제는 1 삭제 또는 하나 삭제라고 말씀해주세요.");
                        setSpeakOnce(true);
                        break;
                    case "one_modify":
                        setSpeakOnce(false);
                        setMsg(`원하시는 첫번째 상품 `+result4[0]+"의 수량을 1번 1개, 1번 2개와 같은 형식으로 말해주세요.");
                        setSpeakOnce(true);
                        break;
                    case "num_one_one":
                        result5[0] = 1
                        setSpeakOnce(false);
                        setMsg(`첫번째 상품 `+result4[0]+"의 수량이 "+result5[0]+"개로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "num_one_two":
                        result5[0] = 2
                        setSpeakOnce(false);
                        setMsg(`첫번째 상품 `+result4[0]+"의 수량이 "+result5[0]+"개로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "num_one_three":
                        result5[0] = 3
                        setSpeakOnce(false);
                        setMsg(`첫번째 상품 `+result4[0]+"의 수량이 "+result5[0]+"개로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "two":
                        setSpeakOnce(false);
                        setMsg(`두번째 상품명은 `+result4[1]+'이고 가격은 '+result3[1]+"원입니다. 다른 상품정보를 들으시려면 해당 번호를, 상품 삭제는 2 삭제라고 말씀해주세요.");
                        setSpeakOnce(true);
                        break;
                    case "two_modify":
                        setSpeakOnce(false);
                        setMsg(`원하시는 두번째 상품 `+result4[1]+"의 수량을 1개, 2개와 같은 형식으로 말해주세요.");
                        setSpeakOnce(true);
                        break;
                    case "num_two_one":
                        result5[1] = 1
                        setSpeakOnce(false);
                        setMsg(`두번째 상품 `+result4[1]+"의 수량이 "+result5[1]+"개로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "num_two_two":
                        result5[1] = 2
                        setSpeakOnce(false);
                        setMsg(`두번째 상품 `+result4[1]+"의 수량이 "+result5[1]+"개로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "num_two_three":
                        result5[1] = 3
                        setSpeakOnce(false);
                        setMsg(`두번째 상품 `+result4[1]+"의 수량이 "+result5[1]+"로 변경되었습니다.");
                        setSpeakOnce(true);
                        break;
                    case "three":
                        setSpeakOnce(false);
                        setMsg(`세번째 상품명은 `+result4[2]+'이고 가격은 '+result3[2]+"원입니다. 다른 상품정보를 들으시려면 해당 번호를, 상품 삭제는 3 삭제라고 말씀해주세요.");
                        setSpeakOnce(true);
                        break;
                    // case "three_modify":
                    //     setSpeakOnce(false);
                    //     result5[2] = props.voice.replace("개", "");
                    //     result5[2] = result5[2].replace("세번째 ", "");
                    //     setMsg(`세번째 상품 `+result4[2]+'의 수량이 '+result5[2]+"로 변경되었습니다. 다른 상품명 정보를 들으시려면 번호를 말해주시고 결제를 원하시면 결제페이지라고 말씀해주세요.");
                    //     setSpeakOnce(true);
                    //     break;
                    case "four":
                        setSpeakOnce(false);
                        setMsg(`네번째 상품명은 `+result4[3]+'이고 가격은 '+result3[3]+"원입니다. 다른 상품명 정보를 들으시려면 번호를 말해주세요.");
                        setSpeakOnce(true);
                        break;
                    // case "four_modify":
                    //     setSpeakOnce(false);
                    //     result5[3] = props.voice.replace("개", "");
                    //     result5[3] = result5[3].replace("네번째 ", "");
                    //     setMsg(`네번째 상품 `+result4[3]+'의 수량이 '+result5[3]+"로 변경되었습니다. 다른 상품명 정보를 들으시려면 번호를 말해주시고 결제를 원하시면 결제페이지라고 말씀해주세요.");
                    //     setSpeakOnce(true);
                    //     break;
                    case "five":
                        setSpeakOnce(false);
                        setMsg(`다섯번째 상품명은 `+result4[4]+'이고 가격은 '+result3[4]+"원입니다. 다른 상품명 정보를 들으시려면 번호를 말해주세요.");
                        setSpeakOnce(true);
                        break;
                    // case "five_modify":
                    //     setSpeakOnce(false);
                    //     result5[4] = props.voice.replace("개", "");
                    //     result5[4] = result5[4].replace("네번째 ", "");
                    //     setMsg(`다섯번째 상품 `+result4[4]+'의 수량이 '+result5[4]+"로 변경되었습니다. 다른 상품명 정보를 들으시려면 번호를 말해주시고 결제를 원하시면 결제페이지라고 말씀해주세요.");
                    //     setSpeakOnce(true);
                    //     break;
                    case "six":
                        setSpeakOnce(false);
                        setMsg(`여섯번째 상품명은 `+result4[5]+'이고 가격은 '+result3[5]+"원입니다. 다른 상품명 정보를 들으시려면 번호를 말해주세요.");
                        setSpeakOnce(true);
                        break;
                    // case "six_modify":
                    //     setSpeakOnce(false);
                    //     result5[5] = props.voice.replace("개", "");
                    //     result5[5] = result5[5].replace("네번째 ", "");
                    //     setMsg(`여섯번째 상품 `+result4[5]+'의 수량이 '+result5[5]+"로 변경되었습니다. 다른 상품명 정보를 들으시려면 번호를 말해주시고 결제를 원하시면 결제페이지라고 말씀해주세요.");
                    //     setSpeakOnce(true);
                    //     break;
                    case "normal":
                        setSpeakOnce(false);
                        setMsg(`원하시는 상품의 번호를 말씀해주세요. 예를들어 첫번째 상품을 보기를 원하시면 하나 또는 일이라고 말씀하시면 됩니다.`);
                        setSpeakOnce(true);
                        break;
                    default:
                        break;
                }
            // case "one_modify":
            //     switch(nextAction){
            //         case "normal":
            //             setSpeakOnce(false);
            //             setMsg(`첫번째 상품 `+result4[0]+"의 원하시는 수량을 말씀해주세요 ");
            //             setSpeakOnce(true);
            //             console.log(props.voice);
            //         break;
            //         case "one":
            //             setSpeakOnce(false);
            //             result5[0] = (props.voice).replace(/(\s*)/g, "");
            //             console.log(result5[0]);
            //             setMsg(`첫번째 상품 `+result4[0]+"의 수량이 "+result5[0]+"개로 변경되었습니다.");
            //             setSpeakOnce(true);
            //             break;
            //         default:
            //             break;
            //     }
            //     break;
            // case "pwd":
            //     switch(nextAction){
            //         case "next":
            //             setSpeakOnce(false);
            //             // console.log("ID: "+joinId +", Password: "+joinPwd);
            //             // setJoinForm({id:joinId, pwd: joinPwd});
            //             break;
            //         case "again":
            //             setSpeakOnce(false);
            //             setMsg("사용하실 비밀번호를 말씀해주세요.")
            //             setSpeakOnce(true);
            //             break;
            //         case "normal":
            //             setSpeakOnce(false);
            //             var tempPWD = (props.voice).replace(/(\s*)/g, "").toLowerCase();
            //             var tempPWD2 = convertStr(tempPWD);
            //             console.log("비밀번호: " +tempPWD);
            //             // setJoinPwd(tempPWD);
            //             setMsg("입력된 비밀번호는 "+tempPWD2+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
            //             setSpeakOnce(true);
            //             break;
            //         default:
            //             break;
            //         }
            //         break;
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
            <Header nowPage={"CartPage"} voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput} cartFieldValueInput={handleCartFieldValueInput}/>
            <div className="Container">
                <CartTitle nums = {result5} productInfo={info} voice={props.voice} nextAction={props.nextAction}/>
                {products.map((product, index) => (
                <CartArea idx={index} num={product.num} key={product.index} info={product} voice={props.voice} nextAction={props.nextAction} />
            ))}
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default CartPage;
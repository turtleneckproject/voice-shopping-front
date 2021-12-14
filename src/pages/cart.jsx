import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import { useHistory } from 'react-router';
import CartTitle from '../component/CartTitle';
import CartArea from '../component/CartArea';
import { useLocation } from 'react-router';

const CartPage = (props) => {
    const history = useHistory();
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
    const [nextField, setNextField] = useState(""); // 필드 입력 이동을 위한 카운터
    const [nextAction, setNextAction] = useState("");
    const [paylist, setPaylist] = useState([]); //결제할 품목들이 담기는 list
    const [idx, setIdx] = useState(0); //물품 인덱스
    const [rowid, setRowid] = useState(); // db에서의 물품 id
    const [title, setTitle] = useState(); // 물품명
    const [price, setPrice] = useState(); // 물품 가격
    const [id, setId] = useState(props.loginID); // 사용자 ID
    const [img, setImg] = useState(); // 물품 이미지
    const [pid, setPid] = useState(); // 물품 번호
    const [amount, setAmount] = useState(); //물품 수량
    const [count, setCount] = useState(0); //장바구니에 있는 총 물품 종류 수
    const [isCard, setIsCard] = useState(1); // 카드 등록 여부
    const [cardNum, setCardNum] = useState();
    const [cardCompany, setCardCompany] = useState("");
    const [goMain, setGoMain] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cardCount, setCardCount] = useState(0);
    const [cardPwd, setCardPwd] = useState("");
    const [rndIdx, setRndIdx] = useState({first: -1, second: -1}); // 랜덤으로 물어볼 비밀번호의 인덱스

    let tempTitle = [];
    let temp = [];
    let temp2 = [];
    let result_rowid = [];
    let isPay = 1;

    const handleCartFieldValueInput = (input) => {
        setFieldValue(input);
    }

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('https://springservertest.herokuapp.com/basket/showbasket', {
                    params: {
                        customer: props.loginID
                    }});
                setProducts(response.data);
                const cart = response.data;
                const result = cart.map((product, index) => (product.price));
                setPrice(result);
                const result2 = cart.map((product, index) => (product.title));
                setTitle(result2);
                const result4 = cart.map((product, index) => (product.rowid));
                setRowid(result4);
                const result5 = cart.map((product, index) => (product.image));
                setImg(result5);
                const result6 = cart.map((product, index) => (product.pid));
                setPid(result6);

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
                    console.log(""+count1);
                }
                setCount(count1);
                if(count1 === 0){
                    setMsg("현재 장바구니에 물품이 존재하지 않습니다. 잠시 후 메인페이지로 돌아갑니다.");
                    setGoMain(true);
                }
                else{
                    setMsg("장바구니 페이지입니다. 장바구니에 담긴 상품의 종류는 "+count1+"가지입니다. 장바구니에 담긴 상품 정보를 들으려면 상품듣기라고 말씀해주세요. 장바구니 물품의 전체 삭제를 원하시면 전체 삭제라고 말씀해주시면 상시 바로 적용이됩니다.");
                    setSpeakOnce(true);
                    setNextField("info");
                }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    },[]);

    const addPay = (paylist) => {
        const fetchData = async () => {
            try{
                const response = await axios.post('https://springservertest.herokuapp.com/payment/plusitem', paylist);
                    if(response.data === 1){
                        console.log("결제페이지에 추가 완료");
                    }
                    if(response.data === -1){
                        console.log("결제페이지에 추가 실패");
                    }
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    
const deleteOne = (rowid, opt) => { // 장바구니 물품 하나 삭제
    const fetchData = async () => {
        try{
            const response_card = await axios.get('https://springservertest.herokuapp.com/basket/deleteone', {
                params: {      
                    rowid : rowid
                }});
            setSpeakOnce(true);
            if(response_card.data === 1){
                console.log("삭제 성공");
                if(opt === "del"){
                    setSpeakOnce(false);
                    setMsg(`물품을 삭제하였습니다. 잠시 후 다음 상품으로 넘어갑니다`);
                    setSpeakOnce(true);
                }
                if(opt === "add"){
                }
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
            isPay= 0;
            if(response.data === 1){
                setSpeakOnce(false);
                console.log("삭제 성공");
                setMsg("장바구니의 모든 물품을 삭제하였습니다. 잠시후 처음 화면으로 돌아갑니다.");
                setSpeakOnce(true);
                setTimeout(function () {
                    // 3초동안 카운트를 센다.
                    console.log("음성 입력 없이 3초가 지났습니다.");
                    history.push({pathname: `/`}); 
                  }, 5000);
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

  const cardPwdCheck = (idx1, idx2, input) => { // 카드 비번 확인
    const fetchData = async () => {
        var str = input.replace(/(\s*)/g, ""); // 공백 제거 
        // 글자 분할
        var ch1 = str.substr(0,1); 
        var ch2 = str.substr(1,1); 
        try{
            // 글자 검증
            const response = await axios.get('https://springservertest.herokuapp.com/card/checkpwd', {
                params: {    
                    userid : props.loginID,
                    index : idx1,
                    input: ch1,
                    cardcompany : "삼성카드"
                }});
                console.log("카드 비밀번호 검증 결과: "+response.data);
            if(response.data === 1){ // 첫번 째 글자 성공
                const response2 = await axios.get('https://springservertest.herokuapp.com/card/checkpwd', {
                    params: {
                        userid: props.loginID,
                        index: idx2,
                        input: ch2,
                        cardcompany : cardCompany
                    }});
                if(response2.data === 1){ // 두번 째 글자 성공
                    setSpeakOnce(false);
                    setMsg(`카드 비밀번호가 일치합니다. 결제하려면 "결제하기"라고 말씀해주세요.`);
                    setSpeakOnce(true);
                    console.log("카드 비밀번호 성공");
                    setNextField("finish")
                }
                else {
                    console.log("두번째 카드 비번 실패");
                    setNextAction("fail");
                    }
                }
            else {
                console.log("첫번째 카드 비번 실패");
                setNextAction("fail");
            }
        }   
         catch(e){
            console.log(e);
        }
    };
    fetchData();
  }

  
  const cardCheck = () => {
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
                    setSpeakOnce(false);
                    let card = response3.data;
                    console.log(card);
                    const result = card.map((product, index) => (product.card_num));
                    const result2 = card.map((product, index) => (product.cardcompany));
                    console.log("카드회사"+result2)
                    const name = result2[0]
                    if(result2 == null){
                        setMsg("등록된 카드가 없습니다. 등록하실 카드사를 말씀해주세요.");
                        setNextField("card_company");
                        setSpeakOnce(true);
                    }
                    else{
                    const leng = result.length-1
                    result[leng] = result[leng].replace(/ +/gi, "");
                    let resultStr = "";
                    const leng2 = result[leng].length;
                    for(let i=1; i<=leng2; i++){
                        let str = result[leng].substr(i-1 ,1);
                        resultStr += (str + ";");
                    }
                    const result2 = card.map((product, index) => (product.card_company));
                    console.log("카드 반환"+JSON.stringify(response3.data));
                    setCardCompany(name)
                    setMsg("최근 등록된 카드의 카드회사는 "+name+"이고 카드번호는 "+resultStr+`입니다. 등록된 카드로 결제하려면 "결제하기", 새로운 카드를 등록하시려면 "카드 등록"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                }
            }
            else if (response2.data === -1){
                setSpeakOnce(false);
                setMsg("등록된 카드가 없습니다. 등록하실 카드사를 말씀해주세요.");
                setNextField("card_company");
                setSpeakOnce(true);
            }
        } catch(e){
            console.log(e);
        }
    };
    fetchData();
}

const registerCard = (card_company, card_num, card_pwd) => {
    const fetchData = async () => {
        try{
            await axios.post('https://springservertest.herokuapp.com/card/pluscard', {
                    userid: props.loginID,
                    card_company: card_company,
                    card_num: card_num,
                    pwd : card_pwd
                });
                console.log("카드 등록 완료");
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }
    
const confirmAddress = () => {
    const fetchData = async () => {
        try{
            const response = await axios.get('https://springservertest.herokuapp.com/user/showinfo', {       
                params:{            
                    userid: props.loginID
                }
            });
            const address = response.data;
            console.log("주소 값 확인"+address);
            setSpeakOnce(false);
            setMsg(`등록된 주소는 `+address.address+`입니다. 결제하실 카드를 확인하려면 "카드확인"이라고 말씀해주세요.`);
            setTimeout(function () {
                // 3초동안 카운트를 센다.
                console.log("음성 입력 없이 3초가 지났습니다.");
                setNextField("card");// 음성 입력 완전히 종료
                }, 3000);
            setSpeakOnce(true);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }

    let today = new Date(); // 현재 날짜와 시간
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate(); // 날짜 

  const addPaylist = (customer, title, image, price, pid, num, month, date) => {
      let item = {
          customer: customer,
          title: title,
          image: image,
          price: price,
          pid: pid,
          num: String(num),
          buymonth: String(month),
          buydate: String(date)
      }
    console.log(item);
        setPaylist([...paylist, item]);
  }

    const totalCost = () => {
        let total = 0;
        let temp = [];
        let temp2 = [];
        let productPrice = ""
        for (let i=0; i<paylist.length; i++){
            temp[i] = String(paylist[i].price).replace(/,/g, "");
            temp2[i] = parseInt(temp[i])
            total += (temp2[i] * parseInt(paylist[i].num));
            console.log("단일 가격"+paylist[i].price)
            console.log("단일 수량"+paylist[i].num)
        }
        productPrice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log("상품 수2"+paylist.length)
        console.log("총가격"+productPrice)


        return productPrice;
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

  result_rowid = products.map((product, index) => (product.rowid));

  useEffect(()=>{
    switch(nextField){
        case "info":
            switch(nextAction){
                case "product_info":
                    const nextIdx2 = idx;
                    if (isPay == 0){
                        setSpeakOnce(false);
                        setMsg(`현재 장바구니 내역이 존재하지 않습니다. 처음 화면으로 돌아갑니다.`);
                        setSpeakOnce(true);
                        setTimeout(function () {
                            console.log("메인 화면 이동");
                            history.push({pathname: `/`}); 
                            }, 3000);
                    }
                    else if(nextIdx2 < count){ 
                        setSpeakOnce(false);
                        setMsg(title[idx]+"상품의 가격은 "+ price[idx] + `원입니다. 현재 상품을 장바구니에서 삭제할까요? 네 또는 아니요로 대답해주세요.`);
                        setSpeakOnce(true);
                        setNextField("delete_from_cart");
                    }
                    else { 
                        setSpeakOnce(false);
                        const total2 = totalCost(); 
                        setMsg("결제 품목을 모두 추가하였습니다. 총가격은 " + total2 +`원입니다. 배송될 주소를 확인하려면 "주소확인"이라고 말씀해주세요.`);
                        console.log("가져온 함수"+totalCost());
                        console.log("입력된 값"+total2);
                        setSpeakOnce(true);
                        setTimeout(function () {
                            // 3초동안 카운트를 센다.
                            console.log("음성 입력 없이 3초가 지났습니다.");
                            setNextField("address");// 음성 입력 완전히 종료
                          }, 3000);
                    }

                    break;
                case "delete_all":
                    deleteAll();
                default:
                    break;
              }
            break;
        case "delete_from_cart":
            switch(nextAction){
                case "yes":
                    setIdx(idx+1);
                    setTimeout(function () {
                        // 3초동안 카운트를 센다.
                        console.log("음성 입력 없이 5초가 지났습니다.");
                        setNextField("info");
                        setNextAction("product_info");
                      }, 5000);
                    break;
                case "no":
                    // setIdx(idx+1);
                    setSpeakOnce(false);
                    setMsg(`해당상품을 결제 항목에 추가하려면 "결제", 다음 상품을 들으려면 "다음"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                    setNextField("add_paylist");
                    break;
                case "delete_all":
                    deleteAll();
                    setSpeakOnce(false);
                    setMsg(`전체 상품을 삭제하였습니다. 잠시후 첫 화면으로 돌아갑니다.`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        // 3초동안 카운트를 센다.
                        console.log("음성 입력 없이 3초가 지났습니다.");
                        history.push({pathname: `/`}); 
                        }, 5000);
                default:
                    console.log("@@@@@@")
                    break;
                }
            break;
        case "add_paylist":
            switch(nextAction){
                case "add":
                    setSpeakOnce(false);
                    setMsg("구매하실 상품의 수량을 말씀해주세요.");
                    setSpeakOnce(true);
                    setNextField("modify_amount");
                    break;
                case "next_item": 
                    setIdx(idx+1);
                    setNextField("info");
                    setNextAction("product_info"); // 음성 입력 완전히 종료
                    break;
                case "delete_all":
                    deleteAll();
                    setSpeakOnce(false);
                    setMsg(`전체 상품을 삭제하였습니다. 잠시후 첫 화면으로 돌아갑니다.`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        // 3초동안 카운트를 센다.
                        console.log("음성 입력 없이 3초가 지났습니다.");
                        history.push({pathname: `/`}); 
                        }, 5000);
                case "normal": // 사용자가 말한 데이터를 처리하는 부분
                setSpeakOnce(false);
                setMsg(props.voice+`이라고 잘못 입력하셨습니다. 해당상품을 결제 항목에 추가하려면 "결제", 다음 상품을 들으려면 "다음"이라고 말씀해주세요.`); 
                setSpeakOnce(true);
                    break;
                default:
                    console.log("#####")
                    break;
                }
                break;
        case "modify_amount":
            switch(nextAction){
                case "normal":
                    setSpeakOnce(false);
                    setMsg(`수량 `+fieldValue+`개가 입력되었습니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                    addPaylist(props.loginID, title[idx], img[idx], price[idx], pid[idx], fieldValue, month, date);
                    setSpeakOnce(true);
                    break;
                case "again":
                    setSpeakOnce(false);
                    setMsg("구매하실 상품의 수량을 말씀해주세요.")
                    setSpeakOnce(true);
                    break;
                case "next":
                    setAmount(fieldValue);
                    deleteOne(rowid[idx], "add"); // 장바구니 품목에서 삭제
                    const nextIdx = idx+1;
                    setIdx(nextIdx);
                    if(nextIdx < count){
                        setSpeakOnce(false);
                        setMsg(`현재 상품이 추가되었습니다. 다음 상품으로 이동하려면 "이동"이라고 대답해주세요.`);
                        setSpeakOnce(true);
                        setTimeout(function () { 
                            setNextField("info");
                            setNextAction("product_info");
                        }, 8000);
                    }
                    else { 
                        setSpeakOnce(false);
                        const total2 = totalCost(); 
                        setMsg("결제 품목을 모두 추가하였습니다. 총가격은 " + total2 +`원입니다. 배송 주소를 확인하시려면 "주소 확인"이라고 말씀해주세요`);
                        console.log("가져온 함수"+totalCost());
                        console.log("입력된 값"+total2);
                        setSpeakOnce(true);
                        setTimeout(function () {
                            // 3초동안 카운트를 센다.
                            console.log("음성 입력 없이 3초가 지났습니다.");
                            setNextField("address");// 음성 입력 완전히 종료
                          }, 3000);
                    }
                    break;
                case "delete_all":
                    deleteAll();
                    setSpeakOnce(false);
                    setMsg(`전체 상품을 삭제하였습니다. 잠시후 첫 화면으로 돌아갑니다.`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        // 3초동안 카운트를 센다.
                        console.log("음성 입력 없이 3초가 지났습니다.");
                        history.push({pathname: `/`}); 
                        }, 5000);
                default:
                    break;
            }
            break;

        case "address":
            switch(nextAction){
                case "comfirm_address":
                    confirmAddress();
                    break;
                case "normal": // 사용자가 말한 데이터를 처리하는 부분
                setSpeakOnce(false);
                setMsg(props.voice+`이라고 잘못 입력하셨습니다. "주소 확인"이라고 말씀해주세요.`); 
                setSpeakOnce(true);
                break;
                default:
                    break;
            }
            break;

        case "card":
            var rndNum1 = rand(-1);
            var rndNum2 = rand(rndNum1);
            switch(nextAction){
                case "comfirm_card":
                    cardCheck();  // "카드 확인"이 인식될 경우 장바구니에 추가하는 api 호출
                    break;
                case "comfirm_pay":
                    setSpeakOnce(false);
                    setMsg(`카드 비밀번호의 `+rndNum1+"번째 숫자와 "+ rndNum2+`번째 글자를 순서대로 말씀해주세요.`);
                    var tempAddr2 = convertStr(props.voice);
                    setRndIdx({first: rndNum1, second: rndNum2});
                    setSpeakOnce(true);
                    break;
                case "fail":
                    setSpeakOnce(false);
                    setMsg(`비밀번호가 일치하지 않습니다. 카드 비밀번호의 `+rndNum1+"번째 숫자와 "+ rndNum2+`번째 글자를 순서대로 말씀해주세요.`);
                    setRndIdx({first: rndNum1, second: rndNum2});
                    setSpeakOnce(true);
                    break;
                    case "normal":
                        cardPwdCheck(rndIdx.first, rndIdx.second, props.voice)
                    break;
                    case "again":
                        cardPwdCheck(rndIdx.first, rndIdx.second, tempAddr2)
                        break;
                    case "next":
                        cardPwdCheck(rndIdx.first, rndIdx.second, tempAddr2)
                        break;
                default:
                    break;
            }
            break;
            case "finish":
                switch(nextAction){
                case "comfirm_pay":
                    addPay(paylist);
                    setMsg(`결제가 완료되었습니다. 결제페이지로 이동하려면 "이동"이라고 말씀해주세요`);
                    setSpeakOnce(true);
                    setTimeout(function () {
                        console.log("결제 페이지 이동");
                        history.push({pathname: `/pay`}); 
                        }, 7000);
                    break;
                    }
            break;
        case "card_company":
            switch(nextAction){
                case "next": // 다음 단계로 진행하는 부분
                    setSpeakOnce(false);
                    setMsg("카드 번호 16자리 중 첫번째 4자리를 말씀해주세요.");
                    setNextField("card_num1");
                    setSpeakOnce(true);
                    break;
                case "again": // 다시 입력하고 싶을때 실행하는 부분
                    setSpeakOnce(false);
                    setMsg("카드사를 말씀해주세요.")
                    setSpeakOnce(true);
                    break;
                case "normal": // 사용자가 말한 데이터를 처리하는 부분
                    setSpeakOnce(false);
                    console.log("카드사:" +props.voice);
                    setCardCompany(props.voice);
                    setMsg("입력된 카드사는 "+props.voice+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`); //"계속"이면 'case "next"단락', "다시입력"이면 'case "again" 단락' 으로 이동
                    setSpeakOnce(true);
                    break;
                case "skip":
                    setSpeakOnce(false);
                    setMsg("카드 정보 등록을 생략합니다.");
                    setSpeakOnce(true);
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
                    setCardNum(null);
                    setMsg("카드 번호 16자리 중 첫번째 4자리를 말씀해주세요.");
                    setSpeakOnce(true);
                    break;
                case "normal":
                    setSpeakOnce(false);
                    var tempNum1 = convertStr(props.voice);
                    console.log("카드 번호1: " + props.voice);
                    setCardNum(props.voice);
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
                    var num1 = cardNum.substr(0,4);
                    setCardNum(num1);
                    setMsg("카드 번호 16자리 중 두번째 4자리를 말씀해주세요.")
                    setSpeakOnce(true);
                    break;
                case "normal":
                    setSpeakOnce(false);
                    var tempNum2 = convertStr(props.voice);
                    console.log("카드 번호: " + props.voice);
                    setCardNum(cardNum + props.voice);
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
                    var num2 = cardNum.substr(0,8);
                    setCardNum(num2);
                    setMsg("카드 번호 16자리 중 세번째 4자리를 말씀해주세요.")
                    setSpeakOnce(true);
                    break;
                case "normal":
                    setSpeakOnce(false);
                    var tempNum3 = convertStr(props.voice);
                    console.log("카드 번호3: "+props.voice);
                    setCardNum(cardNum+props.voice);
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
                    setMsg(`카드 번호 등록이 완료되었습니다. 카드 비밀번호를 확인하기위해 "카드 비밀번호"라고 말씀해주세요.`);
                    setNextField("check_pwd2");
                    setSpeakOnce(true);
                    break;
                case "again":
                    setSpeakOnce(false);
                    var num3 = cardNum.substr(0,12);
                    setCardNum(num3);
                    setMsg("카드 번호 16자리 중 네번째 4자리를 말씀해주세요.")
                    setSpeakOnce(true);
                    break;
                case "normal":
                    setSpeakOnce(false);
                    var tempNum4 = convertStr(props.voice);
                    console.log("카드 번호4: "+props.voice);
                    setCardNum(cardNum+props.voice);
                    setMsg(`입력된 네번째 4자리 카드번호는 `+tempNum4+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                    setSpeakOnce(true);
                    break;
                default:
                    break;
                }
            break;
            case "check_pwd2":
                switch(nextAction){
                    case "next":
                        setSpeakOnce(false);
                        addPay(paylist);
                        registerCard(cardCompany, cardNum, cardPwd);
                        setMsg(`결제가 완료되었습니다. 결제 내역으로 가려면 이동이라고 말씀해주세요.`);
                        setSpeakOnce(true);
                        setTimeout(function () {
                            console.log("결제 페이지 이동");
                            history.push({pathname: `/pay`}); 
                            }, 7000);
                        break;
                    case "again":
                        setSpeakOnce(false);
                        setMsg(`카드 비밀번호를 말씀해주세요.`)
                        setSpeakOnce(true);
                        break;
                    case "normal":
                        setSpeakOnce(false);
                        console.log("카드 비밀번호: "+props.voice);
                        setCardPwd(props.voice);
                        setMsg(`입력된 카드 비밀번호는 `+props.voice+`입니다. 맞다면 "계속", 다시 입력하려면 "다시입력"이라고 말씀해주세요.`);
                        setSpeakOnce(true);
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
        switch(props.nextAction){
            default:
                break;
        }
    }, [props.nextAction]);


    useEffect(()=>{
        setNextAction(props.nextAction);
    }, [props.nextAction]);

    useEffect(()=>{
    },[ products, nextAction, fieldValue]);

    useEffect(()=>{
        console.log("nextField : "+ nextField);
    }, [nextField])
    
    useEffect(()=>{
        console.log(title);
    }, [title]);

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
        console.log(img);
    }, [img]);

    useEffect(()=>{
        console.log(pid);
    }, [pid]);

    useEffect(()=>{
        if(goMain){
            setSpeakOnce(true);
        }
    },[goMain]);

    useEffect(()=>{
        console.log(paylist);
    }, [paylist]);


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
            <Header nowPage={"CartPage"} voiceInput={props.voiceInput} msg={msg} isSpeakDone={isSpeakDone} nextActionInput={props.nextActionInput} cartFieldValueInput={handleCartFieldValueInput}/>
            <div className="Container">
                <CartTitle productInfo={info} voice={props.voice} nextAction={props.nextAction}/>
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
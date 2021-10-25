import React, { Component } from "react";
import './App.css';
import "./static/fonts/fonts.css";
// import Container from './component/Container';
// import Header from './component/Header';
// import TopMenuBar from './component/TopMenuBar';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import JoinPage from "./pages/join";
import MainPage from "./pages/index";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import SearchPage from "./pages/search";
import PayPage from "./pages/pay";
import Modal from "./component/Modal";
import { Transition } from 'react-transition-group';


class App extends Component {
  state={
    voice: "default",
    isPopupOpen: false,
    msg: ""
  };

  // voices = window.speechSynthesis.getVoices();

  // speak(text, opt_prop){
  //   if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
  //       alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
  //       return
  //   }

  //   window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

  //   const prop = opt_prop || {}

  //   const speechMsg = new SpeechSynthesisUtterance()
  //   speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
  //   speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
  //   // speechMsg.lang = prop.lang
  //   speechMsg.voice = this.voices.filter(function(voice) { return voice.name == 'Google 한국의'; })[0];
  //   speechMsg.text = text

  //   // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
  //   window.speechSynthesis.speak(speechMsg)
  // }
  
  // btnRead = (e) => {
  //   console.log("말하기 시작" +this.state.msg)
  //   this.speak( this.state.msg, {
  //       rate: 1.0,
  //       pitch: 1.0,
  //       lang: "ko-KR"
  //   })
  // }

  openPopup = () => {
      this.setState({isPopupOpen:true});
  }
  closePopup = () => {
      this.setState({isPopupOpen:false});
  }

  handleVoiceInput = (input) => {
    console.log("헤더로부터 들어온 값은: " + input);
    this.setState({voice : input});
  }

  handleMsgInput = (input) =>{
    this.setState({msg: input});
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({isPopupOpen: true})
    }, 1500);
  }

  // componentDidUpdate(prevProps ,prevState){
  //   if(prevState.msg !== this.state.msg)
  //     this.btnRead();
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
        {/* <button type="button" onClick={this.openPopup}>modal test</button> */}
            <Transition unmountOnExit in={this.state.isPopupOpen} timeout={200}>
            {state => (
              <Modal 
              show={state}
              onClose ={this.closePopup}
              closable={true}
              maskClosable={true}
              msg={this.state.msg}/>
            )}
          </Transition>
          <ScrollToTop>
            <Switch>
                <Route exact path="/" render={() => <MainPage msgInput={this.handleMsgInput}/>} />
                <Route path="/search/:keyword" render={() => <SearchPage voice={this.state.voice} voiceInput={this.handleVoiceInput} msgInput={this.handleMsgInput}/> }/>
                <Route path="/product" component={ProductPage} />
                <Route path="/join" component={ JoinPage } />
                <Route path="/cart" component={ CartPage } />
                <Route path="/pay" component={ PayPage } />
            </Switch>
            </ScrollToTop>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
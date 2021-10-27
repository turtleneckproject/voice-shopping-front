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
    voice: "듣고 있어요...",
    isPopupOpen: false,
    msg: "" //사용자에게 출력될 메시지

  };

  openPopup = () => {
      this.setState({isPopupOpen:true});
  }
  closePopup = () => {
      this.setState({isPopupOpen:false});
  }

  // 각 페이지의 음성인식 part에서 받아온 음성데이터 세팅
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
        <button type="button" onClick={this.openPopup}>modal test</button>
            <Transition unmountOnExit in={this.state.isPopupOpen} timeout={200}>
            {state => (
              <Modal 
              show={state}
              onClose ={this.closePopup}
              closable={true}
              maskClosable={true}
              msg={this.state.msg}
              voice={this.state.voice}/>
            )}
          </Transition>
          <ScrollToTop>
            <Switch>
                <Route exact path="/" render={() => <MainPage voiceInput={this.handleVoiceInput} msgInput={this.handleMsgInput}/>} />
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
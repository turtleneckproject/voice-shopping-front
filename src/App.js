import React, { Component } from "react";
import "./App.css";
import "./static/fonts/fonts.css";
// import Container from './component/Container';
// import Header from './component/Header';
// import TopMenuBar from './component/TopMenuBar';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import JoinPage from "./pages/join";
import MainPage from "./pages/index";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import SearchPage from "./pages/search";
import PayPage from "./pages/pay";
import LoginPage from "./pages/login";
import Modal from "./component/Modal";
import { Transition } from "react-transition-group";

class App extends Component {
  state = {
    voice: "듣고 있어요...", //사용자가 음성으로 입력한 데이터
    isPopupOpen: false,
    msg: "", //사용자에게 출력될 메시지
    nextAction: "", //사용자에게서 받아온 음성 결과에 따라 어떻게 동작할지 명시
  };

  openPopup = () => {
    this.setState({ isPopupOpen: true });
  };
  closePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  // 각 페이지의 음성인식 part에서 받아온 음성데이터 세팅
  handleVoiceInput = (input) => {
    // console.log("헤더로부터 들어온 값은: " + input);
    this.setState({ voice: input });
  };

  handleMsgInput = (input) => {
    this.setState({ msg: input });
  };

  handleNextActionInput = (input) => {
    // console.log(input);
    this.setState({ nextAction: input });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isPopupOpen: true });
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
          <button type="button" onClick={this.openPopup}>
            modal test
          </button>
          <Transition unmountOnExit in={this.state.isPopupOpen} timeout={200}>
            {(state) => (
              <Modal
                show={state}
                onClose={this.closePopup}
                closable={true}
                maskClosable={true}
                msg={this.state.msg}
                voice={this.state.voice}
              />
            )}
          </Transition>
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <MainPage
                    voiceInput={this.handleVoiceInput}
                    msgInput={this.handleMsgInput}
                    nextActionInput={this.handleNextActionInput}
                    nextAction={this.state.nextAction}
                  />
                )}
              />
              <Route
                path="/search/:keyword"
                render={() => (
                  <SearchPage
                    voice={this.state.voice}
                    voiceInput={this.handleVoiceInput}
                    msgInput={this.handleMsgInput}
                    nextActionInput={this.handleNextActionInput}
                    nextAction={this.state.nextAction}
                  />
                )}
              />
              <Route
                path="/product"
                render={() => (
                  <ProductPage
                    voiceInput={this.handleVoiceInput}
                    msgInput={this.handleMsgInput}
                    nextActionInput={this.handleNextActionInput}
                    nextAction={this.state.nextAction}
                  />
                )}
              />
              <Route 
                path="/join"
                render={() => (
                  <JoinPage
                    voice={this.state.voice}
                    voiceInput={this.handleVoiceInput}
                    msgInput={this.handleMsgInput}
                    nextActionInput={this.handleNextActionInput}
                    nextAction={this.state.nextAction}
                  />
                )} 
              />
              <Route
                exact
                path="/login"
                render={() => (
                  <LoginPage
                    voice={this.state.voice}
                    voiceInput={this.handleVoiceInput}
                    msgInput={this.handleMsgInput}
                    nextActionInput={this.handleNextActionInput}
                    nextAction={this.state.nextAction}
                  />
                )}
              />
              <Route path="/cart" component={CartPage} />
              <Route path="/pay" component={PayPage} />
            </Switch>
          </ScrollToTop>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

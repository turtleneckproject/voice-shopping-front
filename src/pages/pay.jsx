import React from "react";
import PayTitle from "../component/PayTitle";
import Header from "../component/Header";
import '../component/Container.css';
import '../component/Footer.css';
import PayArea from "../component/PayArea";
import PayInfo from "../component/PayInfo";
import PayUser from "../component/PayUser";
import PayDeliver from "../component/PayDeliver";
import PayWay from "../component/PayWay";


const PayPage = () => {
    return (
    <div>
        <Header />
        <div className="Container">
            <PayTitle />
            <PayInfo />
            <PayUser />
            <PayDeliver />
            <PayWay />
            <PayArea />

        </div>
        <footer>
            <p>Footer Area</p>
        </footer>
    </div>
    );
};
export default PayPage;
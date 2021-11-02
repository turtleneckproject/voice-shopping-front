import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import CartTitle from '../component/CartTitle';
import CartArea from '../component/CartArea';
import { useLocation } from 'react-router';

const CartPage = () => {
    const location = useLocation();
    const [info, setInfo] = useState({});

    useEffect(()=>{
        console.log("장바구니 페이지로 들어온 값: ",location.state)
        setInfo(location.state);
    },[location.state]);

    return (
        <div>
            <Header />
            <div className="Container">
                <CartTitle />
                <CartArea info={info}/>
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default CartPage;
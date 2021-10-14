import React from 'react';
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import CartTitle from '../component/CartTitle';
import CartArea from '../component/CartArea';

const CartPage = () => {
    return (
        <div>
            <Header />
            <div className="Container">
                <CartTitle />
                <CartArea />
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};

export default CartPage;
import React from 'react';
import Header from '../component/Header';
import '../component/Container.css';
import '../component/Footer.css';
import JoinArea from '../component/JoinArea';

const JoinPage = () => {
    return (
        <div>
            <Header />
            <div className="Container">
                <JoinArea />
            </div>
            <footer>
                <p>Footer Area</p>
            </footer>
        </div>
    );
};
export default JoinPage;
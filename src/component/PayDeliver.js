import React, { useEffect, useState } from 'react';
import './PayDeliver.css';

const PayDeliver = (props) => {
    const [info, setInfo] = useState();

    const [info2, setInfo2] = useState();

    useEffect(()=>{
        setInfo2(props.name);
        console.log(props.name);
    },[props.name]);

    useEffect(()=>{
        setInfo(props.address);
        console.log(props.address);
    },[props.address]);

    return(
            <div class="side_deliver">
                <ul>
                <div class="side_title">배송 정보</div>
                <br/>
                    <li className="list">
                        <span className="label">{info2}</span>
                    </li>
                    <li className="list">
                        <span className="label">{info}</span>
                    </li>
                </ul>
            </div>
    ); 
}

export default PayDeliver;
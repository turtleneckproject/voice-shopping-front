import { useEffect, useState } from 'react';
import './ProductSerialArea.css';

const ProductSerialArea = ({productId}) => {
    const [id, setId] = useState();

    useEffect(()=>{
        setId(productId);
    }, [productId]);
    return (
        <div className="product_serial area">
            <p className="product_serial">상품번호 : {id}</p>
        </div>
    );
}

export default ProductSerialArea
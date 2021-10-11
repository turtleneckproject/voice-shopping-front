import axios from "axios";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./ProductGrid.css";

const ProductGrid = (props) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await axios.get('https://voice-shopping-server.herokuapp.com/api/item', {
                    params: {keyword: props.keyword}});
                setProducts(response.data);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [props]);

    if(loading){
        return <div>불러오는 중...</div>
    }

    if(!products){
        return null;
    }


    return(
        <div className="product_grid">
            {products.map(product => (
                <Product key={product.link} info={product} />
            ))}
        </div>
    );
}

export default ProductGrid;
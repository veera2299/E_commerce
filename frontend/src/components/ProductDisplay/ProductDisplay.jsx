import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
    const {product} = props;

    const {addToCart, Backend_URL } = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={`${Backend_URL}/${product.image}`} alt="" />
            <img src={`${Backend_URL}/${product.image}`} alt="" />
            <img src={`${Backend_URL}/${product.image}`} alt="" />
            <img src={`${Backend_URL}/${product.image}`} alt="" />
        </div>
        <div className="productdisplay-img">
            <img  className='productdisplay-main-img' src={`${Backend_URL}/${product.image}`} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                <div className="productdisplay-right-price-new">₹{product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem sed vel maiores atque asperiores tempore? Delectus fugit vel esse maiores.
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category: </span> Women, T-Shirt , Crop Top </p>
            <p className="productdisplay-right-category"><span>Tags: </span> Modern, Lastest</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay

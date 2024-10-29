import React, { useEffect, useState } from 'react'
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const Backend_URL = "http://localhost:4000"
  // const Backend_URL = "https://ecommerce-backend-q5i0.onrender.com";

  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch(`${Backend_URL}/product/allproducts`)
      .then(res => res.json())
      .then(data => { setAllproducts(data) })
  }

  useEffect(() => {
    fetchInfo();
   
  }, [])

  const removeProduct = async (id)=>{
    await fetch(`${Backend_URL}/product/removeproduct`, {
      method: 'POST',
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({id})
    })
    await fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove </p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <>
           <div key={index} className='listproduct-format-main listproduct-format'>
              <img src = {`${Backend_URL}/${product.image}`} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category }</p>
              <img onClick={()=> {removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr />
          </>
         
          
        })}
      </div>
    </div>
  )
}

export default ListProduct

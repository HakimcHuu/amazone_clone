import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'
function Product() {
    const[Products,setProducts]=useState()
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() =>{
        axios.get('https://fakestoreapi.com/products')
        .then((res) =>{
            // console.log(res)
        setProducts(res.data)
        setIsLoading(false)
            })
            .catch((err) =>{
            console.log(err)
            setIsLoading(false)
            })
            
    },[])

return (
    <> 
    {
        // If isLoading is true, show Loader component , // otherwise show the products
        isLoading?(<Loader/>):( <section className={classes.Product_container}>
            {
            Products?.map((singleProduct)=>{
                return   <ProductCard renderAdd={true} Product={singleProduct} key={singleProduct.id} />
            })
            }
        </section>

        )
    }
    </>
)
}

export default Product
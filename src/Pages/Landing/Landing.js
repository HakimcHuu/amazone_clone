import React from 'react'
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Catagory from '../../Components/Catagory/Catagory'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'
function Landing() {
return (
    <LayOut>
        <CarouselEffect/>
        <Catagory/>
        <Product/>
    </LayOut>
)
}

export default Landing
import React from 'react'
import Navigation from '../pages/Navigation'
import ProductForm from '../add-product/page'
import AllProducts from '../all-products/page'
function ProductHome() {
    return (
        <div>
            <Navigation />
            <ProductForm />
            <AllProducts />
        </div>
    )
}

export default ProductHome
import React, { use } from 'react'
import Card from '../Card/Card'

const LatestProducts = ({productsPromise}) => {

    const products = use(productsPromise)

  return (
    <div className='py-10 px-5 md:px-14'>
        <h1 className='font-bold text-4xl text-center text-info'>Latest Products</h1>
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {products.map((product)=><Card key={product._id} product={product}></Card>)}
        </div>
    </div>
  )
}

export default LatestProducts
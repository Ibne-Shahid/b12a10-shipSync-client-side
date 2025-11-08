import React, { Suspense } from 'react'
import LatestProducts from '../../components/LatestProducts/LatestProducts'

const productsPromise = fetch('http://localhost:3000/latestProducts').then(res=>res.json())

const Home = () => {
  return (
    <div>
        <div className='relative'>
            <img src="https://themepalace.com/wp-content/uploads/2019/04/import-export-banner.jpg" alt="" />
            <div className='absolute bottom-2 left-12 md:bottom-5 md:left-24 lg:bottom-12 lg:left-48'>
                <p className='font-bold text-lg md:text-3xl lg:text-5xl text-white'>From <span className='bg-gradient-to-r from-info via-accent to-success bg-clip-text text-transparent'>ShipSync</span></p>
            </div>
            
        </div>

        <Suspense fallback={
        <div className='flex justify-center items-center py-10'>
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      }>
        <LatestProducts productsPromise={productsPromise} />
      </Suspense>
        
    </div>
  )
}

export default Home
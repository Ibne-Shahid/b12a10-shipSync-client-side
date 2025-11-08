import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'

const Card = ({ product }) => {

    return (
        <div>
            <div className="card bg-blue-100 p-5 shadow-sm">
                <figure className='h-[200px]'>
                    <img
                    className='w-full h-full'
                        src={product?.product_image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product?.product_name}</h2>
                    <div className='flex gap-3'>
                        <div className="badge badge-outline badge-info">{product?.available_quantity} Available</div>
                        <div className="badge badge-outline badge-success">{product?.origin_country}</div>
                    </div>
                    <p className='flex items-center gap-1 text-orange-500'>{product?.rating > 4.8 ? <><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></>: product?.rating>=4.5&&product?.rating<=4.8?<><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalf/></>: product?.rating >= 4 && product?.rating < 4.5 ? <><FaStar/><FaStar/><FaStar/><FaStar/></> : product?.rating >=3 && product?.rating <4 ?  <><FaStar/><FaStar/><FaStar/></> : <><FaStar/><FaStar/></> } ({product?.rating})</p>
                    <p className='font-semibold'>{product?.price} Taka</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-accent">See Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
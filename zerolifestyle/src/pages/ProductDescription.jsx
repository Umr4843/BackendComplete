import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDescription = () => {
    const [product, setProduct] = useState(null)
    const params = useParams();
    const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:8082/api/admin/products/${params.id}`)
        setProduct(response.data.product)
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={`http://localhost:8082/uploads/${product?.image}`} alt={product?.title} height={"400px"} width={"100%"} />
                    </div>
                    <div className="col-6">
                        <h1>{product?.title}</h1>
                        <p>{product?.description}</p>
                        <h3>Price: ${product?.price}</h3>
                        <button className='btn btn-primary'>Add to Cart</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDescription
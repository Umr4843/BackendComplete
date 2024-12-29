import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = await axios.get(`http://localhost:8082/api/admin/products`)
        setProducts(response.data.products)
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className='d-flex justify-content-center align-items-center gap-4'>
            {
                products.map((product, index) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`http://localhost:8082/uploads/${product.image}`} height={"100px"} width={"100px"} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Button variant="light"><Link to={`/products/${product._id}`}>{product.price}</Link></Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
}

export default Products

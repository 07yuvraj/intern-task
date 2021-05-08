import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listAllProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productListAll = useSelector(state => state.productListAll)
    const { loading, error, products } = productListAll

    useEffect(() => {
        dispatch(listAllProducts())
    }, [dispatch])

    return (
        <div>
            <Container>
                <h1>Latest Products</h1>
                {loading ? <Loader />
                    : error ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <div>
                                <Row>
                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
            </Container>
        </div>
    )
}

export default HomeScreen

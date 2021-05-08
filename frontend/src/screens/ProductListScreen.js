import React, { useEffect } from 'react'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'

const ProductListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const sellerLogin = useSelector(state => state.sellerLogin)
    const { sellerInfo } = sellerLogin

    const productDelete = useSelector(state => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: SuccessDelete
    } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (sellerInfo && sellerInfo.isSeller && successCreate) {
            history.push(`/seller/product/${createdProduct._id}/edit`)
        } else if (sellerInfo && sellerInfo.isSeller) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, sellerInfo, SuccessDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (<Loader />) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Table bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>NAME</td>
                                <td>PRICE</td>
                                <td>CATEGORY</td>
                                <td>BRAND</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>$ {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/seller/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => {
                                            deleteHandler(product._id)
                                        }}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    )
}

export default ProductListScreen
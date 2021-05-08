import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { loginAdmin, loginSeller, loginBuyer } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [emailAdmin, setEmailAdmin] = useState('')
    const [passwordAdmin, setPasswordAdmin] = useState('')
    const [emailSeller, setEmailSeller] = useState('')
    const [passwordSeller, setPasswordSeller] = useState('')
    const [emailBuyer, setEmailBuyer] = useState('')
    const [passwordBuyer, setPasswordBuyer] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { loading : loadingAdmin, error : errorAdmin, adminInfo } = adminLogin

    const sellerLogin = useSelector(state => state.sellerLogin)
    const { loading : loadingSeller, error : errorSeller, sellerInfo } = sellerLogin

    const buyerLogin = useSelector(state => state.buyerLogin)
    const { loading : loadingBuyer, error : errorBuyer, buyerInfo } = buyerLogin

    useEffect(() => {
        if (adminInfo || sellerInfo || buyerInfo) {
            history.push(redirect)
        }
    }, [history, adminInfo, sellerInfo, buyerInfo, redirect])

    const submitAdminHandler = (e) => {
        e.preventDefault()
        dispatch(loginAdmin(emailAdmin, passwordAdmin))
    }

    const submitSellerHandler = (e) => {
        e.preventDefault()
        dispatch(loginSeller(emailSeller, passwordSeller))
    }

    const submitBuyerHandler = (e) => {
        e.preventDefault()
        console.log(emailBuyer)
        console.log(passwordBuyer)
        dispatch(loginBuyer(emailBuyer, passwordBuyer))
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={12} lg={4} className='mt-3'>
                    <Card>
                        <Card.Header className='text-center'>Login as Admin</Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitAdminHandler}>
                                {errorAdmin && (<Message variant='danger'>{errorAdmin}</Message>)}
                                {loadingAdmin && <Loader />}
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email'
                                        placeholder="Enter email"
                                        value={emailAdmin}
                                        onChange={e => setEmailAdmin(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password'
                                        placeholder="Enter password"
                                        value={passwordAdmin}
                                        onChange={e => setPasswordAdmin(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={4} className='mt-3'>
                    <Card>
                        <Card.Header className='text-center'>Login as Seller</Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitSellerHandler}>
                                {errorSeller && (<Message variant='danger'>{errorSeller}</Message>)}
                                {loadingSeller && <Loader />}
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email'
                                        placeholder="Enter email"
                                        value={emailSeller}
                                        onChange={e => setEmailSeller(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password'
                                        placeholder="Enter password"
                                        value={passwordSeller}
                                        onChange={e => setPasswordSeller(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                            </Form>

                            <Row className='py-3'>
                                <Col>
                                    New Seller ?{' '}
                                    <Link to='/register/seller'>Register</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={4} className='mt-3'>
                    <Card>
                        <Card.Header className='text-center'>Login as Buyer</Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitBuyerHandler}>
                                {errorBuyer && (<Message variant='danger'>{errorBuyer}</Message>)}
                                {loadingBuyer && <Loader />}
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email'
                                        placeholder="Enter email"
                                        value={emailBuyer}
                                        onChange={e => setEmailBuyer(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password'
                                        placeholder="Enter password"
                                        value={passwordBuyer}
                                        onChange={e => setPasswordBuyer(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                            </Form>

                            <Row className='py-3'>
                                <Col>
                                    New Buyer ?{' '}
                                    <Link to='/register/buyer'>Register</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen

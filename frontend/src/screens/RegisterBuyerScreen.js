import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { registerBuyer } from '../actions/userActions'

const RegisterBuyerScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(false)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const handleClose = () => {
        setShow(false)
        history.push('/')
    }

    const dispatch = useDispatch()
    const buyerRegister = useSelector(state => state.buyerRegister)
    const { loading, error, buyerInfo } = buyerRegister

    useEffect(() => {
        if (buyerInfo) {
            setShow(true)
        }
    }, [history, buyerInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            dispatch(registerBuyer(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up as Buyer</h1>
            {message && (<Message variant='danger'>{message}</Message>)}
            {error && (<Message variant='danger'>{error}</Message>)}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name'
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                        placeholder="Enter password again"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2'>Register</Button>
            </Form>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registration successfull !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, user is successfully registered as Buyer</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className='py-3'>
                <Col>
                    Have an account ?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterBuyerScreen
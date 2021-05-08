import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'

const Header = ({ history }) => {
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const sellerLogin = useSelector(state => state.sellerLogin)
    const { sellerInfo } = sellerLogin

    const buyerLogin = useSelector(state => state.buyerLogin)
    const { buyerInfo } = buyerLogin

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>MegaMind</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {sellerInfo && sellerInfo.isSeller && (
                                <LinkContainer to='/seller/productlist'>
                                    <Nav.Link >View/Add Products</Nav.Link>
                                </LinkContainer>
                            )}
                            {adminInfo && adminInfo.isAdmin && (
                                <Nav.Link >Admin View</Nav.Link>
                            )}
                            {adminInfo || buyerInfo || sellerInfo
                                ? (
                                    <LinkContainer to="/profile">
                                        <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                                    </LinkContainer>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>Sign In</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header>
    )
}

export default Header

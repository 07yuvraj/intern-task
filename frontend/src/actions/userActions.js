import axios from 'axios'
import {
    USER_LOGIN_ADMIN_REQUEST,
    USER_LOGIN_ADMIN_SUCCESS,
    USER_LOGIN_ADMIN_FAIL,
    USER_LOGOUT,
    USER_LOGIN_SELLER_REQUEST,
    USER_LOGIN_SELLER_SUCCESS,
    USER_LOGIN_SELLER_FAIL,
    USER_LOGIN_BUYER_REQUEST,
    USER_LOGIN_BUYER_SUCCESS,
    USER_LOGIN_BUYER_FAIL,
    USER_REGISTER_SELLER_REQUEST,
    USER_REGISTER_SELLER_SUCCESS,
    USER_REGISTER_SELLER_FAIL,
    USER_REGISTER_BUYER_REQUEST,
    USER_REGISTER_BUYER_SUCCESS,
    USER_REGISTER_BUYER_FAIL
} from '../constants/userContants'

const loginAdmin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_ADMIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/login/admin', { email, password }, config)

        console.log(data)

        dispatch({
            type: USER_LOGIN_ADMIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

const loginSeller = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_SELLER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/login/seller', { email, password }, config)

        console.log(data)

        dispatch({
            type: USER_LOGIN_SELLER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_SELLER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

const loginBuyer = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_BUYER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/login/buyer', { email, password }, config)

        console.log(data)

        dispatch({
            type: USER_LOGIN_BUYER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_BUYER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

const registerSeller = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_SELLER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/seller', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SELLER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SELLER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_SELLER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

const registerBuyer = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_BUYER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/buyer', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_BUYER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_BUYER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_BUYER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export { loginAdmin, loginSeller, loginBuyer, logout, registerSeller, registerBuyer }


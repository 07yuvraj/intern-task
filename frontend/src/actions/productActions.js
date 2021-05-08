import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
    PRODUCT_LISTALL_REQUEST,
    PRODUCT_LISTALL_SUCCESS,
    PRODUCT_LISTALL_FAILED,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILED,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILED
} from '../constants/productConstant'

export const listProducts = () => async (dispatch,getState) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { sellerLogin: { sellerInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${sellerInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/products`, config)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listAllProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LISTALL_REQUEST })
        const { data } = await axios.get(`/api/products/allproduct`)

        dispatch({
            type: PRODUCT_LISTALL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LISTALL_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const detailProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const { sellerLogin: { sellerInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${sellerInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const { sellerLogin: { sellerInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${sellerInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const { sellerLogin: { sellerInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sellerInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


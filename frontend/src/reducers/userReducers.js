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

export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_ADMIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_ADMIN_SUCCESS:
            return { loading: false, adminInfo: action.payload }
        case USER_LOGIN_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SELLER_REQUEST:
            return { loading: true }
        case USER_LOGIN_SELLER_SUCCESS:
            return { loading: false, sellerInfo: action.payload }
        case USER_LOGIN_SELLER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const buyerLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_BUYER_REQUEST:
            return { loading: true }
        case USER_LOGIN_BUYER_SUCCESS:
            return { loading: false, buyerInfo: action.payload }
        case USER_LOGIN_BUYER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const buyerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_BUYER_REQUEST:
            return { loading: true }
        case USER_REGISTER_BUYER_SUCCESS:
            return { loading: false, buyerInfo: action.payload }
        case USER_REGISTER_BUYER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const sellerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SELLER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SELLER_SUCCESS:
            return { loading: false, sellerInfo: action.payload }
        case USER_REGISTER_SELLER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
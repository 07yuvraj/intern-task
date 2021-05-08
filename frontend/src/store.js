import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    adminLoginReducer,
    sellerLoginReducer,
    buyerLoginReducer,
    buyerRegisterReducer,
    sellerRegisterReducer
} from './reducers/userReducers'
import {
    productListReducer,
    productListAllReducer,
    productDetailsReducer,
    productDeleteReducer,
    productUpdateReducer,
    productCreateReducer
} from './reducers/productReducer'

const reducer = combineReducers({
    adminLogin: adminLoginReducer,
    sellerLogin: sellerLoginReducer,
    buyerLogin: buyerLoginReducer,
    buyerRegister: buyerRegisterReducer,
    sellerRegister: sellerRegisterReducer,
    productList: productListReducer,
    productListAll: productListAllReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

console.log(userInfoFromStorage)

var adminInfo = null
var sellerInfo = null
var buyerInfo = null
if (userInfoFromStorage && userInfoFromStorage.isAdmin) {
    adminInfo = userInfoFromStorage
} else if (userInfoFromStorage && userInfoFromStorage.isSeller) {
    sellerInfo = userInfoFromStorage
} else if (userInfoFromStorage) {
    buyerInfo = userInfoFromStorage
}

const initialState = {
    adminLogin: { adminInfo },
    sellerLogin: { sellerInfo },
    buyerLogin: { buyerInfo },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
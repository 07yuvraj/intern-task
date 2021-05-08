import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterSellerScreen from './screens/RegisterSellerScreen'
import RegisterBuyerScreen from './screens/RegisterBuyerScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register/seller' component={RegisterSellerScreen} />
          <Route exact path='/register/buyer' component={RegisterBuyerScreen} />
          <Route exact path='/seller/productlist' component={ProductListScreen} />
          <Route exact path='/seller/product/:id/edit' component={ProductEditScreen} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

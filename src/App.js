import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteElement,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import ProtectedRouteAdmin from './pages/Admin/ProtectedRouteAdmin';
import Orders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/AdminProducts';
import Home from './pages/Admin/Home';
import AdminProductDetail from './pages/Admin/AdminProductDetail';
import NewProduct from './pages/Admin/AdminProducts/NewProduct';

function App() {
  return (
    <Router>
    <div>
      
      <Navbar/>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <div id='content'>
      <Routes>
       
       <Route path="/" exact  element={<Products/>}/>
       <Route path="/product/:product_id" element={<ProductDetail/>}/>

       <Route path="/signin" element={<Signin/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/basket" element={<Basket/>}/>

       <Route element={<ProtectedRoute/>} >
          <Route path='/profile' element={<Profile/>}/>
       </Route>


          <Route element={<ProtectedRouteAdmin/>} >
              <Route path='/admin' element={<Admin/>}>

              <Route path='orders' element={<Orders/>}/>
              <Route path='products' element={<AdminProducts/>}/>
              <Route path='home' element={<Home/>}/>
              <Route path='products/:product_id' element={<AdminProductDetail/>} />
              <Route path='products/new' element={<NewProduct/>}/>

              </Route>
            

          </Route>

       <Route path='*' element={<Error404/>}/>
       
     </Routes>
      </div>
    </div>
  </Router>
);
}




export default App;

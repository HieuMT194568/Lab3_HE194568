import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Error from "./pages/Error";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product' element={<ProductList/>} />
      <Route path='/products/:productID' element={<ProductDetail/>} />
      <Route path='*' element={<Error/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;


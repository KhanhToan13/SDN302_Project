import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Order from './Order';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/orders" element={<Order />} />
            </Routes>
        </Router>
    );
}

export default App;

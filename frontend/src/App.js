import Home from './pages/home.js';
import Search from './pages/search.js';
import Flights from './pages/flights.js';
import About from './pages/about.js';
import Blog from './pages/blog.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './css/App.css';

function App() {
    const navigate = useNavigate();
    
    return (
        <div>
            <nav>
                <button className="btn" onClick={() => navigate('/')}>Главная</button>
                <button className="btn" onClick={() => navigate('/search')}>Поиск</button>
                <button className="btn" onClick={() => navigate('/flights')}>Полёты</button>
                <button className="btn" onClick={() => navigate('/about')}>О нас</button>
                <button className="btn" onClick={() => navigate('/blog')}>Блог</button>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
            </Routes>
        </div>
    );
}
export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
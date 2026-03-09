import Home from './pages/home.tsx';
import Search from './pages/search.tsx';
import Flights from './pages/flights.tsx';
import About from './pages/about.tsx';
import Blog from './pages/blog.tsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './css/App.css';
import logo from './img/web-app-manifest-192x192.png';

function App() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img 
                        className="w-12 h-12 object-contain rounded-lg bg-white p-1" 
                        src={logo} 
                        alt="Fish Air Logo" 
                    />
                    <h1 className="text-3xl font-bold">Fish Air</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    <button 
                        className="btn-main"
                        onClick={() => navigate('/')}>Главная</button>
                    <button 
                        className="btn-main"
                        onClick={() => navigate('/search')}>Поиск</button>
                    <button 
                        className="btn-main"
                        onClick={() => navigate('/flights')}>Полёты</button>
                    <button 
                        className="btn-main"
                        onClick={() => navigate('/about')}>О нас</button>
                    <button 
                        className="btn-main"
                        onClick={() => navigate('/blog')}>Блог</button>
                </div>
            </nav>
            <div className="container mx-auto p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </div>
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
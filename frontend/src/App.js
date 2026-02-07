import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем продукты при запуске
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      const newProduct = {
        name: 'Новая рыба',
        price: 1000,
        category: 'Рыба'
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      console.log('Добавлен продукт:', data);
      fetchProducts(); // Обновляем список
    } catch (err) {
      console.error('Ошибка добавления:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🐟 Fish-Air Магазин
          </h1>
          <p className="text-gray-600 text-lg">
            Фронтенд (React) + Бэкенд (Express) работают вместе!
          </p>
        </header>

        {/* Статус подключения */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="font-medium text-green-700">
              ✅ Бэкенд Express подключен на порту 5000
            </span>
          </div>
        </div>

        {/* Кнопка добавления */}
        <div className="mb-8">
          <button
            onClick={addProduct}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            ➕ Добавить тестовый продукт
          </button>
        </div>

        {/* Загрузка/Ошибка */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Загрузка продуктов...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-8">
            <p className="text-red-700">❌ Ошибка: {error}</p>
            <button
              onClick={fetchProducts}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Повторить загрузку
            </button>
          </div>
        )}

        {/* Список продуктов */}
        {!loading && !error && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Продукты из Express API ({products.length} шт.)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{product.category}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      ID: {product.id}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600">{product.description || 'Описание отсутствует'}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price} ₽
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Информация о продукте */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Информация об API:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-blue-500 font-bold mb-2">Endpoint</div>
                  <code className="text-sm bg-gray-100 p-2 rounded">GET /api/products</code>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-green-500 font-bold mb-2">Статус</div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Работает</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-purple-500 font-bold mb-2">Данные</div>
                  <div>{products.length} продуктов загружено</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Футер */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>Фронтенд: React (localhost:3000) ↔ Бэкенд: Express (localhost:5000)</p>
          <p className="text-sm mt-2">Все системы работают корректно 🚀</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
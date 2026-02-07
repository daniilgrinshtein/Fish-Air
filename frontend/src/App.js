import React from "react";
import "./App.css";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-red-500">
        Тест Tailwind
      </h1>
      <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
        ✅ Если этот блок ЗЕЛЕНЫЙ - Tailwind работает!
      </div>
      <div className="mt-4 p-4 bg-blue-500 text-white rounded-lg">
        ✅ Если этот блок СИНИЙ - Tailwind работает!
      </div>
      <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Тестовая кнопка
      </button>
    </div>
  );
}

export default App;
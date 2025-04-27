import { Routes, Route, Link } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import UnicornsView from './unicorns/UnicornsView';
import ProductsRoutes from './products/index'; // 👈 Importamos las rutas de productos

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 0
    }}>
      
      {/* 🌟 Aquí agregamos el div de brillo nuevo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.35) 0%, transparent 60%)',
        opacity: 0.6,
        animation: 'shinePulse 8s infinite alternate',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>

      {/* 🚀 Luego tu nav y todo lo demás como ya estaba */}
      <nav style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 2 }}>
        <Link to="/" style={{ margin: '0 1rem', fontWeight: 'bold', color: '#6a1b9a' }}>Inicio</Link>
        <Link to="/unicornios" style={{ margin: '0 1rem', fontWeight: 'bold', color: '#8e24aa' }}>Unicornios</Link>
        <Link to="/productos" style={{ margin: '0 1rem', fontWeight: 'bold', color: '#ab47bc' }}>Productos</Link>
      </nav>

      <div style={{ position: 'relative', zIndex: 2, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unicornios/*" element={
            <UnicornProvider>
              <UnicornsView />
            </UnicornProvider>
          } />
          <Route path="/productos/*" element={<ProductsRoutes />} />
        </Routes>
      </div>

    </div>
  );
}


function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido a la App de Unicornios 🦄</h1>
      <p>Gestioná tus Unicornios o Productos</p>
    </div>
  );
}

export default App;

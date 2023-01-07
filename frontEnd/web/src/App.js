import './App.css';


import Login from './user/Login';
import Moperario from './operarios/MostrarOperarios';
import Register from './user/Register';
import MenuPrincipal from './MenuPrincipal';
import RegistroG from './juego/RegistroG';
import EditarJ from './juego/Editarjuego';
import Mapa from './Mapa';
import Juego from './juego/Juego';
import Lista from './juego/ListaJuegos';
import Menucliente from './clientes/MenuClientes'
import CardComponent from './CardComponent';
import Cola from './Cola';
import { Routes, Route, BrowserRouter } from 'react-router-dom';



function App() {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MenuPrincipal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/MenuCliente" element={<Menucliente />} />
              <Route path="/MostrarOperario" element={<Moperario />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Mapa" element={<Mapa />}/>
              <Route path="/CardComponent" element={<CardComponent />} />
              <Route path="/juego/Juego" element={<Juego />} />
              <Route path="/Cola" element={<Cola />} />
              <Route path="/juego/ListaJuegos" element={<Lista />} />
              <Route path="/juego/RegistroG" element={<RegistroG />} />
              <Route path="/juego/Editarjuego" element={<EditarJ />} />
              <Route path="/MenuPrincipal" element={<MenuPrincipal />} />
            </Routes>
          </BrowserRouter>
  );
}

export default App;

import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Search from './pages/search';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>)
}

export default App
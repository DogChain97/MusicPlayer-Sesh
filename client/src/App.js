import Login from './login';
import Register from './register';
import Home from './home';
import Genre from './genre';
import Playlist from './playlist';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} /> {/*First page is login page*/}
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/genre" element={<Genre/>} />
        <Route path="/playlist" element={<Playlist/>} />
      </Routes>
    </div>
  );
}

export default App;
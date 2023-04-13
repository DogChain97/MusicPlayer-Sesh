import Login from './login';
import Register from './register';
import Home from './home';
import Genre from './genre';
import CreatePlaylist from './createPlaylist';
import Admin from './admin';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} /> {/*First page is login page*/}
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/genre" element={<Genre/>} />
        <Route path="/createPlaylist" element={<CreatePlaylist/>} />
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
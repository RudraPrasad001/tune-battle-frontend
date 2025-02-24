import Home from './components/Home';
import Songs from './components/Songs';
import { useState } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  const [id,setId]=useState([{"name":"ninja","artist":"ninjs"}]);
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home func={setId}/>}></Route>
      <Route path='/songs' element={<Songs />}></Route>
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

import Home from './components/Home';
import Songs from './components/Songs';
import Test from './components/Test';
import { useState } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  const [id,setId]=useState();
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home func={setId}/>}></Route>
      <Route path='/songs' element={<Songs />}></Route>
      <Route path='/test' element={<Test />}></Route>
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

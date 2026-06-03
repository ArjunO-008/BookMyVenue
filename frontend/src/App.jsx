import {Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Venue from './pages/Venue';
import Category from './pages/Category';
import Signin from './pages/Signin';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/venue' element={<Venue/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
    </div>
  )
}

export default App;
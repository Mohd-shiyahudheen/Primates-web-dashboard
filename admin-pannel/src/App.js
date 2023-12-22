import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Addblog from './Pages/Addblog/Addblog';
import Addmember from './Pages/Addmember/Addmember';
 // require('dotenv').config()


function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/addBlog' element={<Addblog/>}/> 
            <Route path='/addMember' element={<Addmember/>}/>
          </Routes>
        </main>
      </Router>
     
    </div>
  );
}

export default App;

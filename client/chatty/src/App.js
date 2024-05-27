

import React, { useEffect } from 'react';
import  Discussion from'./discussion';
import  Login from './Login';
import  Home from './Home';


import { BrowserRouter,Routes, Route, Link } from "react-router-dom";



function App(){


  
  return(
   <div className="App mt-5"> 
                        
     <Routes>
        <Route path="" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>

   </div>
   );
}
export default App;

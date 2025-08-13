// import React from 'react'
// import { Route, Routes } from 'react-router'
// import EntryForm from '../../Pages/EntryForm'
// import Community from '../../Pages/Community'
// import Profile from '../../Pages/Profile'
// import Login from '../Components/Auth/Login'
// import Signup from '../Components/Auth/Signup'
// import Home from '../../Pages/Home'
// import PrivateRoute from '../Components/PrivateRoute'

// const MainRoute = ({ darkMode }) => {
//   return (
//     <Routes>
//     <Route 
//         path='/entryform'
//         element={
//           <PrivateRoute>
//             <EntryForm darkMode={darkMode} />
//           </PrivateRoute>
//         } 
//       />
//    <Route path='/Community' element={<Community darkMode={darkMode} />}/>
//    <Route path='/Profile' element={<Profile darkMode={darkMode} />}/>
//    <Route path='/Login' element={<Login darkMode={darkMode} />}/>
//    <Route path='/Signup' element={<Signup darkMode={darkMode} />}/>
//    <Route path='/' element={<Home darkMode={darkMode} />}/>
//     </Routes>
//   )
// }


// export default MainRoute


import React from 'react';
import { Route, Routes } from 'react-router';
import EntryForm from '../../Pages/EntryForm';
import Community from '../../Pages/Community';
import Profile from '../../Pages/Profile';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import Home from '../../Pages/Home';
import PrivateRoute from '../Components/PrivateRoute';

const MainRoute = ({ darkMode }) => {
  return (
    <Routes>
      <Route 
        path='/entryform'
        element={
          <PrivateRoute>
            <EntryForm darkMode={darkMode} />
          </PrivateRoute>
        } 
      />
      <Route path='/community' element={<Community darkMode={darkMode} />}/>
      <Route path='/profile' element={<Profile darkMode={darkMode} />}/>
      <Route path='/login' element={<Login darkMode={darkMode} />}/>
      <Route path='/signup' element={<Signup darkMode={darkMode} />}/>
      <Route path='/' element={<Home darkMode={darkMode} />}/>
    </Routes>
  );
}

export default MainRoute;
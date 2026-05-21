
import './App.css'
import EmployeeComponent from './components/EmployeeComponent';
import FooterCompnents from './components/FooterCompnents'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponents'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { isUserLoggedIn } from './service/AuthService';

function App() {

  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();
    if(isAuth) return children;
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          
          <Route path="/employees" element={
            <AuthenticatedRoute><ListEmployeeComponents /></AuthenticatedRoute>
          }></Route>

          <Route path="/add-employee" element={
            <AuthenticatedRoute><EmployeeComponent /></AuthenticatedRoute>
          }></Route>

          <Route path="/edit-employee/:id" element={
            <AuthenticatedRoute><EmployeeComponent /></AuthenticatedRoute>
          }></Route>
        </Routes>
        <FooterCompnents />
      </BrowserRouter>

    </>
  )
}

export default App

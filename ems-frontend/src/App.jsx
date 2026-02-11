
import './App.css'
import EmployeeComponent from './components/EmployeeComponent';
import FooterCompnents from './components/FooterCompnents'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponents'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path="/" element={<ListEmployeeComponents />}></Route>
          {/* //http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeeComponents />}></Route>
          {/* //http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
            {/* //http://localhost:3000/edit-employee */}
          <Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>
        </Routes>
        <FooterCompnents />
      </BrowserRouter>

    </>
  )
}

export default App

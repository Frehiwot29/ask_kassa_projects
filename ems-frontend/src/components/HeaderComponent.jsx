import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout, getLoggedInUserRole } from '../service/AuthService'

const HeaderComponent = () => {

  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();
  const role = getLoggedInUserRole();

  function handleLogout(){
    logout();
    navigate('/login')
  }

  return (
    <div>
         <header>
                <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: '#001a33'}}>
                    <a className='navbar-brand text-white' href='https://www.linkedin.com/in/frehiwot-asfaw/'>Employee Management System</a>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
                                </li>
                            }
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink to="/employees" className="nav-link text-white">Employees</NavLink>
                                </li>
                            }
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink 
                                        to={role === 'OFFICER' ? "/legal-query" : "/query"} 
                                        className="nav-link text-white">
                                        {role === 'OFFICER' ? "Verification" : "Query"}
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        { !isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/register" className="nav-link text-white">Signup</NavLink>
                            </li>
                        }
                        { !isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link text-white">Login</NavLink>
                            </li>
                        }
                        { isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link text-white" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
         </header>
    </div>
  )
}

export default HeaderComponent

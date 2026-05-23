import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../service/AuthService'

const HeaderComponent = () => {

  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  function handleLogout(){
    logout();
    navigate('/login')
  }

  return (
    <div>
         <header>
                <nav className="navbar navbar-expand-md navbar-light bg-info">
                    <a className='navbar-brand text-black' href='https://www.linkedin.com/in/frehiwot-asfaw/'>Employee Management System</a>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink to="/dashboard" className="nav-link text-black">Dashboard</NavLink>
                                </li>
                            }
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink to="/employees" className="nav-link text-black">Employees</NavLink>
                                </li>
                            }
                            { isAuth && 
                                <li className='nav-item'>
                                    <NavLink to="/query" className="nav-link text-black">Query</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        { !isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/register" className="nav-link text-black">Register</NavLink>
                            </li>
                        }
                        { !isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link text-black">Login</NavLink>
                            </li>
                        }
                        { isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link text-black" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
         </header>
    </div>
  )
}

export default HeaderComponent

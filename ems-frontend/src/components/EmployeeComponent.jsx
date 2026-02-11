import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [])
    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email }
            console.log(employee);
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees')
                })
            }

        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...error }
        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First name is required";
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last name is required";
            valid = false;
        }
        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }
        setError(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form action="">

                            <div className='form-group mb-2'>
                                <label className='form-lable'>E F Name</label>
                                <input type="text"
                                    placeholder='Enter F Name'
                                    name='firstNmae'
                                    value={firstName}
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-lable'>E F Name</label>
                                <input type="text"
                                    placeholder='Enter L Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-lable'>Email</label>
                                <input type="text"
                                    placeholder='Enter Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <div className='invalid-feedback'>{error.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee} >submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent

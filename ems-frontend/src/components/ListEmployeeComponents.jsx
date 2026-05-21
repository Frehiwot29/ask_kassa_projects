import React, { useEffect, useState } from 'react'
import { deeteEmployee, listEmployees, getEmployee } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {
    const [employees, setEmployees] = useState([]);
    const [searchId, setSearchId] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, [])

    function getAllEmployee() {
        listEmployees().then((res) => {
            setEmployees(res.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigate('/add-employee')
    }
    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id);
        deeteEmployee(id).then((response) => {
            getAllEmployee();
        }).catch(error => {
            console.error(error);
        })
    }

//    function searchEmployee (searchId){
//         //  const response= await fetch( `http://localhost:8080/api/employees/${searchId}`);
//         //  const data=await response.json();
//         getEmployee(searchId).then((response) => {
//             console.log(response.data);
//              setEmployees(response.data);
//         }).catch(error => {
//             console.error(error);
//         })
//          navigate(`/add-employee/${searchId}`)
//     }

    return (
        <div className='container'>
            <h1 className='text-center'><strong><i>List Of Employee</i></strong></h1>
            <button className='btn btn-primary mb-2' value={searchId} onClick={addNewEmployee}>Add Employee</button>
            <input type='number' className='search-input ' placeholder='Search Employee By Id' onChange={(e) => setSearchId(e.target.value)}  style={{ marginLeft: '10px' }}/>
            <button className='btn btn-success'  style={{ marginLeft: '10px' }}>Search</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Emplyee F Name</th>
                        <th>Employee L name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emplyee => (
                        <tr key={emplyee.id}>
                            <td>{emplyee.id}</td>
                            <td>{emplyee.firstName}</td>
                            <td>{emplyee.lastName}</td>
                            <td>{emplyee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(emplyee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(emplyee.id)}
                                    style={{ marginLeft: '10px' }}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListEmployeeComponents;

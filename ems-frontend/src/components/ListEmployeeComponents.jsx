import React, { useEffect, useState } from 'react'
import { deeteEmployee, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, [])

    function getAllEmployee(){
          listEmployees().then((res) => {
            setEmployees(res.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigate('/add-employee')
    }

    function updateEmployee(id){
        navigate(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);
        deeteEmployee(id).then((response)=>{
          getAllEmployee();
        }).catch(error =>{
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List Of Employee</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
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
                                <button className='btn btn-info' onClick={()=>updateEmployee(emplyee.id)}>Update</button>
                                 <button className='btn btn-danger' onClick={()=>removeEmployee(emplyee.id)}
                                    style={{marginLeft: '10px'}}
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

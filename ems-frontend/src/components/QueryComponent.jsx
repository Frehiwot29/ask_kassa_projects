import React, { useEffect, useState } from 'react'
import { getAllDepartments } from '../service/DepartmentService'

const QueryComponent = () => {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> Department Details </h2>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map(dept => (
                                        <tr key={dept.id}>
                                            <td>{dept.id}</td>
                                            <td>{dept.departmentName}</td>
                                            <td>{dept.departmentDescription}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryComponent
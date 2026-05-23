import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardComponent = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <br/><br/>
            <h2 className='text-center'>Main Menu</h2>
            <br/><br/>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card text-center'>
                        <div className='card-body'>
                            <h5 className='card-title'>Employee Records</h5>
                            <p className='card-text'>Manage the list of active employees.</p>
                            <button className='btn btn-primary' onClick={() => navigate('/employees')}>View Employees</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card text-center'>
                        <div className='card-body'>
                            <h5 className='card-title'>Department Queries</h5>
                            <p className='card-text'>Perform queries on department data.</p>
                            <button className='btn btn-info' onClick={() => navigate('/query')}>View Departments</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent
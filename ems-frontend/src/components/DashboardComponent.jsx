import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUserRole } from '../service/AuthService';
import { getPersonStatsAPI } from '../service/LegalQueryService';

const DashboardComponent = () => {
    const navigate = useNavigate();
    const role = getLoggedInUserRole();
    const isOfficer = role === 'OFFICER';
    const [stats, setStats] = useState({ inSecondary: 0, isBlacklisted: 0 });

    useEffect(() => {
        if(isOfficer) {
            getPersonStatsAPI().then(res => setStats(res.data))
                .catch(err => console.error(err));
        }
    }, [isOfficer]);

    return (
        <div className='container'>
            <br/><br/>
            <h2 className='text-center'>Main Menu</h2>
            {isOfficer && (
                <div className='row mb-4'>
                    <div className='col-md-4 offset-md-2'>
                        <div className='card bg-warning text-dark text-center p-3'>
                            <h5>In Secondary Queue</h5>
                            <h3>{stats.inSecondary}</h3>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card bg-danger text-white text-center p-3'>
                            <h5>Blacklisted Records</h5>
                            <h3>{stats.isBlacklisted}</h3>
                        </div>
                    </div>
                </div>
            )}
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
                            <h5 className='card-title'>{isOfficer ? "Legal Verification" : "Department Queries"}</h5>
                            <p className='card-text'>{isOfficer ? "Verify person legality by Passport Number." : "Perform queries on department data."}</p>
                            <button className='btn btn-info' onClick={() => navigate(isOfficer ? '/legal-query' : '/query')}>
                                {isOfficer ? "Verify Status" : "View Departments"}
                            </button>
                        </div>
                    </div>
                </div>
                {isOfficer && (
                    <div className='col-md-6 mt-4'>
                        <div className='card text-center border-warning'>
                            <div className='card-body'>
                                <h5 className='card-title'>Secondary Queue</h5>
                                <p className='card-text'>View people held for secondary inspection.</p>
                                <button className='btn btn-warning' onClick={() => navigate('/secondary-inspection')}>View Queue</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardComponent
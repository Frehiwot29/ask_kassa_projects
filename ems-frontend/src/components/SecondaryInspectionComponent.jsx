import React, { useEffect, useState } from 'react';
import { getSecondaryList, completeRetakeAPI, releaseFromSecondaryAPI } from '../service/LegalQueryService';
import CameraComponent from './CameraComponent';

const SecondaryInspectionComponent = () => {
    const [secondaryPersons, setSecondaryPersons] = useState([]);
    const [showCamera, setShowCamera] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);

    const fetchList = () => {
        getSecondaryList().then((response) => {
            setSecondaryPersons(response.data);
        }).catch(err => console.error(err));
    };

    useEffect(() => {
        fetchList();
    }, []);

    const openCamera = (id) => {
        setSelectedPersonId(id);
        setShowCamera(true);
    };

    const handleCapture = (image) => {
        console.log("Image Captured:", image);
        completeRetakeAPI(selectedPersonId, image).then(() => {
            setShowCamera(false);
            fetchList();
        });
    };

    const releasePerson = (id) => {
        releaseFromSecondaryAPI(id).then(() => {
            fetchList();
        }).catch(err => console.error(err));
    };

    return (
        <div className='container'>
            <br/><br/>
            <h2 className='text-center'>Secondary Inspection Queue</h2>
            <br/>
            
            {showCamera && (
                <>
                    <div className='modal-backdrop-custom' onClick={() => setShowCamera(false)}></div>
                    <div className='modal-overlay p-4 border rounded shadow bg-light mb-4'>
                        <h4 className='text-center'>Retake Passenger Image</h4>
                        <CameraComponent 
                            onCapture={handleCapture} 
                            onCancel={() => setShowCamera(false)} 
                        />
                    </div>
                </>
            )}

            <table className='table table-striped table-bordered'>
                <thead className='table-dark'>
                    <tr>
                        <th>Passport</th>
                        <th>Full Name</th>
                        <th>Nationality</th>
                        <th>Blacklist Reason</th>
                        <th>Captured Image</th>
                        <th>Facial Status</th>
                        <th>Actions</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {secondaryPersons.length > 0 ? (
                        secondaryPersons.map(person => (
                            <tr key={person.id}>
                                <td>{person.passportNumber}</td>
                                <td>{person.fullName}</td>
                                <td>{person.nationality}</td>
                                <td>{person.blacklistReason}</td>
                                <td>
                                    {person.capturedImage ? (
                                        <img src={person.capturedImage} alt="Captured" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                                    ) : 'No image'}
                                </td>
                                <td>
                                    {person.requiresRetake ? (
                                        <button className='btn btn-sm btn-primary' onClick={() => openCamera(person.id)}>
                                            Retake Photo
                                        </button>
                                    ) : (
                                        <span className='text-success'>Verified</span>
                                    )}
                                </td>
                                <td>
                                    <button className='btn btn-success btn-sm' onClick={() => releasePerson(person.id)}>
                                        Clear/Release
                                    </button>
                                </td>
                                <td className='text-danger font-weight-bold'>HELD FOR INTERVIEW</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className='text-center'>No one currently in secondary inspection.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SecondaryInspectionComponent;
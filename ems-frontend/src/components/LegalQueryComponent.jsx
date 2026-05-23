import React, { useState } from 'react';
import { queryPersonByPassport, verifyPersonWithImageAPI, markAsSecondary, markAsFacialDerog, completeRetakeAPI, saveAuditLogAPI } from '../service/LegalQueryService';
import { useNavigate } from 'react-router-dom';
import CameraComponent from './CameraComponent';

const LegalQueryComponent = () => {
    const [passportNumber, setPassportNumber] = useState('');
    const [person, setPerson] = useState(null);
    const [error, setError] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const [step, setStep] = useState('INITIAL_CAPTURE'); // New state for workflow: 'INITIAL_CAPTURE' or 'SEARCH'
    const [auditImage, setAuditImage] = useState(null);
    const navigate = useNavigate();

    const resetProcess = () => {
        setStep('INITIAL_CAPTURE');
        setPerson(null);
        setPassportNumber('');
        setAuditImage(null);
        setError('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setPerson(null);
        setShowCamera(false);
        
        const apiCall = auditImage 
            ? verifyPersonWithImageAPI({ passportNumber, capturedImage: auditImage })
            : queryPersonByPassport(passportNumber);

        apiCall.then((response) => {
                const personData = response.data;
                setPerson(personData);
                
                if (personData.isFacialUnmatched) {
                    setShowCamera(true);
                }
            })
            .catch(err => {
                setError("Verification failed or record not found.");
                console.error(err);
        });
    };

    const sendToSecondary = (id) => {
        markAsSecondary(id).then(() => {
            navigate('/secondary-inspection');
        }).catch(err => {
            console.error(err);
        });
    };

    const handleInitialCapture = (image) => {
        console.log("Initial Audit Capture:", image);
        setAuditImage(image);
        saveAuditLogAPI(image).then(() => {
            setStep('SEARCH');
        }).catch(err => console.error("Audit log failed", err));
    };

    const handleFacialDerog = (id) => {
        markAsFacialDerog(id).then(() => {
            navigate('/secondary-inspection');
        }).catch(err => {
            console.error(err);
        });
    };

    const handleCapture = (image) => {
        console.log("Image Captured:", image);
        // The 'image' is the base64 string from CameraComponent
        completeRetakeAPI(person.id, image).then((response) => {
            console.log(response.data); // "Retake completed successfully."
            setShowCamera(false);
            // Refresh data: The status will now be "LEGAL / CLEARED"
            queryPersonByPassport(passportNumber).then(res => setPerson(res.data));
        }).catch(err => {
            console.error(err);
            setError("Failed to save captured image.");
        });
    };

    return (
        <div className='container'>
            <br/><br/>
            {showCamera && person && (
                <>
                    <div className='modal-backdrop-custom' onClick={() => setShowCamera(false)}></div>
                    <div className='modal-overlay p-4 border rounded shadow bg-light mb-4 text-center'>
                        <h4 className='mb-3'>Retake Passenger Image</h4>
                        <CameraComponent 
                            onCapture={handleCapture} 
                            onCancel={() => setShowCamera(false)} 
                        />
                    </div>
                </>
            )}

            {/* STEP 1: INITIAL CAMERA CAPTURE */}
            {step === 'INITIAL_CAPTURE' && (
                <div className='card col-md-8 offset-md-2 shadow'>
                    <div className='card-header bg-primary text-white'>
                        <h3 className='text-center'>Identify Passenger (Live Capture)</h3>
                    </div>
                    <div className='card-body'>
                        <CameraComponent 
                            onCapture={handleInitialCapture} 
                            onCancel={() => setStep('SEARCH')} 
                        />
                        <div className='text-center mt-3'>
                            <button className='btn btn-link text-decoration-none' onClick={() => setStep('SEARCH')}>
                                Skip to Search Record
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: SEARCH AND RESULTS */}
            {step === 'SEARCH' && (
                <div className='card col-md-8 offset-md-2 shadow-sm'>
                <div className='card-header bg-primary text-white'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mb-0'>Legal Status Verification</h3>
                        <button className='btn btn-sm btn-outline-light' onClick={resetProcess}>Start Over</button>
                    </div>
                </div>
                <div className='card-body'>
                    {auditImage && (
                        <div className='text-center mb-3 p-2 border rounded bg-light'>
                            <small className='text-muted d-block mb-1'>Live Session Photo</small>
                            <img src={auditImage} alt="Session" style={{ height: '60px', borderRadius: '4px' }} />
                        </div>
                    )}
                    <form onSubmit={handleSearch}>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Passport Number:</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Passport Number'
                                value={passportNumber}
                                onChange={(e) => setPassportNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button className='btn btn-primary w-100'>Search Record</button>
                    </form>
                    
                    {error && <div className='alert alert-danger mt-3'>{error}</div>}

                    {person && (
                        <div className='mt-4 p-3 border rounded'>
                            <h5>Verification Result:</h5>
                            <hr/>
                            <p><strong>Full Name:</strong> {person.fullName}</p>
                            <p><strong>Nationality:</strong> {person.nationality}</p>
                            <p><strong>DOB:</strong> {person.dateOfBirth}</p>
                            <p><strong>Gender:</strong> {person.gender}</p>
                            <p><strong>State of Origin:</strong> {person.stateOfOrigin}</p>
                            <p><strong>Document Expiry:</strong> {person.documentExpiryDate}</p>
                            
                            {person.capturedImage && (
                                <div className='mb-3 text-center'>
                                    <h6>Captured Image:</h6>
                                    <img src={person.capturedImage} alt="Captured" className='img-thumbnail' style={{ maxWidth: '200px' }} />
                                </div>
                            )}

                            {person.isFacialUnmatched && (
                                <div className='alert alert-warning'>
                                    <strong>FACIAL MATCH FAILED:</strong> Passenger image does not match document.
                                </div>
                            )}

                            <div className={`alert ${(person.isBlacklisted || person.isFacialUnmatched) ? 'alert-danger' : 'alert-success'}`}>
                                <strong>STATUS:</strong> {
                                    person.isBlacklisted ? "CRIMINAL RECORD FOUND / BLACKLISTED" : 
                                    person.isFacialUnmatched ? "FACIAL DEROGATION DETECTED" : "LEGAL / CLEARED"
                                }
                            </div>

                            {person.isBlacklisted && (
                                <div className='mt-2'>
                                    <p className='text-danger'><strong>BLACKLIST REASON:</strong> {person.blacklistReason}</p>
                                </div>
                            )}

                            <div className='mt-4'>
                                {person.isSentToSecondary ? (
                                    <div className='alert alert-warning text-center border-danger'>
                                        <strong>ACTION REQUIRED:</strong> This person has been automatically flagged and held in the Secondary Inspection Queue.
                                    </div>
                                ) : (
                                    <>
                                        {person.isBlacklisted && (
                                            <button className='btn btn-warning mb-2 w-100 font-weight-bold' onClick={() => sendToSecondary(person.id)}>
                                                Proceed to Secondary (CRIMINAL/ILLEGAL)
                                            </button>
                                        )}
                                        {person.isFacialUnmatched && (
                                            <button className='btn btn-danger w-100 font-weight-bold' onClick={() => setShowCamera(true)}>
                                                Retake Photo Immediately (FACIAL DEROG)
                                            </button>
                                        )}
                                        {person.isFacialUnmatched && (
                                            <button className='btn btn-outline-danger mt-2 w-100 font-weight-bold' onClick={() => handleFacialDerog(person.id)}>
                                                Flag & Flag to Secondary Queue
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
    );
};

export default LegalQueryComponent;
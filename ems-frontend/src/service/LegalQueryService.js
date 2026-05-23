import axios from "axios";

const PERSON_API_BASE_URL = "http://localhost:8080/api/persons";

export const queryPersonByPassport = (passportNumber) => axios.get(PERSON_API_BASE_URL + '/query/' + passportNumber);

export const verifyPersonWithImageAPI = (verificationRequest) => axios.post(PERSON_API_BASE_URL + '/verify', verificationRequest);

export const markAsSecondary = (id) => axios.put(`${PERSON_API_BASE_URL}/${id}/secondary`, {});

export const getSecondaryList = () => axios.get(`${PERSON_API_BASE_URL}/secondary`);

export const markAsFacialDerog = (id) => axios.put(`${PERSON_API_BASE_URL}/${id}/facial-derog`, {});

export const completeRetakeAPI = (id, image) => axios.put(`${PERSON_API_BASE_URL}/${id}/retake-complete`, image, { headers: { 'Content-Type': 'text/plain' } });

export const saveAuditLogAPI = (image) => axios.post(`${PERSON_API_BASE_URL}/audit-log`, image, { headers: { 'Content-Type': 'text/plain' } });

export const getPersonStatsAPI = () => axios.get(`${PERSON_API_BASE_URL}/stats`);

export const releaseFromSecondaryAPI = (id) => axios.put(`${PERSON_API_BASE_URL}/${id}/release`, {});
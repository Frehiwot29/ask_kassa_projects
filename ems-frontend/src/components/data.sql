-- Sample Users with different roles
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@ems.com', 'admin123', 'ADMIN');

INSERT INTO users (username, email, password, role) 
VALUES ('officer', 'officer@ems.com', 'officer123', 'OFFICER');

INSERT INTO users (username, email, password, role) 
VALUES ('user', 'user@ems.com', 'user123', 'USER');

-- Sample Persons for Passport Verification Query
-- columns: passport_number, full_name, dob, nationality, gender, state, expiry, blacklisted, reason, sent_to_secondary, facial_unmatched, requires_retake, captured_image

-- Record 1: A legal person
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P12345', 'John Doe', '1990-01-01', 'USA', 'Male', 'New York', '2030-01-01', false, NULL, false, false, false, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');

-- Record 2: A blacklisted person (Criminal)
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P67890', 'Jane Smith', '1985-05-15', 'UK', 'Female', 'London', '2022-01-01', true, 'Visa Expired - Illegal Entry', false, false, false, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');

-- Record 3: A person with a facial mismatch (Derog)
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P11223', 'Abebe Bikila', '1932-08-07', 'Ethiopia', 'Male', 'Shewa', '2028-10-10', false, NULL, false, true, true, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');

-- Record 4: A criminal from Ethiopia
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P99887', 'Mulugeta Tesfaye', '1978-04-20', 'Ethiopia', 'Male', 'Amhara', '2024-05-05', true, 'Criminal Record - Security Concerns', false, false, false, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');

-- Record 5: A legal person from Spain
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P44556', 'Maria Garcia', '1992-02-28', 'Spain', 'Female', 'Madrid', '2025-06-15', false, NULL, false, false, false, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');

-- Record 6: A blacklisted person from Kenya
INSERT INTO persons (passport_number, full_name, date_of_birth, nationality, gender, state_of_origin, document_expiry_date, is_blacklisted, blacklist_reason, is_sent_to_secondary, is_facial_unmatched, requires_retake, captured_image)
VALUES ('P77889', 'Samuel Kamau', '1988-12-12', 'Kenya', 'Male', 'Nairobi', '2021-05-05', true, 'Document Forgery Detected', false, false, false, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
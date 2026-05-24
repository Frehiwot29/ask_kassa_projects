package ask.kassa.ems_backend.service.Impl;

import ask.kassa.ems_backend.dto.PersonDto;
import ask.kassa.ems_backend.entity.Person;
import ask.kassa.ems_backend.entity.AuditRecord;
import ask.kassa.ems_backend.repository.PersonRepository;
import ask.kassa.ems_backend.repository.AuditRecordRepository; // You'll need to create this simple interface
import ask.kassa.ems_backend.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PersonServiceImpl implements PersonService {

    private PersonRepository personRepository;
    private AuditRecordRepository auditRecordRepository;

    @Override
    public PersonDto getPersonByPassport(String passportNumber) {
        Person person = personRepository.findByPassportNumber(passportNumber)
                .orElseThrow(() -> new RuntimeException("Person not found with passport: " + passportNumber));
        return mapToDto(person);
    }

    @Override
    public PersonDto verifyPersonWithImage(String passportNumber, String capturedImage) {
        Person person = personRepository.findByPassportNumber(passportNumber)
                .orElseThrow(() -> new RuntimeException("Person not found with passport: " + passportNumber));

        // SIMULATION: Perform face match check. 
        // Real captures are usually > 1000 chars; placeholder data is < 200.
        boolean isMatch = capturedImage != null && capturedImage.length() > 500;

        person.setCapturedImage(capturedImage);
        if (!isMatch) {
            person.setIsFacialUnmatched(true);
            person.setIsSentToSecondary(true);
            person.setRequiresRetake(true);
        } else {
            person.setIsFacialUnmatched(false);
            // Note: We don't automatically release from secondary here if they were already blacklisted
        }

        personRepository.save(person);
        return mapToDto(person);
    }

    @Override
    public String markAsSecondary(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        person.setIsSentToSecondary(true);
        personRepository.save(person);
        return "Person sent to secondary inspection.";
    }

    @Override
    public List<PersonDto> getSecondaryList() {
        List<Person> secondaryList = personRepository.findByIsSentToSecondary(true);
        return secondaryList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public String markAsFacialDerog(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        person.setIsSentToSecondary(true);
        person.setIsFacialUnmatched(true);
        person.setRequiresRetake(true);
        personRepository.save(person);
        return "Facial derogation recorded. Sent to secondary for retake.";
    }

    @Override
    public String completeRetake(Long id, String capturedImage) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        
        // SIMULATION: Check retake image
        boolean isMatch = capturedImage != null && capturedImage.length() > 500;
        
        person.setCapturedImage(capturedImage);
        if (isMatch) {
            person.setRequiresRetake(false);
            person.setIsFacialUnmatched(false);
        } else {
            person.setIsFacialUnmatched(true);
            person.setIsSentToSecondary(true);
        }
        
        personRepository.save(person);
        return isMatch ? "Match Successful. Facial status cleared." : "Match Failed. Person held in Secondary.";
    }

    @Override
    public Map<String, Long> getPersonStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("inSecondary", personRepository.countByIsSentToSecondary(true));
        stats.put("isBlacklisted", personRepository.countByIsBlacklisted(true));
        return stats;
    }

    @Override
    public String releaseFromSecondary(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        person.setIsSentToSecondary(false);
        person.setRequiresRetake(false);
        personRepository.save(person);
        return "Person released from secondary inspection.";
    }

    @Override
    public String saveAuditLog(String capturedImage) {
        if (capturedImage == null || capturedImage.trim().isEmpty()) {
            throw new RuntimeException("Invalid capture: Image data is missing.");
        }

        AuditRecord record = new AuditRecord();
        record.setCapturedImage(capturedImage);
        record.setTimestamp(LocalDateTime.now());
        auditRecordRepository.save(record);
        return "Audit log recorded in database at " + record.getTimestamp();
    }

    private PersonDto mapToDto(Person person) {
        return new PersonDto(
                person.getId(),
                person.getPassportNumber(),
                person.getFullName(),
                person.getDateOfBirth(),
                person.getNationality(),
                person.getGender(),
                person.getStateOfOrigin(),
                person.getDocumentExpiryDate(),
                person.getIsBlacklisted(),
                person.getBlacklistReason(),
                person.getIsSentToSecondary(),
                person.getIsFacialUnmatched(),
                person.getRequiresRetake(),
                person.getCapturedImage()
        );
    }
}
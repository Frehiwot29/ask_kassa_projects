package ask.kassa.ems_backend.service;

import ask.kassa.ems_backend.dto.PersonDto;
import java.util.List;
import java.util.Map;

import org.jspecify.annotations.Nullable;

public interface PersonService {
    PersonDto getPersonByPassport(String passportNumber);
    PersonDto verifyPersonWithImage(String passportNumber, String capturedImage);
    String markAsSecondary(Long id);
    List<PersonDto> getSecondaryList();
    String markAsFacialDerog(Long id);
    String completeRetake(Long id, String capturedImage);
    Map<String, Long> getPersonStats();
    String releaseFromSecondary(Long id);
    @Nullable
    String saveAuditLog(String capturedImage);
}
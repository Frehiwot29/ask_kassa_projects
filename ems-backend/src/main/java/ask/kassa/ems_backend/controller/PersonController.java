package ask.kassa.ems_backend.controller;

import ask.kassa.ems_backend.dto.PersonDto;
import ask.kassa.ems_backend.dto.PersonVerificationRequestDto;
import ask.kassa.ems_backend.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/persons")
@AllArgsConstructor
public class PersonController {

    private PersonService personService;

    @GetMapping("/query/{passportNumber}")
    public ResponseEntity<PersonDto> getPersonByPassport(@PathVariable String passportNumber) {
        return ResponseEntity.ok(personService.getPersonByPassport(passportNumber));
    }

    @PostMapping("/verify")
    public ResponseEntity<PersonDto> verifyPerson(@RequestBody PersonVerificationRequestDto request) {
        return ResponseEntity.ok(personService.verifyPersonWithImage(request.getPassportNumber(), request.getCapturedImage()));
    }

    @PutMapping("/{id}/secondary")
    public ResponseEntity<String> markAsSecondary(@PathVariable Long id) {
        return ResponseEntity.ok(personService.markAsSecondary(id));
    }

    @GetMapping("/secondary")
    public ResponseEntity<List<PersonDto>> getSecondaryList() {
        return ResponseEntity.ok(personService.getSecondaryList());
    }

    @PutMapping("/{id}/facial-derog")
    public ResponseEntity<String> markAsFacialDerog(@PathVariable Long id) {
        return ResponseEntity.ok(personService.markAsFacialDerog(id));
    }

    @PutMapping("/{id}/retake-complete")
    public ResponseEntity<String> completeRetake(@PathVariable Long id, @RequestBody String capturedImage) {
        return ResponseEntity.ok(personService.completeRetake(id, capturedImage));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getPersonStats() {
        return ResponseEntity.ok(personService.getPersonStats());
    }

    @PutMapping("/{id}/release")
    public ResponseEntity<String> releaseFromSecondary(@PathVariable Long id) {
        return ResponseEntity.ok(personService.releaseFromSecondary(id));
    }

    @PostMapping("/audit-log")
    public ResponseEntity<String> saveAuditLog(@RequestBody String capturedImage) {
        return ResponseEntity.ok(personService.saveAuditLog(capturedImage));
    }
}
package ask.kassa.ems_backend.repository;

import ask.kassa.ems_backend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByPassportNumber(String passportNumber);
    List<Person> findByIsSentToSecondary(Boolean isSentToSecondary);
    long countByIsSentToSecondary(Boolean isSentToSecondary);
    long countByIsBlacklisted(Boolean isBlacklisted);
}
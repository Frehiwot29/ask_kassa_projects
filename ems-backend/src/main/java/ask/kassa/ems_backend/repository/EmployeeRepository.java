package ask.kassa.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ask.kassa.ems_backend.entity.Employee;
import java.util.List;

public interface EmployeeRepository  extends JpaRepository<Employee,Long>{
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String firstName, String lastName, String email);
}

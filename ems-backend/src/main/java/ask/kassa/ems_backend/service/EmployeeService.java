package ask.kassa.ems_backend.service;

import java.util.List;

import ask.kassa.ems_backend.dto.EmployeeDto;

public interface EmployeeService {
    
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployee();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
}

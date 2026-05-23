package ask.kassa.ems_backend.service;

import ask.kassa.ems_backend.dto.DepartmentDto;
import java.util.List;

public interface DepartmentService {
    List<DepartmentDto> getAllDepartments();
}
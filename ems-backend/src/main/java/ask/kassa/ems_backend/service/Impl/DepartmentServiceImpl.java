package ask.kassa.ems_backend.service.Impl;

import ask.kassa.ems_backend.dto.DepartmentDto;
import ask.kassa.ems_backend.entity.Department;
import ask.kassa.ems_backend.repository.DepartmentRepository;
import ask.kassa.ems_backend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department) -> new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        )).collect(Collectors.toList());
    }
}
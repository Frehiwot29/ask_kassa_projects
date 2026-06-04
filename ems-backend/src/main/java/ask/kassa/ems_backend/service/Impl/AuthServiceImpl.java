package ask.kassa.ems_backend.service.Impl;

import ask.kassa.ems_backend.dto.AuthResponseDto;
import ask.kassa.ems_backend.dto.LoginDto;
import ask.kassa.ems_backend.dto.RegisterDto;
import ask.kassa.ems_backend.entity.User;
import ask.kassa.ems_backend.repository.UserRepository;
import ask.kassa.ems_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

    @Override
    public AuthResponseDto login(LoginDto loginDto) {
        // Simple logic for now. In a real app, use Spring Security AuthenticationManager
        String identifier = loginDto.getUsernameOrEmail();
        User user = userRepository.findByUsername(loginDto.getUsernameOrEmail())
                .or(() -> userRepository.findByEmail(loginDto.getUsernameOrEmail()))
                .orElseThrow(() -> new RuntimeException("Auth Failed: User not found with: " + identifier));

        if(!user.getPassword().equals(loginDto.getPassword())) {
            throw new RuntimeException("Auth Failed: Password mismatch for user: " + identifier);
        }
        
        return new AuthResponseDto(user.getUsername(), user.getRole());
    }

    @Override
    public String register(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())) return "Username taken";
        if(userRepository.existsByEmail(registerDto.getEmail())) return "Email already exists";
        
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword()); // Note: Always hash passwords in production!
        user.setRole(registerDto.getRole());
        userRepository.save(user);
        return "User registered successfully!.";
    }
}
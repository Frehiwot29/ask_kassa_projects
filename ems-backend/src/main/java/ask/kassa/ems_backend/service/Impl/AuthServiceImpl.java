package ask.kassa.ems_backend.service.Impl;

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
    public String login(LoginDto loginDto) {
        // Simple logic for now. In a real app, use Spring Security AuthenticationManager
        User user = userRepository.findByUsername(loginDto.getUsernameOrEmail())
                .or(() -> userRepository.findByEmail(loginDto.getUsernameOrEmail()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(loginDto.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return "Logged in successfully!.";
    }

    @Override
    public String register(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())) return "Username taken";
        
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword()); // Note: Always hash passwords in production!
        userRepository.save(user);
        return "User registered successfully!.";
    }
}
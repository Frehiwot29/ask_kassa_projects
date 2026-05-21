package ask.kassa.ems_backend.service;

import ask.kassa.ems_backend.dto.LoginDto;
import ask.kassa.ems_backend.dto.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
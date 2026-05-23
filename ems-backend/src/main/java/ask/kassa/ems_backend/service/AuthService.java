package ask.kassa.ems_backend.service;

import ask.kassa.ems_backend.dto.AuthResponseDto;
import ask.kassa.ems_backend.dto.LoginDto;
import ask.kassa.ems_backend.dto.RegisterDto;

public interface AuthService {
    AuthResponseDto login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
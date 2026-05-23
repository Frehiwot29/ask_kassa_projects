package ask.kassa.ems_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDto {
    private Long id;
    private String passportNumber;
    private String fullName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String gender;
    private String stateOfOrigin;
    private LocalDate documentExpiryDate;
    private Boolean isBlacklisted;
    private String blacklistReason;
    private Boolean isSentToSecondary;
    private Boolean isFacialUnmatched;
    private Boolean requiresRetake;
    private String capturedImage;
}
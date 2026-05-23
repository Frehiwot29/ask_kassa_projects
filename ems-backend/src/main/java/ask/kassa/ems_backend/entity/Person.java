package ask.kassa.ems_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "persons")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String passportNumber;

    @Column(nullable = false)
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

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String capturedImage;
}
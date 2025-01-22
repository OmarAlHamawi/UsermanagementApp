package com.first.project.user_management_system.email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetailsDto {

    private String recipient;
    private String emailBody;
    private String emailSubject;
}

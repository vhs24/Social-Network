package com.se.memberservice.domain.request.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class MemberRegisRequestDto {

    @NotBlank
    @NotNull
    private String memberFName;

    @NotBlank
    @NotNull
    private String memberLName;

    @Email
    private String memberEmail;

    private String memberPhoneNumber;

    @NotBlank
    @NotEmpty
    private String displayName;

    @NotBlank
    @NotNull
    private String loginId;

    @Min(6)
    @Max(24)
    private String password;

    @NotBlank
    @NotEmpty
    private Date dboDt;

}

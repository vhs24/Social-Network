package com.se.memberservice.domain.request.dto;

import lombok.Data;

@Data
public class MemberLoginRequestDto {

	private String loginId;

	private String password;
}
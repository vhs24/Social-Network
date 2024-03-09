package com.se.memberservice.api.form;

import lombok.Data;

@Data
public class LoginMemberRequestDto {

	private String loginId;
	
	private String password;
}

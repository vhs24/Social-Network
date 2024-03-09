package com.se.authservice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetail {

	private Long id;
	private String username;
	private String imageUrl;

}
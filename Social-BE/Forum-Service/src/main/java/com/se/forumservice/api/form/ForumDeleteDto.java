package com.se.forumservice.api.form;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ForumDeleteDto {

	@NotNull
	private Integer forumId;
}

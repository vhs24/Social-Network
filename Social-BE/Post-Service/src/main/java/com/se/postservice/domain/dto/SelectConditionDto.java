package com.se.postservice.domain.dto;

import java.util.Map;

import lombok.Data;

@Data
public class SelectConditionDto {
	Byte type;
	Map<String, Object> condition;
}

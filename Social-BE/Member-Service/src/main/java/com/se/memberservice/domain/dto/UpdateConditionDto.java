package com.se.memberservice.domain.dto;

import java.util.List;

import lombok.Data;

@Data
public class UpdateConditionDto<T> {
	Integer entityId;
	List<T> records;
}

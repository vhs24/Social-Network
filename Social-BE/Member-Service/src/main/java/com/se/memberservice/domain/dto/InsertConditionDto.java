package com.se.memberservice.domain.dto;

import java.util.List;

import lombok.Data;

@Data
public class InsertConditionDto<T> {
	List<T> records;
}

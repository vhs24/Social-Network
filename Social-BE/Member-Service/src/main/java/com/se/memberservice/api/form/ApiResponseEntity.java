package com.se.memberservice.api.form;

import java.util.List;

import lombok.Data;

@Data
public class ApiResponseEntity<T> {

	T data;
	Integer status;
	List<Object> errorList;
}

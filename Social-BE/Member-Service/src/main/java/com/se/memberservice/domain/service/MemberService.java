package com.se.memberservice.domain.service;

import java.util.List;
import java.util.Map;

import com.se.memberservice.domain.dto.InsertConditionDto;
import com.se.memberservice.domain.dto.MemberDto;
import com.se.memberservice.domain.entity.Member;

public interface MemberService {

	List<Member> regisMember(InsertConditionDto<Member> request);

	List<MemberDto> getMemberWithConditonSpecifiedField(Map<String, Object> request);

	List<MemberDto> getMemberWithConditonSpecifiedPattern(Map<String, Object> request);

}

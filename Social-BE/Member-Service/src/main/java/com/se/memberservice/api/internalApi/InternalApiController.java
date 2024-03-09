package com.se.memberservice.api.internalApi;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.memberservice.domain.dto.SelectConditionDto;
import com.se.memberservice.domain.dto.MemberDto;
import com.se.memberservice.domain.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalApiController {

	private final MemberService memberService;
	
	@PostMapping("/member/insert")
	public ResponseEntity<?> insertMember(){
		return null;
	}
	
	@PostMapping("/member/select")
	public ResponseEntity<?> selectMember(@RequestBody SelectConditionDto request){
		List<MemberDto> memberResponses = null;
		if(request.getType().equals(new Byte("0"))) {
			memberResponses = memberService.getMemberWithConditonSpecifiedField(request.getCondition());
		}
		return null;
	}
	
	@PostMapping("/member/update")
	public ResponseEntity<?> updateMember(){
		return null;
	}
	
	@PostMapping("/member/delete")
	public ResponseEntity<?> deleteMember(){
		return null;
	}
}

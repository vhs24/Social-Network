package com.se.memberservice.domain.db.read;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.se.memberservice.domain.dto.MemberDto;

@Mapper
public interface RMemberMapper {

	List<MemberDto> selectWhere(@Param("where") String where);
}

package com.se.memberservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.memberservice.domain.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>{

}

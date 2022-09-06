package com.training.hospital.mapper;

import com.training.hospital.entity.UserCase;
import com.training.hospital.entity.UserCaseExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UserCaseMapper {
    long countByExample ( UserCaseExample example );

    int deleteByExample ( UserCaseExample example );

    int deleteByPrimaryKey ( Long id );

    int insert ( UserCase record );

    int insertSelective ( UserCase record );

    List<UserCase> selectByExample ( UserCaseExample example );

    UserCase selectByPrimaryKey ( Long id );

    int updateByExampleSelective ( @Param("record") UserCase record, @Param("example") UserCaseExample example );

    int updateByExample ( @Param("record") UserCase record, @Param("example") UserCaseExample example );

    int updateByPrimaryKeySelective ( UserCase record );

    int updateByPrimaryKey ( UserCase record );
}
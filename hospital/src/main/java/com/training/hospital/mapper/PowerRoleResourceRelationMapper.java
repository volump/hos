package com.training.hospital.mapper;

import com.training.hospital.entity.PowerRoleResourceRelation;
import com.training.hospital.entity.PowerRoleResourceRelationExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PowerRoleResourceRelationMapper {
    long countByExample ( PowerRoleResourceRelationExample example );

    int deleteByExample ( PowerRoleResourceRelationExample example );

    int deleteByPrimaryKey ( Long id );

    int insert ( PowerRoleResourceRelation record );

    int insertSelective ( PowerRoleResourceRelation record );

    List<PowerRoleResourceRelation> selectByExample ( PowerRoleResourceRelationExample example );

    PowerRoleResourceRelation selectByPrimaryKey ( Long id );

    int updateByExampleSelective ( @Param("record") PowerRoleResourceRelation record, @Param("example") PowerRoleResourceRelationExample example );

    int updateByExample ( @Param("record") PowerRoleResourceRelation record, @Param("example") PowerRoleResourceRelationExample example );

    int updateByPrimaryKeySelective ( PowerRoleResourceRelation record );

    int updateByPrimaryKey ( PowerRoleResourceRelation record );
}
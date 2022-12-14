package com.training.hospital.mapper;

import com.training.hospital.entity.PowerRolePermissionRelation;
import com.training.hospital.entity.PowerRolePermissionRelationExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PowerRolePermissionRelationMapper {
    long countByExample ( PowerRolePermissionRelationExample example );

    int deleteByExample ( PowerRolePermissionRelationExample example );

    int deleteByPrimaryKey ( Long id );

    int insert ( PowerRolePermissionRelation record );

    int insertSelective ( PowerRolePermissionRelation record );

    List<PowerRolePermissionRelation> selectByExample ( PowerRolePermissionRelationExample example );

    PowerRolePermissionRelation selectByPrimaryKey ( Long id );

    int updateByExampleSelective ( @Param("record") PowerRolePermissionRelation record, @Param("example") PowerRolePermissionRelationExample example );

    int updateByExample ( @Param("record") PowerRolePermissionRelation record, @Param("example") PowerRolePermissionRelationExample example );

    int updateByPrimaryKeySelective ( PowerRolePermissionRelation record );

    int updateByPrimaryKey ( PowerRolePermissionRelation record );
}
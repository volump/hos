package com.training.hospital.mapper.dao;

import com.training.hospital.entity.PowerAccountRoleRelation;
import com.training.hospital.entity.PowerResource;
import com.training.hospital.entity.PowerRole;

import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/7/21
 */

public interface PowerAccountRoleRelationDao {
    /**
     * 批量插入用户角色关系
     *
     * @param accountRoleRelationList 账号角色关系列表
     * @return 成功记录数
     */
    int insertList ( List <PowerAccountRoleRelation> accountRoleRelationList );

    /**
     * 获取用于所有角色
     *
     * @param accountId 账号编号
     * @return 账号拥有角色列表
     */
    List<PowerRole> getRoleList ( Long accountId );

    /**
     * 获取用户所有可访问资源
     *
     * @param accountId 账号编号
     * @return 资源列表
     */
    List<PowerResource> getResourceList ( Long accountId );
}

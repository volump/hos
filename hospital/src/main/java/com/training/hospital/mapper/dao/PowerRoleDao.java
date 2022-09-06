package com.training.hospital.mapper.dao;

import com.training.hospital.entity.PowerMenu;
import com.training.hospital.entity.PowerResource;

import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/12
 */

public interface PowerRoleDao {

    /**
     * 通过账号编号，获取菜单列表
     *
     * @param id 账号编号
     * @return 菜单列表
     */
    List<PowerMenu> listMenu ( Long id );

    /**
     * 通过角色编号，获取菜单列表
     *
     * @param roleId 角色编号
     * @return 菜单列表
     */
    List<PowerMenu> listMenuByRoleId ( Long roleId );

    /**
     * 通过角色编号，获取资源列表
     *
     * @param roleId 角色编号
     * @return 资源列表
     */
    List<PowerResource> listResourceByRoleId ( Long roleId );
}

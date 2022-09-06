package com.training.hospital.common.security;

import com.training.hospital.entity.PowerAccount;
import com.training.hospital.entity.PowerResource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * SpringSecurity需要的账号详情
 *
 * @author  jk191's group
 * @date 2022/8/19
 */

public class AccountDetails implements UserDetails {
    //UserDetails：SpringSecurity定义用于封装用户信息的类（主要是用户信息和权限），这里AccountDetails是根据本项目具体实现
    /**
     * 账号信息
     */
    private PowerAccount account;

    /**
     * 账号拥护资源列表
     */
    private List<PowerResource> resourceList;

    public AccountDetails(PowerAccount account, List<PowerResource> resourceList) {
        this.account = account;
        this.resourceList = resourceList;
    }

    /**
     * 获取当前用户所有权限集合
     *
     * @return 当前用户所有权限集合
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        //返回当前用户的角色
        return resourceList.stream()
                .map(role -> new SimpleGrantedAuthority(role.getId() + ":" + role.getName()))
                .collect(Collectors.toList());
    }

    /**
     * 获取当前用户密码
     *
     * @return 当前用户密码
     */
    @Override
    public String getPassword() {
        return account.getPassword();
    }

    /**
     * 获取当前用户账号名称
     *
     * @return 当前账号名称
     */
    @Override
    public String getUsername() {
        return account.getName();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 获取账号是否可用
     *
     * @return 是否可用
     */
    @Override
    public boolean isEnabled() {
        // status： 1 可用，0 禁用
        return account.getStatus() == 1;
    }
}

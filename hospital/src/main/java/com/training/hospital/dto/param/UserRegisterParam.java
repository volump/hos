package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 普通用户基础信息参数
 *
 * @author  jk191's group
 * @date 2022/7/28
 */

@ApiModel(value = "UserRegisterParam",description = "普通用户注册参数")
@Data
public class UserRegisterParam implements Serializable {
    /**
     * 姓名
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "姓名")
    private String name;

    /**
     * 用户头像
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "用户头像")
    private String avatarUrl;

    /**
     * 手机号
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "手机号")
    private String phone;

    /**
     * 登录密码 使用md5加密
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "登录密码 使用md5加密")
    private String password;
    /**
     * openid
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "openid openid")
    private String openid;
}

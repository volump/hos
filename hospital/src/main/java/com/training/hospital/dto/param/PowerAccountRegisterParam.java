package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/7/21
 */

@ApiModel(value = "PowerAccountRegisterParam",description = "账号注册对象参数")
@Data
public class PowerAccountRegisterParam implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 登录账号 唯一
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "登录账号 唯一")
    private String name;

    /**
     * 登录密码 使用md5加密
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "登录密码 使用md5加密")
    private String password;
}

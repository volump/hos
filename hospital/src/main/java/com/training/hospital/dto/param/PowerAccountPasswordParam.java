package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/8/1
 */

@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "PowerAccountPasswordParam", description = "账号修改密码对象参数")
@Data
public class PowerAccountPasswordParam extends PowerAccountRegisterParam implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "短信验证码")
    private String code;
}

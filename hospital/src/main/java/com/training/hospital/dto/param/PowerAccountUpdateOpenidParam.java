package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/7/28
 */
@ApiModel(value = "PowerAccountUpdateOpenidParam", description = "权限账号修改openid参数")
@Data
public class PowerAccountUpdateOpenidParam implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "账号编号")
    private Long accountId;


    @ApiModelProperty(value = "OPenid")
    private String newOpenid;
}
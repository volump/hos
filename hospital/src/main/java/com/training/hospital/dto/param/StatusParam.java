package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/8/11
 */

@ApiModel(value = "StatusParam", description = "状态参数")
@Data
public class StatusParam implements Serializable {

    @ApiModelProperty(value = "状态 1：启用，0：禁用")
    private Integer status;
}

package com.training.hospital.dto.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/8/2
 */

@ApiModel(value = "UserCaseUpdateParam", description = "用户病例更新参数")
@Data
public class UserCaseUpdateParam implements Serializable {

    /**
     * 病例详情
     *
     * @mbg.generated
     */
    @ApiModelProperty(value = "病例详情")
    private String content;
}

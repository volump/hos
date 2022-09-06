package com.training.hospital.dto;

import com.training.hospital.entity.VisitPlan;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author  jk191's group
 * @date 2022/8/2
 */

@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "VisitPlanDTO", description = "出诊计划封装对象")
public class VisitPlanDTO extends VisitPlan {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "医生名称")
    private String doctorName;

    @ApiModelProperty(value = "诊室名称")
    private String clinicName;

    @ApiModelProperty(value = "专科名称")
    private String specialName;

    @ApiModelProperty(value = "门诊名称")
    private String outpatientName;

    @ApiModelProperty(value = "医院名称")
    private String hospitalName;
}

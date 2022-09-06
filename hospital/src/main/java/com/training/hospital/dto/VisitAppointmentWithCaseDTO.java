package com.training.hospital.dto;

import com.training.hospital.entity.UserCase;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author  jk191's group
 * @date 2022/8/12
 */

@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "VisitAppointmentWithCaseDTO", description = "就诊记录详情")
@Data
public class VisitAppointmentWithCaseDTO extends VisitAppointmentDTO {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("病例详情")
    private UserCase userCase;
}

package com.training.hospital.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/19
 */

@ApiModel(value = "VisitDoctorPlanDTO", description = "医生号源情况")
@Data
public class VisitDoctorPlanDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("医生信息")
    private HospitalDoctorDTO doctorDTO;

    @ApiModelProperty("医生出诊信息列表")
    private List<VisitPlanListDTO> planListDTOList;
}

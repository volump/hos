package com.training.hospital.dto;

import com.training.hospital.entity.HospitalInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/19
 */

@Data
@ApiModel(value = "VisitPlanListDTO", description = "医生出诊信息列表")
public class VisitPlanListDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("医院信息")
    private HospitalInfo info;

    @ApiModelProperty("整合剩余挂号数的出诊计划列表")
    private List<VisitPlanResiduesDTO> planResiduesDTOList;
}

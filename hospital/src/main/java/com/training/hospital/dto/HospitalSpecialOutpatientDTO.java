package com.training.hospital.dto;

import com.training.hospital.entity.HospitalOutpatient;
import com.training.hospital.entity.HospitalSpecial;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 医院所属专科以及门诊封装类
 *
 * @author  jk191's group
 * @date 2022/8/5
 */
@ApiModel(value = "HospitalSpecialOutpatientDTO", description = "医院所属专科以及门诊封装类")
@Data
public class HospitalSpecialOutpatientDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "医院专科信息")
    private HospitalSpecial special;

    @ApiModelProperty(value = "专科包含门诊信息列表")
    private List<HospitalOutpatient> outpatientList;
}

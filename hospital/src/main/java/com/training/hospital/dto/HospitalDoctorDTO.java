package com.training.hospital.dto;

import com.training.hospital.entity.HospitalDoctor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/8/18
 */

@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "HospitalDoctorDTO", description = "医生信息封装类")
@Data
public class HospitalDoctorDTO extends HospitalDoctor implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("专科名称")
    private String specialName;

    @ApiModelProperty("门诊名称")
    private String outpatientName;

}

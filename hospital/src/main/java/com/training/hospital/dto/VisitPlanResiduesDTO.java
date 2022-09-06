package com.training.hospital.dto;

import com.training.hospital.entity.VisitPlan;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/19
 */

@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "VisitPlanResiduesDTO", description = "出诊计划含余额数")
@Data
public class VisitPlanResiduesDTO extends VisitPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("对应时间段，剩余号数")
    private List<Integer> residues;

}

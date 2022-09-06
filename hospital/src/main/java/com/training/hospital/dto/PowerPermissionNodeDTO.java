package com.training.hospital.dto;

import com.training.hospital.entity.PowerPermission;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "PowerPermissionNodeDTO", description = "权限及其子权限列表")
@Data
public class PowerPermissionNodeDTO extends PowerPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "子权限列表")
    private List<PowerPermissionNodeDTO> children;
}

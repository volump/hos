package com.training.hospital.dto;

import com.training.hospital.entity.PowerMenu;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/12
 */

@ApiModel(value = "PowerMenuNode", description = "权限菜单节点封装对象")
@Getter
@Setter
public class PowerMenuNode extends PowerMenu {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("子菜单列表")
    private List<PowerMenuNode> children;
}

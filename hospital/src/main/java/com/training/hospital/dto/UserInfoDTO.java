package com.training.hospital.dto;

import com.training.hospital.entity.PowerAccount;
import com.training.hospital.entity.UserBasicInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author  jk191's group
 * @date 2022/8/19
 */

@ApiModel(value = "UserInfoDTO", description = "用户信息封装对象")
@Data
public class UserInfoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("账号信息")
    private PowerAccount account;

    @ApiModelProperty("用户信息")
    private UserBasicInfo basicInfo;

    public void setAccount ( PowerAccount account ) {
        this.account = account;
    }
}

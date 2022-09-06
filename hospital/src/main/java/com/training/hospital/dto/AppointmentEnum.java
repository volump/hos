package com.training.hospital.dto;

import lombok.Getter;

/**
 * @author  jk191's group
 * @date 2022/8/10
 */

@Getter
public enum AppointmentEnum {


    /**
     * 未开始
     */
    WAITING(0),
    /**
     * 失约，迟到
     */
    MISSING(1),
    /**
     * 取消
     */
    CANCEL(2),
    /**
     * 已完成
     */
    FINISH(3);

    /**
     * 预约状态 0：未开始，1：未按时就诊，2：取消预约挂号，3：已完成
     */
    private Integer status;

    AppointmentEnum(Integer status) {
        this.status = status;
    }
}

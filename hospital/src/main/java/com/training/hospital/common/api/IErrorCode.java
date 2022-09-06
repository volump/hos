package com.training.hospital.common.api;

/**
 * 错误码接口
 *
 * @author  jk191's group
 * @date 2022/8/18
 */

public interface IErrorCode {

    /**
     * 获取结果码
     *
     * @return 结果码
     */
    long getCode ();

    /**
     * 返回结果信息
     *
     * @return 结果信息
     */
    String getMessage ();
}

package com.training.hospital.service;

import com.training.hospital.dto.param.UserCaseParam;
import com.training.hospital.dto.param.UserCaseUpdateParam;
import com.training.hospital.entity.UserCase;

import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/2
 */

public interface IUserCaseService {

    /**
     * 创建病例信息
     *
     * @param param 病例参数
     * @return 是否成功
     */
    boolean insert ( UserCaseParam param );

    /**
     * 更新病例信息
     *
     * @param id    病例参数
     * @param param 病例参数
     * @return 是否成功
     */
    boolean update ( Long id, UserCaseUpdateParam param );

    /**
     * 删除病例信息
     *
     * @param id 记录编号
     * @return 是否成功
     */
    boolean delete ( Long id );

    /**
     * 判断病例信息，是否存在
     *
     * @param id 记录编号
     * @return 是否存在
     */
    boolean count ( Long id );

    /**
     * 获取病例信息
     *
     * @param cardId        就诊卡编号
     * @param appointmentId 预约记录
     * @return 是否存在
     */
    UserCase get ( Long cardId, Long appointmentId );


    /**
     * 获取预约记录相关病例
     *
     * @param appointmentId 预约记录编号
     * @return 病例列表
     */
    List<UserCase> listByAppointment ( Long appointmentId );

    /**
     * 获取病例列表
     *
     * @param cardId   就诊卡编号
     * @param pageNum  第几页
     * @param pageSize 页大小
     * @return 病例列表
     */
    List<UserCase> list ( Long cardId, Integer pageNum, Integer pageSize );
}

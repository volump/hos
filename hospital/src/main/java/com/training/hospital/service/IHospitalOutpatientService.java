package com.training.hospital.service;

import com.training.hospital.dto.param.HospitalOutpatientParam;
import com.training.hospital.entity.HospitalOutpatient;

import java.util.List;
import java.util.Optional;

/**
 * @author  jk191's group
 * @date 2022/8/5
 */

public interface IHospitalOutpatientService {
    /**
     * 添加门诊信息
     *
     * @param param 门诊信息参数
     * @return 是否成功
     */
    boolean insert ( HospitalOutpatientParam param );

    /**
     * 更新门诊信息
     *
     * @param id    门诊编号
     * @param param 门诊信息参数
     * @return 是否成功
     */
    boolean update ( Long id, HospitalOutpatientParam param );

    /**
     * 获取门诊信息
     *
     * @param id 门诊编号
     * @return 门诊信息
     */
    Optional<HospitalOutpatient> getOptional ( Long id );

    /**
     * 获取门诊名称
     *
     * @param id 门诊编号
     * @return 门诊名称
     */
    String getName ( Long id );

    /**
     * 删除门诊信息
     *
     * @param id 门诊编号
     * @return 是否成功
     */
    boolean delete ( Long id );

    /**
     * 判断门诊信息是否存在
     *
     * @param id 门诊编号
     * @return 是否存在
     */
    boolean count ( Long id );

    /**
     * 查找门诊列表
     *
     * @param name     门诊名称
     * @param pageNum  第几页
     * @param pageSize 页大小
     * @return 门诊列表
     */
    List<HospitalOutpatient> list ( String name, Integer pageNum, Integer pageSize );

    /**
     * 查找门诊列表
     *
     * @param specialId 门诊编号
     * @param pageNum   第几页
     * @param pageSize  页大小
     * @return 门诊列表
     */
    List<HospitalOutpatient> list ( Long specialId, Integer pageNum, Integer pageSize );

    /**
     * 通过医院编号，专科编号，查找门诊列表
     *
     * @param hospitalId 医院编号
     * @param specialId  专科编号
     * @param pageNum    第几页
     * @param pageSize   页大小
     * @return 门诊列表
     */
    List<HospitalOutpatient> list ( Long hospitalId, Long specialId, Integer pageNum, Integer pageSize );

    /**
     * 查找未添加到医院的门诊编号
     *
     * @param specialId 专科编号
     * @param pageNum   第几页
     * @param pageSize  页大小
     * @return 门诊列表
     */
    List<HospitalOutpatient> listAlone ( Long specialId, Integer pageNum, Integer pageSize );
}

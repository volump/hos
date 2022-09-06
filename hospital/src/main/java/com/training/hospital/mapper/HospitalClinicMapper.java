package com.training.hospital.mapper;

import com.training.hospital.entity.HospitalClinic;
import com.training.hospital.entity.HospitalClinicExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface HospitalClinicMapper {
    long countByExample ( HospitalClinicExample example );

    int deleteByExample ( HospitalClinicExample example );

    int deleteByPrimaryKey ( Long id );

    int insert ( HospitalClinic record );

    int insertSelective ( HospitalClinic record );

    List<HospitalClinic> selectByExample ( HospitalClinicExample example );

    HospitalClinic selectByPrimaryKey ( Long id );

    int updateByExampleSelective ( @Param("record") HospitalClinic record, @Param("example") HospitalClinicExample example );

    int updateByExample ( @Param("record") HospitalClinic record, @Param("example") HospitalClinicExample example );

    int updateByPrimaryKeySelective ( HospitalClinic record );

    int updateByPrimaryKey ( HospitalClinic record );
}
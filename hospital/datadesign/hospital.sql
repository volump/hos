/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/26 23:38:08                           */
/*==============================================================*/


drop table if exists hospital.hospital_clinic;

drop table if exists hospital.hospital_doctor;

drop table if exists hospital.hospital_info;

drop table if exists hospital.hospital_outpatient;

drop table if exists hospital.hospital_outpatient_relation;

drop table if exists hospital.hospital_special;

drop table if exists hospital.hospital_special_relation;

/*==============================================================*/
/* User: hospital                                               */
/*==============================================================*/
create user hospital;

/*==============================================================*/
/* Table: hospital_clinic                                       */
/*==============================================================*/
create table hospital.hospital_clinic
(
   id                   bigint not null auto_increment comment '诊室编号',
   outpatient_id        bigint not null comment '所属门诊',
   address              varchar(128) not null comment '诊室地址',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.hospital_clinic comment '诊室信息表';

/*==============================================================*/
/* Table: hospital_doctor                                       */
/*==============================================================*/
create table hospital.hospital_doctor
(
   id                   bigint not null auto_increment comment '医生编号',
   name                 varchar(32) not null comment '医生姓名',
   gender               int not null default 1 comment '性别：1，男；2，女',
   job_title            varchar(32) not null comment '医生职称',
   specialty            varchar(512) not null comment '医生专长',
   special_id           bigint not null comment '所属专科',
   outpatient_id        bigint not null comment '所属门诊',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id)
);

alter table hospital.hospital_doctor comment '医生信息表';

/*==============================================================*/
/* Table: hospital_info                                         */
/*==============================================================*/
create table hospital.hospital_info
(
   id                   bigint not null auto_increment comment '医院编号 从1001开始',
   name                 varchar(32) not null comment '医院名称',
   phone                varchar(32) comment '医院电话',
   address              varchar(128) comment '医院地址',
   description          varchar(512) comment '医院简介',
   picture              varchar(512) comment '医院图片',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id),
   key hospital_info_phone_uindex (phone)
);

alter table hospital.hospital_info comment '医院信息表';

/*==============================================================*/
/* Table: hospital_outpatient                                   */
/*==============================================================*/
create table hospital.hospital_outpatient
(
   id                   bigint not null auto_increment comment '门诊编号',
   name                 varchar(32) not null comment '门诊名称',
   special_id           bigint not null comment '所属专科',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id)
);

alter table hospital.hospital_outpatient comment '医院门诊表';

/*==============================================================*/
/* Table: hospital_outpatient_relation                          */
/*==============================================================*/
create table hospital.hospital_outpatient_relation
(
   id                   bigint not null auto_increment comment '关系编号',
   hospital_id          bigint not null comment '医院编号',
   outpatient_id        bigint not null comment '门诊编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.hospital_outpatient_relation comment '医院门诊关系表';

/*==============================================================*/
/* Table: hospital_special                                      */
/*==============================================================*/
create table hospital.hospital_special
(
   id                   bigint not null auto_increment comment '专科编号',
   name                 varchar(32) not null comment '专科名称',
   description          varchar(512) not null comment '专科简介',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id),
   key hospital_special_name_uindex (name)
);

alter table hospital.hospital_special comment '医院专科表';

/*==============================================================*/
/* Table: hospital_special_relation                             */
/*==============================================================*/
create table hospital.hospital_special_relation
(
   id                   bigint not null auto_increment comment '关系编号',
   hospital_id          bigint not null comment '医院编号',
   special_id           bigint not null comment '专科编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.hospital_doctor add constraint hospital_doctor_hospital_outpatient_id_fk foreign key (outpatient_id)
      references hospital.hospital_outpatient (id);

alter table hospital.hospital_doctor add constraint hospital_doctor_hospital_special_id_fk foreign key (special_id)
      references hospital.hospital_special (id);

alter table hospital.hospital_outpatient add constraint hospital_outpatient_hospital_special_id_fk foreign key (special_id)
      references hospital.hospital_special (id);

alter table hospital.hospital_outpatient_relation add constraint hospital_outpatient_relation_hospital_info_id_fk foreign key (hospital_id)
      references hospital.hospital_info (id);

alter table hospital.hospital_outpatient_relation add constraint hospital_outpatient_relation_hospital_outpatient_id_fk foreign key (outpatient_id)
      references hospital.hospital_outpatient (id);

alter table hospital.hospital_special_relation add constraint hospital_special_relation_hospital_info_id_fk foreign key (hospital_id)
      references hospital.hospital_info (id);

alter table hospital.hospital_special_relation add constraint hospital_special_relation_hospital_special_id_fk foreign key (special_id)
      references hospital.hospital_special (id);


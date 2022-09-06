/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/27 23:16:54                           */
/*==============================================================*/


drop table if exists hospital.log_account_login;

drop table if exists hospital.log_operation;

drop table if exists hospital.user_basic_info;

drop table if exists hospital.user_case;

drop table if exists hospital.user_medical_card;

drop table if exists hospital.user_medical_card_relation;

/*==============================================================*/
/* User: hospital                                               */
/*==============================================================*/
create user hospital;

/*==============================================================*/
/* Table: log_account_login                                     */
/*==============================================================*/
create table hospital.log_account_login
(
   id                   bigint not null auto_increment comment '登录记录编号',
   account_id           bigint not null comment '账号编号',
   account_name         varchar(32) comment '账号名称',
   ip_address           varchar(32) comment 'ip地址',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.log_account_login comment '账号登录记录表';

/*==============================================================*/
/* Table: log_operation                                         */
/*==============================================================*/
create table hospital.log_operation
(
   id                   bigint not null auto_increment comment '编号',
   account_name         varchar(32) comment '账号名称',
   start_time           bigint comment '开始时间',
   spend_time           int comment '消耗时间',
   description          varchar(512) comment '操作描述',
   base_path            varchar(512) comment '根路径',
   uri                  varchar(512) comment 'uri',
   url                  varchar(512) comment 'url',
   method               varchar(32) comment '请求方法',
   ip_address           varchar(32) comment 'ip地址',
   parameter            varchar(3072) comment '请求参数',
   result               text comment '请求结果',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.log_operation comment '用户操作记录表';

/*==============================================================*/
/* Table: user_basic_info                                       */
/*==============================================================*/
create table hospital.user_basic_info
(
   id                   bigint not null auto_increment comment '编号',
   name                 varchar(32) not null comment '姓名',
   avatar_url           varchar(512) not null comment '用户头像',
   phone                varchar(32) not null comment '手机号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key user_basic_info_phone_uindex (phone)
);

alter table hospital.user_basic_info comment '用户基础信息表';

/*==============================================================*/
/* Table: user_case                                             */
/*==============================================================*/
create table hospital.user_case
(
   id                   bigint not null auto_increment comment '记录编号',
   card_id              bigint not null comment '就诊卡编号',
   appointment_id       bigint not null comment '预约编号',
   doctor_id            bigint not null comment '医生编号',
   content              varchar(512) not null comment '病例详情',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.user_case comment '用户病例表';

/*==============================================================*/
/* Table: user_medical_card                                     */
/*==============================================================*/
create table hospital.user_medical_card
(
   id                   bigint not null auto_increment comment '就诊卡号',
   name                 varchar(32) not null comment '姓名',
   gender               int not null default 1 comment '性别 男：1，女：2',
   phone                varchar(32) not null comment '手机号',
   identification_number varchar(32) not null comment '证件号',
   birth_date           datetime not null comment '出生日期',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key user_medical_card_identification_number_uindex (identification_number)
);

alter table hospital.user_medical_card comment '用户就诊卡信息表';

/*==============================================================*/
/* Table: user_medical_card_relation                            */
/*==============================================================*/
create table hospital.user_medical_card_relation
(
   id                   bigint not null auto_increment comment '关系编号',
   type                 int not null comment '关系类型 0：本人，1：父母，2：兄弟/姐妹，3：伴侣，4：子女，5：同事/朋友，6：其他',
   account_id           bigint not null comment '账号编号',
   card_id              bigint not null comment '就诊卡编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.user_medical_card_relation comment '用户就诊卡关系表';

alter table hospital.user_case add constraint user_case_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);

alter table hospital.user_medical_card_relation add constraint user_medical_card_relation_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);


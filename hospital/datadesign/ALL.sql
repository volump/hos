/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/30 18:22:19                           */
/*==============================================================*/


drop table if exists hospital.hospital_clinic;

drop table if exists hospital.hospital_doctor;

drop table if exists hospital.hospital_info;

drop table if exists hospital.hospital_outpatient;

drop table if exists hospital.hospital_outpatient_relation;

drop table if exists hospital.hospital_special;

drop table if exists hospital.hospital_special_relation;

drop table if exists hospital.log_account_login;

drop table if exists hospital.log_operation;

drop table if exists hospital.power_account;

drop table if exists hospital.power_account_role_relation;

drop table if exists hospital.power_menu;

drop table if exists hospital.power_resource;

drop table if exists hospital.power_resource_category;

drop table if exists hospital.power_role;

drop table if exists hospital.power_role_menu_relation;

drop table if exists hospital.power_role_resource_relation;

drop table if exists hospital.user_basic_info;

drop table if exists hospital.user_case;

drop table if exists hospital.user_medical_card;

drop table if exists hospital.user_medical_card_relation;

drop table if exists hospital.visit_appointment;

drop table if exists hospital.visit_blacklist;

drop table if exists hospital.visit_plan;

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
/* Table: power_account                                         */
/*==============================================================*/
create table hospital.power_account
(
   id                   bigint not null auto_increment comment '编号',
   name                 varchar(32) not null comment '登录账号 唯一',
   password             varchar(512) not null comment '登录密码 使用md5加密',
   status               int not null default 1 comment '账号状态 1：正常，0：锁定',
   login_time           datetime comment '最后登录时间',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key power_account_name_uindex (name)
);

alter table hospital.power_account comment '账号信息表';

/*==============================================================*/
/* Table: power_account_role_relation                           */
/*==============================================================*/
create table hospital.power_account_role_relation
(
   id                   bigint not null auto_increment comment '账号角色关系编号',
   account_id           bigint not null comment '账号编号',
   role_id              bigint not null comment '角色编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.power_account_role_relation comment '账号角色关系表';

/*==============================================================*/
/* Table: power_menu                                            */
/*==============================================================*/
create table hospital.power_menu
(
   id                   bigint not null auto_increment comment '菜单编号',
   parent_id            bigint comment '父级菜单',
   title                varchar(32) not null comment '菜单名称',
   level                int not null comment '菜单级数',
   sort                 int not null comment '菜单排序',
   name                 varchar(32) not null comment '前端路径',
   icon                 varchar(32) not null comment '前端图标',
   hidden               int not null default 1 comment '前端隐藏 0：隐藏，1：显示',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key power_menu_name_uindex (name),
   key power_menu_title_uindex (title)
);

alter table hospital.power_menu comment '权限菜单表';

/*==============================================================*/
/* Table: power_resource                                        */
/*==============================================================*/
create table hospital.power_resource
(
   id                   bigint not null auto_increment comment '资源编号',
   category_id          bigint not null comment '资源分类编号',
   name                 varchar(32) not null comment '资源名称',
   url                  varchar(32) not null comment '资源URL',
   description          varchar(64) not null comment '资源描述',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key power_resource_name_uindex (name),
   key power_resource_url_uindex (url)
);

alter table hospital.power_resource comment '权限资源表';

/*==============================================================*/
/* Table: power_resource_category                               */
/*==============================================================*/
create table hospital.power_resource_category
(
   id                   bigint not null auto_increment comment '分类编号',
   name                 varchar(32) not null comment '分类名称',
   sort                 int not null default 1 comment '分类排序 数值越小，越靠前',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key power_resource_category_name_uindex (name)
);

alter table hospital.power_resource_category comment '权限资源分类表';

/*==============================================================*/
/* Table: power_role                                            */
/*==============================================================*/
create table hospital.power_role
(
   id                   bigint not null auto_increment comment '角色编号',
   name                 varchar(32) not null comment '英文名称',
   chinese_name         varchar(32) not null comment '中文名称',
   admin_count          int not null default 0 comment '用户数目',
   sort                 int not null default 0 comment '排序 越小越靠前',
   status               int not null default 1 comment '角色状态 1：启用，0：禁用',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id),
   key power_role_name_uindex (name)
);

alter table hospital.power_role comment '权限角色表';

/*==============================================================*/
/* Table: power_role_menu_relation                              */
/*==============================================================*/
create table hospital.power_role_menu_relation
(
   id                   bigint not null auto_increment comment '关系编号',
   role_id              bigint not null comment '角色编号',
   menu_id              bigint not null comment '菜单编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.power_role_menu_relation comment '角色菜单关系表';

/*==============================================================*/
/* Table: power_role_resource_relation                          */
/*==============================================================*/
create table hospital.power_role_resource_relation
(
   id                   bigint not null auto_increment comment '关系编号',
   role_id              bigint not null comment '角色编号',
   resource_id          bigint not null comment '资源编号',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.power_role_resource_relation comment '角色资源关系表';

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

/*==============================================================*/
/* Table: visit_appointment                                     */
/*==============================================================*/
create table hospital.visit_appointment
(
   id                   bigint not null auto_increment comment '预约编号',
   plan_id              bigint not null comment '出诊编号',
   card_id              bigint not null comment '就诊卡号',
   account_id           bigint not null comment '账号编号',
   time_period          int not null comment '1： 8点半~9点，2： 9点~9点半，3： 9点半~10点，4： 10点~10点半，5： 11点~11点半，6： 11点半~12点，7：2点~2点半，8： 2点半~3点，9： 3点~3点半，10： 3点半~4点，11： 4点~4点半，12： 4点半~5点，13： 5点~5点半，14：5点半~6点',
   status               int not null default 0 comment '预约状态 0：未开始，1：未按时就诊，2：取消预约挂号，3：已完成',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.visit_appointment comment '出诊预约表';

/*==============================================================*/
/* Table: visit_blacklist                                       */
/*==============================================================*/
create table hospital.visit_blacklist
(
   id                   bigint not null auto_increment comment '名单编号',
   card_id              bigint not null comment '就诊卡号',
   status               int not null default 1 comment '禁封状态 1：生效，2：已解封',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.visit_blacklist comment '出诊黑名单';

/*==============================================================*/
/* Table: visit_plan                                            */
/*==============================================================*/
create table hospital.visit_plan
(
   id                   bigint not null auto_increment comment '出诊编号',
   hospital_id          bigint not null comment '医院编号',
   special_id           bigint not null comment '专科编号',
   outpatient_id        bigint not null comment '门诊编号',
   clinic_id            bigint not null comment '诊室编号',
   doctor_id            bigint not null comment '医生编号',
   time                 int not null default 1 comment '时间段 1：上午，2：下午',
   day                  datetime not null default CURRENT_TIMESTAMP comment '出诊日期',
   gmt_create           datetime not null default CURRENT_TIMESTAMP comment '创建时间',
   gmt_modified         datetime not null default CURRENT_TIMESTAMP comment '更新时间',
   primary key (id)
);

alter table hospital.visit_plan comment '出诊信息表';

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

alter table hospital.log_account_login add constraint log_account_login_power_account_id_fk foreign key (account_id)
      references hospital.power_account (id);

alter table hospital.log_operation add constraint log_operation_power_account_name_fk foreign key (account_name)
      references hospital.power_account (id);

alter table hospital.power_account_role_relation add constraint power_account_role_relation_power_account_id_fk foreign key (account_id)
      references hospital.power_account (id);

alter table hospital.power_account_role_relation add constraint power_account_role_relation_power_role_id_fk foreign key (role_id)
      references hospital.power_role (id);

alter table hospital.power_resource add constraint power_resource_power_resource_category_id_fk foreign key (category_id)
      references hospital.power_resource_category (id);

alter table hospital.power_role_menu_relation add constraint power_role_menu_relation_power_menu_id_fk foreign key (menu_id)
      references hospital.power_menu (id);

alter table hospital.power_role_menu_relation add constraint power_role_menu_relation_power_role_id_fk foreign key (role_id)
      references hospital.power_role (id);

alter table hospital.power_role_resource_relation add constraint power_role_resource_relation_power_resource_id_fk foreign key (resource_id)
      references hospital.power_resource (id);

alter table hospital.power_role_resource_relation add constraint power_role_resource_relation_power_role_id_fk foreign key (role_id)
      references hospital.power_role (id);

alter table hospital.user_basic_info add constraint user_basic_info_power_account_name_fk foreign key (phone)
      references hospital.power_account (id);

alter table hospital.user_case add constraint user_case_hospital_doctor_id_fk foreign key (doctor_id)
      references hospital.hospital_doctor (id);

alter table hospital.user_case add constraint user_case_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);

alter table hospital.user_medical_card_relation add constraint user_medical_card_relation_power_account_id_fk foreign key (account_id)
      references hospital.power_account (id);

alter table hospital.user_medical_card_relation add constraint user_medical_card_relation_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);

alter table hospital.visit_appointment add constraint visit_order_power_account_id_fk foreign key (account_id)
      references hospital.power_account (id);

alter table hospital.visit_appointment add constraint visit_order_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);

alter table hospital.visit_appointment add constraint visit_order_visit_plan_id_fk foreign key (plan_id)
      references hospital.visit_plan (id);

alter table hospital.visit_blacklist add constraint visit_blacklist_user_medical_card_id_fk foreign key (card_id)
      references hospital.user_medical_card (id);

alter table hospital.visit_plan add constraint visit_plan_hospital_clinic_id_fk foreign key (clinic_id)
      references hospital.hospital_clinic (id);

alter table hospital.visit_plan add constraint visit_plan_hospital_doctor_id_fk foreign key (doctor_id)
      references hospital.hospital_doctor (id);

alter table hospital.visit_plan add constraint visit_plan_hospital_info_id_fk foreign key (hospital_id)
      references hospital.hospital_info (id);

alter table hospital.visit_plan add constraint visit_plan_hospital_outpatient_id_fk foreign key (outpatient_id)
      references hospital.hospital_outpatient (id);

alter table hospital.visit_plan add constraint visit_plan_hospital_special_id_fk foreign key (special_id)
      references hospital.hospital_special (id);


/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/29 22:44:49                           */
/*==============================================================*/


drop table if exists hospital.visit_appointment;

drop table if exists hospital.visit_blacklist;

drop table if exists hospital.visit_plan;

/*==============================================================*/
/* User: hospital                                               */
/*==============================================================*/
create user hospital;

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

alter table hospital.visit_appointment add constraint visit_order_visit_plan_id_fk foreign key (plan_id)
      references hospital.visit_plan (id);


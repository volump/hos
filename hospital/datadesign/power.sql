/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/7/28 11:18:21                           */
/*==============================================================*/


drop table if exists hospital.power_account;

drop table if exists hospital.power_account_role_relation;

drop table if exists hospital.power_menu;

drop table if exists hospital.power_resource;

drop table if exists hospital.power_resource_category;

drop table if exists hospital.power_role;

drop table if exists hospital.power_role_menu_relation;

drop table if exists hospital.power_role_resource_relation;

/*==============================================================*/
/* User: hospital                                               */
/*==============================================================*/
create user hospital;

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


package com.training.hospital.config;

import lombok.Getter;
import lombok.Setter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * Mybatis 配置类
 *
 * @author  jk191's group
 * @date 2022/8/19
 */

@MapperScan("com.training.hospital.mapper")
@Configuration
public class MybatisConfig {
}

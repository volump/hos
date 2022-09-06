package com.training.hospital.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author  jk191's group
 * @date 2022/8/12
 */

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "secure.ignored")
public class IgnoreUrlsConfig {

    /**
     * 请求白名单
     */
    private List<String> urls = new ArrayList<>();

    public void setUrls ( List <String> urls ) {
        this.urls = urls;
    }
}

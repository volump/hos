package com.training.hospital.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;
@Component
@ConfigurationProperties(prefix = "wx")
@EnableConfigurationProperties(WxConfig.class)
public class WxConfig {
    private String appId;
    private String appSecret;
    private String server;
    private String qrCodeUrl;
    private String tokenUrl;
    private String openIdUrl;
    private String userInfoUrl;

    public String getAppId () {
        return appId;
    }

    public void setAppId ( String appId ) {
        this.appId = appId;
    }

    public String getAppSecret () {
        return appSecret;
    }

    public void setAppSecret ( String appSecret ) {
        this.appSecret = appSecret;
    }

    public String getServer () {
        return server;
    }

    public void setServer ( String server ) {
        this.server = server;
    }

    public String getQrCodeUrl () {
        return qrCodeUrl;
    }

    public void setQrCodeUrl ( String qrCodeUrl ) {
        this.qrCodeUrl = qrCodeUrl;
    }

    public String getTokenUrl () {
        return tokenUrl;
    }

    public void setTokenUrl ( String tokenUrl ) {
        this.tokenUrl = tokenUrl;
    }

    public String getOpenIdUrl () {
        return openIdUrl;
    }

    public void setOpenIdUrl ( String openIdUrl ) {
        this.openIdUrl = openIdUrl;
    }

    public String getUserInfoUrl () {
        return userInfoUrl;
    }

    public void setUserInfoUrl ( String userInfoUrl ) {
        this.userInfoUrl = userInfoUrl;
    }
}

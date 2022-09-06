package com.training.hospital.controller;

import com.training.hospital.common.api.CommonResult;
import com.training.hospital.component.QiniuComponent;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * @author  jk191's group
 * @date 2022/8/6
 */
@Api(value = "图片模块", tags = "图片接口")
@RestController
@CrossOrigin
@RequestMapping("/picture")
public class PictureController {

    @Resource
    private QiniuComponent qiniuComponent;

    @ApiOperation(value = "上传图片，返回图片url", notes = "传入 图片文件")
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public CommonResult<String> uploadPicture(@RequestParam MultipartFile file) {

        if (file.isEmpty()) {
            return CommonResult.validateFailed("上传图片为空！");
        }

        String url = qiniuComponent.uploadFile(file);

        if (!StringUtils.isEmpty(url)) {
            return CommonResult.success(url);
        }

        return CommonResult.failed("服务器错误，请联系管理员！");
    }
}

package com.training.hospital.controller;

import com.training.hospital.common.api.CommonPage;
import com.training.hospital.common.api.CommonResult;
import com.training.hospital.dto.UserCreditDTO;
import com.training.hospital.entity.VisitAppointment;
import com.training.hospital.service.IPowerAccountService;
import com.training.hospital.service.IUserMedicalCardService;
import com.training.hospital.service.IVisitAppointmentService;
import com.training.hospital.service.IVisitBlacklistService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author  jk191's group
 * @date 2022/7/21
 */

@Api(value = "出诊模块", tags = "出诊信用接口")
@RestController
@CrossOrigin
@RequestMapping("/visit")
public class VisitCreditController {

    @Resource
    private IVisitBlacklistService blacklistService;

    @Resource
    private IUserMedicalCardService userMedicalCardService;

    @Resource
    private IPowerAccountService accountService;

    @Resource
    private IVisitAppointmentService appointmentService;

    @ApiOperation(value = "验证就诊卡号是否黑名单", notes = "传入 就诊卡号")
    @RequestMapping(value = "/black/verify", method = RequestMethod.GET)
    public CommonResult verifyBlack(@RequestParam Long cardId) {
        if (!userMedicalCardService.countCardId(cardId)) {
            return CommonResult.validateFailed("不存在，该就诊卡号！");
        }

        // 自动解绑黑名单
        blacklistService.autoUnlock();

        return CommonResult.success(blacklistService.isForbid(cardId));
    }

    @ApiOperation(value = "获取当月信用详情", notes = "传入 账号编号、就诊卡编号")
    @RequestMapping(value = "/credit/current", method = RequestMethod.GET)
    public CommonResult<UserCreditDTO> getCurrentCredit(@RequestParam Long accountId, @RequestParam Long cardId) {

        if (!userMedicalCardService.countCardId(cardId)) {
            return CommonResult.validateFailed("不存在，该就诊卡编号！");
        }

        if (!accountService.count(accountId)) {
            return CommonResult.validateFailed("不存在，该账号编号！");
        }

        return CommonResult.success(appointmentService.getCurrentCredit(accountId, cardId));
    }

    @ApiOperation(value = "获取以往信用详情", notes = "传入 账号编号、就诊卡编号")
    @RequestMapping(value = "/credit/all", method = RequestMethod.GET)
    public CommonResult<UserCreditDTO> getAllCredit(@RequestParam Long accountId, @RequestParam Long cardId) {

        if (!userMedicalCardService.countCardId(cardId)) {
            return CommonResult.validateFailed("不存在，该就诊卡编号！");
        }

        if (!accountService.count(accountId)) {
            return CommonResult.validateFailed("不存在，该账号编号！");
        }

        return CommonResult.success(appointmentService.getAllCredit(accountId, cardId));
    }

    @ApiOperation(value = "获取失信记录", notes = "传入就诊卡编号")
    @RequestMapping(value = "/credit/miss", method = RequestMethod.GET)
    public CommonResult<CommonPage<VisitAppointment>> listMissRecord(@RequestParam Long cardId,
                                                                     @RequestParam Integer pageNum,
                                                                     @RequestParam Integer pageSize) {

        // TODO 需要帮人帮人挂号的失信情况
        return CommonResult.success(CommonPage.restPage(appointmentService.listMiss(cardId, pageNum, pageSize)));

    }
}

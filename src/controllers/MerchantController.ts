import {Body, Get, JsonController, Post, Req, Res, UseBefore} from "routing-controllers";
import Controller from "./Controller";
import Merchant from "../models/merchant";
import {MerchantCreateRequestInterface} from "./index";
import {check, Result, ValidationError, validationResult} from "express-validator";
import {Request, Response} from "express";

@JsonController()
export default class MerchantController extends Controller {

    @Get('/')
    async get() {
        this.response.data = await Merchant.findAll({raw: true})
        return this.response
    }

    @Post('/')
    @UseBefore(
        check('name', "Field is required").notEmpty(),
        check('notification_webhook', "Field is required").notEmpty(),
        check('secret_key', "Field is required").notEmpty()
    )
    async create(@Req() request : Request, @Res() response : Response, @Body() data : MerchantCreateRequestInterface){
        this.response = {message: "", success: true}

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return this.throwValidationError(errors, response)
        }

        const merchant = await Merchant.create(data)
        this.response.data = merchant

        return response.send(this.response)
    }
}
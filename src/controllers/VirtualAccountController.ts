import {Body, Get, JsonController, Param, Post, Req, Res, UseBefore} from "routing-controllers";
import Controller from "./Controller";
import {VirtualAccountPaymentInterface} from "./index";
import {Request, Response} from "express";
import {check, param, validationResult} from "express-validator";
import VirtualAccount from "../models/virtualaccount";
import Invoice from "../models/invoice";
import {sequelize} from "../models";
import Payment from "../models/payment";
import {v4 as uuidv4} from 'uuid';
import Notification from "../util/notification";


@JsonController()
export default class VirtualAccountController extends Controller{

    @Get('/notify/:uuid')
    public async get(@Param('uuid') uuid: string) {
        const payment = await Payment.findOne({
            where: {
                uuid : uuid
            },
            raw : true
        })

        if (payment != null){
            const notification = new Notification()
            await notification.send(payment)
        }

        return this.response
    }

    @Post('/pay')
    @UseBefore(
        check('bank_code', "Field is required").notEmpty(),
        check('virtual_account', "Field is required").notEmpty(),
        check('amount', "Field is required").notEmpty(),
        check('amount', "Field is should be numeric").isNumeric(),
    )
    public async post(@Req() request: Request, @Res() response: Response, @Body() data: VirtualAccountPaymentInterface) {
        this.response = {message: "", success: true}
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return this.throwValidationError(errors, response)
        }

        const va = await VirtualAccount.findOne({
            where: {account_number: data.virtual_account}
        })

        if (va === null){
            this.response = {message: "Account not found", success : false}
            response.status(400)
            return this.response
        }

        const invoice = await Invoice.findOne({
            where : {
                virtual_account_id : va.id,
                status : 1,
                amount : data.amount
            },
            raw : true
        })

        if (invoice === null){
            this.response = {message: "Nothing unpaid invoice found", success : false}
            response.status(400)
            return this.response
        }

        const transaction = await sequelize.transaction()
        try {
            await Invoice.update({ status: 2 }, {
                where: {
                    id: invoice.id
                }
            });

            const payment = await Payment.create({
                invoice_id : invoice.id,
                uuid: uuidv4(),
                payment_date: new Date(),
                notification_status: 1,
                notification_sending: 0,
            })

            const notification = new Notification()
            notification.send(payment)

            await transaction.commit()
        } catch (e) {
            await transaction.rollback()

            response.status(400)
            this.response.success = false
            this.response.message = e.message
        }

        return this.response
    }
}
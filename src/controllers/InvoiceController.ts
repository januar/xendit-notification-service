import {Body, JsonController, Post, Req, Res, UseBefore} from "routing-controllers";
import Controller from "./Controller";
import {InvoiceCreateRequestInterface} from "./index";
import {Request, Response} from "express";
import {body, check, validationResult} from "express-validator";
import Bank from "../models/bank";
import VirtualAccount from "../models/virtualaccount";
import Invoice from "../models/invoice";
import {v4 as uuidv4} from 'uuid';
import {sequelize} from "../models";

@JsonController()
export default class InvoiceController extends Controller {

    @Post()
    @UseBefore(
        check('merchant_id', "Field is required").notEmpty(),
        check('transaction_id', "Field is required").notEmpty(),
        check('external_id', "Field is required").notEmpty(),
        check('bank_code', "Field is required").notEmpty(),
        check('name', "Field is required").notEmpty(),
        check('amount', "Field is required").notEmpty(),
        check('amount', "Field is should be numeric").isNumeric(),
    )
    async create(@Req() request: Request, @Res() response: Response, @Body() data: InvoiceCreateRequestInterface) {
        this.response = {message: "", success: true}
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return this.throwValidationError(errors, response)
        }

        // check bank is available
        const bank = await Bank.findOne({
            where: {code: data.bank_code},
            raw: true
        })

        if (bank === null) {
            this.response.message = "Bank not available";
            return response.status(400).send(this.response)
        }

        const transaction = await sequelize.transaction()
        try {
            let va: VirtualAccount = await VirtualAccount.findOne({
                where: {
                    merchant_id: data.merchant_id,
                    bank_id: bank.id,
                    account_number: bank.merchant_code + data.external_id
                }
            })

            if (va === null) {
                va = await VirtualAccount.create({
                    merchant_id: data.merchant_id,
                    bank_id: bank.id,
                    external_id: data.external_id,
                    account_number: bank.merchant_code + data.external_id,
                    bank_code: bank.code,
                    name: data.name
                })
            }

            const invoice = await Invoice.create({
                virtual_account_id: va.id,
                transaction_id: data.transaction_id,
                uuid: uuidv4(),
                amount: data.amount,
                date: new Date(),
                status: 1
            })

            this.response.data = {
                va_number: va.account_number,
                bank_code: va.bank_code,
                invoice_id: invoice.uuid,
                status: invoice.getStatusLabel()
            }

            await transaction.commit();
        } catch (e) {
            await transaction.rollback()

            response.status(400)
            this.response.success = false
            this.response.message = e.message
        }

        return this.response
    }
}
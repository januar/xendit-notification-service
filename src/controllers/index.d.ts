import {ValidationError} from "express-validator";
import {MerchantAttribute} from "../models/merchant";
import {InvoiceAttribute} from "../models/invoice";

export interface JsonResponse {
    success: boolean,
    message: string,
    data?: any,
    errors?: ValidationError[]
}

export interface VirtualAccountPaymentInterface {
    bank_code: string,
    virtual_account: string,
    amount: number
}

export interface InvoiceCreateRequestInterface extends InvoiceAttribute {
    merchant_id: number,
    bank_code: string,
    external_id: string,
    name: string
}

export interface MerchantCreateRequestInterface extends MerchantAttribute {

}
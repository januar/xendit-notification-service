import Payment, {STATUS_FAILED, STATUS_PENDING, STATUS_PERMANENT_FAILED, STATUS_SUCCESS} from "../models/payment";
import Invoice from "../models/invoice";
import axios from "axios";
import VirtualAccount from "../models/virtualaccount";
import Merchant from "../models/merchant";
import {Op, or} from "sequelize";


class Notification {

    async send(payment: Payment) {
        if (payment.notification_status == STATUS_SUCCESS || payment.notification_status == STATUS_PERMANENT_FAILED) {
            console.log("Notification not send : Status " + payment.notification_status)
        } else {
            if (payment.notification_sending === 5) {
                console.log("Notification set to STATUS_PERMANENT_FAILED")
            } else {
                payment.notification_sending++;
                payment.last_send = new Date()

                const invoice = await Invoice.findOne({
                    where: {id: payment.invoice_id}
                })
                const va = await VirtualAccount.findOne({
                    where: {id: invoice.virtual_account_id}
                })
                const merchant = await Merchant.findOne({
                    where: {id: va.merchant_id}
                })

                axios.post(merchant.notification_webhook, {
                    transaction_id : invoice.transaction_id,
                    virtual_account : va.account_number,
                    amount : invoice.amount,
                    status : invoice.getStatusLabel(),
                    uuid : payment.uuid,
                    payment_date : payment.payment_date
                }).then(response => {
                    Payment.update({
                        notification_status : STATUS_SUCCESS,
                        notification_sending : payment.notification_sending,
                        last_send: payment.last_send
                    }, {
                        where: {id: payment.id}
                    })
                    console.log("Sending Notification Success")
                }).catch(error => {
                    Payment.update({
                        notification_status : STATUS_FAILED,
                        notification_sending : payment.notification_sending,
                        last_send: payment.last_send
                    }, {
                        where: {id: payment.id}
                    })
                    console.log("Sending Notification Failed")
                })
            }
        }
    }

    async sendAll() {
        const payments = await Payment.findAll({
            where: {
                notification_status : {
                    [Op.or] : [STATUS_PENDING, STATUS_FAILED]
                }
            }
        })

        payments.map(item => {
            const now = new Date()
            const diff = (now.getTime() - item.last_send.getTime()) / 1000
            if ( diff > 30 ) {
                this.send(item)
            } else {
                console.log("Payment " + item.uuid + " will be send at next process")
            }
        })
    }
}

export default Notification
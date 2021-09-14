'use strict';

import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "./index";

export const STATUS_PENDING = 1;
export const STATUS_SUCCESS = 2;
export const STATUS_FAILED = 0;
export const STATUS_PERMANENT_FAILED = -1;

interface PaymentAttribute {
  id: number,
  invoice_id: number,
  uuid: string,
  payment_date: Date,
  notification_status: number,
  notification_sending:number,
  last_send?:Date
}

interface PaymentCreationAttribute extends Optional<PaymentAttribute, 'id'> {
}

class Payment extends Model<PaymentAttribute, PaymentCreationAttribute> implements PaymentAttribute{
  id: number;
  invoice_id: number;
  last_send: Date;
  notification_status: number;
  payment_date: Date;
  notification_sending: number;
  uuid: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  /*static associate(models) {
    // define association here
  }*/
};
Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  invoice_id: DataTypes.INTEGER,
  uuid: DataTypes.STRING,
  payment_date: DataTypes.DATE,
  notification_status: DataTypes.INTEGER,
  notification_sending: DataTypes.INTEGER,
  last_send: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'Payments'
});

export default Payment
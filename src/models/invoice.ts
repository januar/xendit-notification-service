'use strict';

import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "./index";

export interface InvoiceAttribute {
    id: number,
    virtual_account_id: number,
    transaction_id: string,
    uuid: string,
    amount: string,
    date: Date,
    status: number
}

interface InvoiceCreationAttribute extends Optional<InvoiceAttribute, 'id'> {
}

class Invoice extends Model<InvoiceAttribute, InvoiceCreationAttribute> implements InvoiceAttribute {
    amount: string;
    date: Date;
    id: number;
    status: number;
    transaction_id: string;
    uuid: string;
    virtual_account_id: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*static associate(models) {
      // define association here
    }*/


    getStatusLabel() {
        const statusLabel : string[] = ['CANCEL','PENDING', 'PAID'];

        return statusLabel[this.status]
    }
};
Invoice.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    virtual_account_id: DataTypes.INTEGER,
    transaction_id : DataTypes.STRING,
    uuid: {
        type : DataTypes.UUIDV4
    },
    amount: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'Invoices'
});

export default Invoice
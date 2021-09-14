'use strict';

import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "./index";

export interface BankAttribute {
    id: number,
    name: string,
    code: string,
    merchant_code: string
}

interface BankCreationAttribute extends Optional<BankAttribute, 'id'> {
}

class Bank extends Model<BankAttribute, BankCreationAttribute> implements BankAttribute {
    code: string;
    id: number;
    merchant_code: string;
    name: string;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
};
Bank.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    merchant_code: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Bank',
    tableName: 'Banks'
});

export default Bank
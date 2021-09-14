'use strict';
import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "./index";

interface VirtualAccountAttribute {
    id: number,
    merchant_id: number,
    bank_id: number,
    external_id: string,
    account_number: string,
    bank_code: string,
    name: string
}

interface VirtualAccountCreationAttribute extends Optional<VirtualAccountAttribute, 'id'> {
}

class VirtualAccount extends Model<VirtualAccountAttribute, VirtualAccountCreationAttribute> implements VirtualAccountAttribute {
    account_number: string;
    bank_code: string;
    external_id: string;
    id: number;
    merchant_id: number;
    bank_id: number;
    name: string;
    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
};

VirtualAccount.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    merchant_id: DataTypes.INTEGER,
    bank_id: DataTypes.INTEGER,
    external_id: DataTypes.STRING,
    account_number: DataTypes.STRING,
    bank_code: DataTypes.STRING,
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'VirtualAccounts',
    tableName: 'VirtualAccounts',
    timestamps: true,
    underscored: true
});

export default VirtualAccount
'use strict';
import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "./index";

export interface MerchantAttribute {
    id: number,
    name: string,
    notification_webhook: string,
    secret_key: string
}

interface MerchantCreationAttribute extends Optional<MerchantAttribute, 'id'> {
}

class Merchant extends Model<MerchantAttribute, MerchantCreationAttribute> implements MerchantAttribute{
    public id: number;
    public name: string;
    public notification_webhook: string;
    public secret_key: string;
    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

};
Merchant.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notification_webhook: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    secret_key: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Merchant',
    timestamps: true,
    underscored: true,
    tableName:'Merchants'
});

export default Merchant
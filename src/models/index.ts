'use strict';

import {Options, Sequelize} from "sequelize";
import config from "../config/database";

// @ts-ignore
let sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);

export {sequelize, Sequelize};

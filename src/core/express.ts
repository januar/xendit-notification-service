import {useExpressServer} from "routing-controllers";
import morgan from "morgan"
import express from "express";
import VirtualAccountController from "../controllers/VirtualAccountController";
import MerchantController from "../controllers/MerchantController";
import bodyParser from "body-parser";
import InvoiceController from "../controllers/InvoiceController";

const app = express()

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app,{
    routePrefix : 'virtual-account',
    controllers : [VirtualAccountController]
});

useExpressServer(app, {
    routePrefix : "merchant",
    controllers: [MerchantController]
})

useExpressServer(app, {
    routePrefix : "invoice",
    controllers: [InvoiceController]
})

app.use(morgan("combined"))

export default app
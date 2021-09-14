import {JsonResponse} from "./index";
import {Result, ValidationError} from "express-validator";
import {Response} from "express";

export default class Controller{
    response : JsonResponse

    constructor() {
        this.response = {
            success: true,
            message: "",
        }
    }

    throwValidationError(errors : Result<ValidationError>, response : Response) {
        this.response.success = false;
        this.response.message = "Validation Error"
        this.response.errors = errors.formatWith(({ location, msg, param, value, nestedErrors }) => {
            let field : any = {}
            field[param] = msg
            return field
        }).array()

        response.status(422)
        return this.response;
    }
}
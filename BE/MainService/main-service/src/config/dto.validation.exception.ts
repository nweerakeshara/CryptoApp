import { BadRequestException, ValidationError } from "@nestjs/common";
import { BunyanLogger } from "../logger/bunyan-logger";
import { VALIDATIONS } from "./const";

export class DTOValidationException{
    private logger : BunyanLogger;

    constructor(errors: ValidationError[]){
        this.logger = new BunyanLogger();
        const errorArr = {};
        errors.forEach((error, key) => {
            this.logger.error({ message : VALIDATIONS.DTO_VALIDATION_ERROR, property :error.property, value : error.value})
            errorArr[error.property]  = Object.values(error.constraints).toLocaleString();
        });
       
        throw new BadRequestException(errorArr?JSON.stringify(errorArr):VALIDATIONS.DTO_VALIDATION_ERROR);
    }
}
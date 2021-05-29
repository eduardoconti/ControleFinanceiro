import { Expose } from "class-transformer";

export class ConstratinsErrorsDto {
    @Expose()
    /**
    * Object's property that haven't pass validation.
    */
    property: string;
    @Expose()
    /**
    * Constraints that failed validation with error messages.
    */
    constraints?: {
        [type: string]: string;
    };
}
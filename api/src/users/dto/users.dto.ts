import { IsNumber, IsString, Length } from "class-validator";
import { CONSTRAINTS_LIMITS, CONSTRAINTS_MESSAGES } from "src/shared/constants";

export class UserDto {

    id: string;

    @IsString()
    @Length(CONSTRAINTS_LIMITS.LOGIN.min, CONSTRAINTS_LIMITS.LOGIN.max, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
    login: string;

    @IsString()
    @Length(8, 16, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
    password: string;

    @Length(2, 20, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
    nome: string;

    @IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
    status: number;

    @IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
    perfil: number;


    /**
     * 
     * @param password string
     */
    public setPassword(password: string): void {
        this.password = password
    }

    /**
     * 
     * @returns password string
     */
    public getPassword(): string | null {
        return this.password
    }

    /**
    * 
    * @param id string
    */
    public setId(id: string): void {
        this.id = id
    }


}
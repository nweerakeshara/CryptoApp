import { IsNotEmpty, IsEmail, Matches, IsString } from "class-validator";
import { VALIDATIONS } from '../../config/const';

export class UserDTO {
  @IsNotEmpty()
  @Matches(/^((07)?[0-9]{8})$/, {
    message:
      VALIDATIONS.INVALID_PHONE_NUMBER,
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()  
  region: object;

  @IsNotEmpty()
  @IsString()
  password: string;
}

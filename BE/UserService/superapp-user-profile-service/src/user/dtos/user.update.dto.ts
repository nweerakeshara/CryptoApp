import { IsOptional,IsEmail,Matches,IsString } from "class-validator";
import { VALIDATIONS } from '../../config/const';
export class UserUpdateDTO {

  @IsOptional()
  @Matches(/^((07)?[0-9]{8})$/, {
    message:
      VALIDATIONS.INVALID_PHONE_NUMBER,
  })
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  region: object;

  @IsOptional()
  @IsString()
  password: string;
}

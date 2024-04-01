import { IsNotEmpty,IsEmail } from "class-validator";

export class OTPRequestDTO {
  @IsNotEmpty()
  userName : string;
  
  @IsEmail()
  email :string; 
}

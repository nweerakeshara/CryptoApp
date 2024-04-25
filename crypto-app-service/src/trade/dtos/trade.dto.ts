import {  IsNotEmpty, IsString } from "class-validator";

export class TradeDTO {

  @IsNotEmpty()
  @IsString()
  appId:string;

  @IsNotEmpty()
  msisdn:string

  @IsNotEmpty()
  deviceId : string

}

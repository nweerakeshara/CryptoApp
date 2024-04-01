import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('OTP')
export class OTPEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;  

    @Column({nullable: true, default: null })
    msisdn : string;

    @Column({nullable: true, default: null })
    email : string;

    @Column({nullable: true, default: null })
    otpValue : string;

    @Column({nullable: true, default: null })
    retryCount : number;
   
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
}

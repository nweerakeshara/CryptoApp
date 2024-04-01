import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;  

    @Column({nullable: true, default: null })
    phoneNumber : string;

    @Column({nullable: true, default: null })
    phoneNumberVerified : boolean;  
    
    @Column({nullable: true, default: null })
    email : string;
    
    @Column({nullable: true, default: null })
    emailVerified : string;

    @Column({nullable: true, default: null })
    firstName : string;

    @Column({nullable: true, default: null })
    lastName : string;

    @Column({nullable: true, default: null })
    userName : string;

    @Column({nullable: true, default: null })
    region : object;   
    
    @Column({nullable: true, default: null })
    password : string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;  

}

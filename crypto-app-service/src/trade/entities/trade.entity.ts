import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('trade')
export class TradeEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;  

    @Column()
    appId : string;

    @Column()
    appName : string;

    @Column()
    url : string;
   
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;  

}

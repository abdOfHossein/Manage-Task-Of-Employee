import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendEnt } from './entities/frontend.entity';
import { FrontendRepo } from './repositories/frontend.repository';
import { FrontendService } from './services/frontend.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([
            FrontendEnt,
        ])
    ],
    providers: [FrontendService, FrontendRepo],
    exports: [FrontendService],
})
export class FrontendModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { FrontendEnt } from './entities/frontend.entity';
import { FrontendRepo } from './repositories/frontend.repository';
import { FrontendService } from './services/frontend.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([
            FrontendEnt,
        ])
    ],
    providers: [FrontendService, FrontendRepo, HandlerService,TranslateService],
    exports: [FrontendService],
})
export class FrontendModule {}

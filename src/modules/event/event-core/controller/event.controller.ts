import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from '../../modules/dtos/create.event.dto';
import { UpdateEventDto } from '../../modules/dtos/update.event.dto';
import { EventEnt } from '../../modules/entities/event.entity';
import { EventService } from '../../modules/services/event.service';

@ApiTags('Event')
@Controller('Event')
export class EventController {
  constructor(private event: EventService) {}

  @ApiOperation({ summary: 'create for Event' })
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<EventEnt> {
    return this.event.createEvent(createEventDto);
  }

  @ApiOperation({ summary: 'findOne for Event' })
  @Get()
  findOneEvent(@Query('id_Event') id_Event: string): Promise<EventEnt> {
    return this.event.findOneEvent(id_Event);
  }

  @ApiOperation({ summary: ' update for Event' })
  @Put()
  updateEvent(
    @Query('id_Event') id_Event: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventEnt> {
    return this.event.updateEvent(id_Event, updateEventDto);
  }

  @ApiOperation({ summary: 'pagination for Event' })
  @Get('page')
  paginationEvent(): Promise<EventEnt[]> {
    return this.event.paginationEvent();
  }
}

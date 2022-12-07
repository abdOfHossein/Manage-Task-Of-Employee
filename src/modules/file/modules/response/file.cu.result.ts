import { ApiProperty } from "@nestjs/swagger";
import { FileEnt } from "../entities/file.entity"; 
export class FileCuResult {

  @ApiProperty()
  unq_file: string;

  constructor(init?: Partial<FileEnt>) {
    this.unq_file = init.unq_file
  }

}


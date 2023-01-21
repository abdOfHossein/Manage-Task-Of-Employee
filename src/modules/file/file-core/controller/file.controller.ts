import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { Public } from "src/common/decorates/public.decorator";
import { PublicRole } from "src/common/decorates/public.role.decorator";
import { GetUser } from "src/common/decorates/get.user.decorator";  
import { UserResponseJWTDto } from "src/common/dtos/user.dto";  
import { TypeFileEnum } from "../../modules/enums/type.file.enum";  
import { FileInterceptors } from "../../modules/interceptors/file.interceptors";  
import { FileService } from "../../modules/service/file.service"; 

@ApiBearerAuth('access-token')
@ApiTags('File')
@ApiHeader({
  name: 'language-code',
  description: 'language code',
  schema: {
    default: 'FA'
  }
})
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptors)
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  @ApiOperation({ summary: 'Upload File' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type_file: {
          type: 'enum',
          enum: [TypeFileEnum.PROFILE,TypeFileEnum.PROJCET],
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadFilePublic(
    @UploadedFile('file') file: Express.Multer.File,
  ) {
 
    return await this.fileService.uploadFilePublic(file);
  }

  @ApiOperation({ summary: 'download Files' })
  @Get('stream-file/:id_unq_file')
  @Public()
  @PublicRole()
  async getFile(
    @Res() res: Response,
    @Param('unq_file') unq_file: string,
  ): Promise<any> {
    const languageInfo = 'FA';
    return await this.fileService.downloadFile(res, unq_file, languageInfo)
  }
}
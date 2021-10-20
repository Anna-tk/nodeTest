import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {TopPageModel} from "./top-page.model";
import {FindTopPageDto} from "./dto/find-top-page.dto";
import {ConfigService} from "@nestjs/config";
import {SaveTopPageDto} from "./dto/save-top-page.dto";
import {DeleteTopPageDto} from "./dto/delete-top-page.dto";

@Controller('top-page')
export class TopPageController {
    constructor(private readonly configService: ConfigService) {
    }

    @Get('get/:alias')
    async get(@Param('alias') alias: string): Promise<TopPageModel | undefined> {
        return this.configService.get('TEST');
    }

    @Post('find')
    async getByCategory(@Body() dto: FindTopPageDto){

    }

    // @ts-ignore
    @Post('save')
    async save(@Body() dto: SaveTopPageDto) {

    }

    @Delete('delete')
    async delete(@Body() dto: DeleteTopPageDto) {

    }
}

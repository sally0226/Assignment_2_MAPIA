import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	UseInterceptors
} from "@nestjs/common";
import { SuccessCode } from "@root/global/common/successCode";
import { SuccessResponse } from "@root/global/common/successResponse";
import { RequestMusician } from "./dto/RequestMusician.dto";
import { UpdateMusician } from "./dto/UpdateMusician.dto";
import { MusicianService } from "./musician.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("musicians")
export class MusicianController {
	constructor(private musicianService: MusicianService) {}

	@Post()
	async create(@Body() data: RequestMusician): Promise<SuccessResponse> {
		return SuccessResponse.response(
			SuccessCode.CreateMusician,
			await this.musicianService.createOne(data)
		);
	}
	@Delete(":musicianId")
	async deleteMusician(@Param("musicianId") musicianId: string) {
		await this.musicianService.deleteOne(musicianId);
		return SuccessResponse.response(SuccessCode.DeleteMusician);
	}
	@Patch(":musicianId")
	async update(
		@Body() data: UpdateMusician,
		@Param("musicianId") musicianId: string
	): Promise<SuccessResponse> {
		return SuccessResponse.response(
			SuccessCode.UpdateMusician,
			await this.musicianService.updateOne(data, musicianId)
		);
	}
}

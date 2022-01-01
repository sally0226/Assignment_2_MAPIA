import {
	Controller,
	Body,
	Post,
	Delete,
	Param,
	Patch,
	ClassSerializerInterceptor,
	UseInterceptors
} from "@nestjs/common";
import { SuccessCode } from "@root/global/common/successCode";
import { SuccessResponse } from "@root/global/common/successResponse";
import { AlbumService } from "./album.service";
import { RequestAlbum } from "./dto/RequestAlbum.dto";
import { UpdateAlbum } from "./dto/UpdateAlbum.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("albums")
export class AlbumController {
	constructor(private albumService: AlbumService) {}

	@Post()
	async create(@Body() body: RequestAlbum): Promise<SuccessResponse> {
		return SuccessResponse.response(
			SuccessCode.CreateAlbum,
			await this.albumService.createOne(body)
		);
	}

	@Delete(":albumId")
	async deleteAlbum(@Param("albumId") albumId: string) {
		await this.albumService.deleteOne(albumId);
		return SuccessResponse.response(SuccessCode.DeleteAlbum);
	}
	@Patch(":albumId")
	async update(
		@Body() data: UpdateAlbum,
		@Param("albumId") albumId: string
	): Promise<SuccessResponse> {
		return SuccessResponse.response(
			SuccessCode.UpdateAlbum,
			await this.albumService.updateOne(data, albumId)
		);
	}
}

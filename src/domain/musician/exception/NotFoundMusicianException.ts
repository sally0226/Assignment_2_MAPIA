import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "@root/global/common/errorCode";

export class NotFoundMusicianException extends HttpException {
	constructor() {
		super(ErrorCode.NotFoundMusician, HttpStatus.NOT_FOUND);
	}
}

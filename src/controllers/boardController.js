import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    console.log("Req body: ", req.body);

    // throw new ApiError(StatusCodes.BAD_GATEWAY, "Huy");

    //Điều hướng sáng Service
    const createBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.OK).json(createBoard);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};

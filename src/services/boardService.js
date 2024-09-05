import { boardModal } from "~/models/boardModel";
import { slugify } from "~/utils/formater.js";

const createNew = async (reqBody) => {
  try {
    // xử lý logic dữ liệu tùy dữ án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    //Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong Database
    const createBoard = await boardModal.createNew(newBoard);
    console.log(createBoard);

    //Lấy bản ghi sau khi gọi(tùy mục đích dự án mà có cần bược này hay không)
    const getNewBoard = await boardModal.findOneById(createBoard.insertedId);

    //Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dữ án
    //Bắn email, notification về cho admin khi có một cái bản ghi mới được tạo thành công...vv

    //Trả kết quả về, trong Service luôn có return
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};

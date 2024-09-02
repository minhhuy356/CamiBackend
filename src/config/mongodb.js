import { env } from "~/config/environment";

import { MongoClient, ServerApiVersion } from "mongodb";

//Khởi đầu đối một đối tượng camiDatabaseInstance ban đầu là null (Vì chưa connect tới database)
let camiDatabaseInstance = null;

//Khởi tạo đối tượng mongoClientInstance để kết nối tới MongoDb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể không cần dùng nó, còn nếu dùng nó là chúng ta sẽ chỉ định mọt cái Stable API Version của MongoDB
  // Đọc thêm tại: http://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Kết nối tới Database
export const CONNECT_DB = async () => {
  //Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của ClientInstance
  await mongoClientInstance.connect();

  //Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến camiDatabaseInstance ở trên của chúng ta
  camiDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

//Function GET_DB (không async) này có nhiệm vụ export ra cái Cami Database Instance sau khi đã connect thành công tới MongoDB đẻ chugns ta sử dụng ở nhiều nơi khác nhau trong code
//Lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!camiDatabaseInstance) throw new Error("Must connect to Database first");
  return camiDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

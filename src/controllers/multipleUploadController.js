/**
 * Created by trungquandev.com's author on 17/08/2019.
 * multipleUploadController.js
 */
const { validationResult } = require('express-validator');

let debug = console.log.bind(console);

let multipleUpload = async (req, res) => {
  // Handle lỗi upload fail từ bước multipleUploadMiddleware
  if (req.uploadError) {
    console.log(req.uploadError)
    // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
    if (req.uploadError.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send(`Exceeds the number of files allowed to upload.`);
    }

    return res.send(`Error when trying upload many files: ${error}}`);
  }

  // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
  if (req.files && req.files.length <= 0) {
    return res.send(`You must select at least 1 file or more.`);
  }

  // Đoạn này bắt lỗi của data bình thường không phải là file
  const errors = validationResult(req);
  // Nếu có lỗi thì return luôn lỗi về, code không chạy tiếp
  if (!errors.isEmpty()) {
    return res.send(`Error username. ${JSON.stringify(errors)}`);
  }

  // Thành công hết không lỗi gì thì đi tới đây log kết quả ra xem, rồi trả về message success
  console.log(req.body)
  console.log(req.files)

  // trả về cho người dùng cái thông báo thành công đơn giản nếu không lỗi
  return res.send(`Your files has been uploaded.`);
};

module.exports = {
  multipleUpload: multipleUpload
};

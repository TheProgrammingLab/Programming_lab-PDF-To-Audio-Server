const fs = require("fs");
const pdf = require("pdf-parse");

exports.uploadPdf = async function uploadUserPdf(req, res, next) {
  console.log(req.file);
  const buffer = fs.readFileSync(req.file.path);
  console.log(buffer);
  console.log(pdf.º);
};

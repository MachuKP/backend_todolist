const fs = require("fs");

const validataTaskHelper = (data) => {
  if (!data.detail  || (data.done !== 'true' && data.done !== 'false')) {
    return false
  }
  return true
};

const writeFileHelper = (data) => {
  const json = JSON.stringify(data);
  fs.writeFileSync("data/task.json", json, "utf-8", (err) => {
    throw new Error(err);
  });
}

module.exports = {
  validataTaskHelper,
  writeFileHelper
};

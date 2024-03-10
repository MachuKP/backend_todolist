const express = require("express");
const crypto = require("crypto");

const data = require("../data/task.json");

const util = require("../util/helper");

const router = express.Router();

router.get("", (req, res) => {
  if (req.query.done) {
    for(const key in data.tasks) {
        if (data.tasks[key].done) {
            req.query.done === '0' && delete data.tasks[key]
        } else {
            req.query.done === '1' && delete data.tasks[key]
        }
    }
    res.send(data.tasks);
  } else {
    res.send(data.tasks);
  }
});

router.post("", (req, res) => {
  if (util.validataTaskHelper(req.body)) {
    const taskData = {
      detail: req.body.detail,
      done: req.body.done === "true" ? true : false,
    };
    const id = crypto.randomBytes(16).toString("hex");
    data.tasks[id] = taskData;
    util.writeFileHelper(data)
    res.send(taskData);
  } else {
    res.status(400).send("Invalid taskData");
  }
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.task);
  })
  .put((req, res) => {
    const taskData = {
      detail: req.body.detail,
      done: req.body.done === "true" ? true : false,
    };
    data.tasks[req.params.id] = taskData;
    util.writeFileHelper(data)
    res.send(taskData);
  })
  .delete((req, res) => {
    delete data.tasks[req.params.id]
    util.writeFileHelper(data)
    res.send(req.task);
  });

router.param("id", (req, res, next, id) => {
  req.task = data.tasks[id];
  if (!req.task) {
    res.send("TaskId is not found");
  }
  next();
});

module.exports = router;

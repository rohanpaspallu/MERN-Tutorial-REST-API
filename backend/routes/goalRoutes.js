const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");
const router = express.Router();

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;

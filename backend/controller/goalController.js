const getGoals = (req, res) => {
  res.status(200).json({ message: "get goals" });
};

const setGoals = (req, res) => {
  console.log(req.body.text);

  if (!req.body.text) {
    console.log("comes here");
    res.status(400);
    throw new Error("please enter a text");
  }
  res.status(200).json({ message: "set goals" });
};

const updateGoal = (req, res) => {
  res.status(200).json({ message: `update goals ${req.params.id}` });
};

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
};

module.exports = { getGoals, setGoals, updateGoal, deleteGoal };

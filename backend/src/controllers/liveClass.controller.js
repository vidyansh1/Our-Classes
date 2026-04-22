const LiveClass = require("../models/LiveClass");

const listLiveClasses = async (_req, res, next) => {
  try {
    const classes = await LiveClass.find()
      .populate("courseId", "title slug")
      .sort({ startsAt: 1 });

    res.json({ classes });
  } catch (error) {
    next(error);
  }
};

const createLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.create(req.body);
    res.status(201).json({ liveClass });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listLiveClasses,
  createLiveClass
};

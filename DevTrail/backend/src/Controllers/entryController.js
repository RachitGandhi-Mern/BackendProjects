const entryModel = require("../Models/Entry");
const GenerateDisc = require("../Services/ai.service");

exports.entryIn = async (req, res) => {
  try {
    const { displayname, content, isPublic, tags } = req.body;
    const disc = await GenerateDisc(content);
    const newentry = await entryModel.create({
      displayname,
      disc,
      content,
      isPublic,
      tags,
    });
    await newentry.save();
    res.status(201).json({
      message: "Entry Uploaded Successfully",
      entry: newentry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnrites = async (req, res) => {
  try {
    const entries = await entryModel.find().lean(); 

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.getdisc = async (req, res) => {
  try {
    const { content } = req.body; 
    const description = await GenerateDisc(content);
    res.json({ description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate description" });
  }
};

exports.Contributions = async (req, res) => {
  try {
    const entries = await entryModel.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);

    const formatted = entries.map(e => {
      const date = new Date(e._id.year, e._id.month - 1, e._id.day);
      return {
        date: date.toISOString().split("T")[0],
        count: e.count
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching contributions" });
  }
};

exports.getUserEntries = async (req, res) => {
  try {
    const entries = await entryModel
      .find({ user: req.user._id }) 
      .sort({ createdAt: -1 }); 
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user entries" });
  }
};


exports.deleteEntry = async (req, res) => {
  try {
    const entry = await entryModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found or not authorized" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entry" });
  }
};

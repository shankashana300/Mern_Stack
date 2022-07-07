const Notes = require("../models/Notes");
const { getTokenWithAuth } = require("./token");
const router = require("express").Router();

//CREATE NOTES
router.post("/", getTokenWithAuth, async (req, res) => {
  const newNote = new Notes(req.body);

  try {
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", getTokenWithAuth, async (req, res) => {
  try {
    req.body.status = 1;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE NOTES
router.delete("/:id", getTokenWithAuth, async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json("Note has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET NOTES
router.get("/find/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL NOTES
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const pageSize = req.query.pageSize;
  const page = req.query.page;

  try {
    let noteList;
    if (qNew) {
      noteList = await Notes.find().sort({ createdAt: -1 }).limit(1);
    } else if (pageSize) {
      noteList = await Notes.find()
        .limit(pageSize)
        .skip(pageSize * page);
    } else {
      noteList = await Notes.find();
    }

    res.status(200).json(noteList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

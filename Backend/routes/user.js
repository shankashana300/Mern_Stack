const User = require("../models/User");
const { getTokenWithAuth, getTokenWithAdmin } = require("./token");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

//UPDATE
router.put("/:id", getTokenWithAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", getTokenWithAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", getTokenWithAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", getTokenWithAdmin, async (req, res) => {
  const query = req.query.new;
  const pageSize = req.query.pageSize;
  const page = req.query.page;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : pageSize
      ? await User.find()
          .limit(pageSize)
          .skip(pageSize * page)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../errors/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone ,firstnamear, lastnamear } = req.body;
    //check if user Already exist in DB or not
    const user = await User.findOne({ email });

    //return this message if user exist in db
    if (user) return res.status(500).json({ msg: "This user Already Exist" });
    //check length of password
    if (password.length < 6)
      return res.status(500).json({ msg: "Password must be More Than 5" });
    if (phone.length !== 11) {
      res.status(500).json({ msg: "Enter Vaild Number phone" });
    }

    if (
      !phone.startsWith("015") &&
      !phone.startsWith("010") &&
      !phone.startsWith("011") &&
      !phone.startsWith("012")
    ) {
      res.status(500).json({ msg: "Enter Vaild Number phone" });
    }
    // ecrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      firstnamear,
      lastnamear,
      email,
      password: passwordHash,
      phone,
    });

    //To Save In DB U Can USed Create But this is anthor way
    await newUser.save();
    // create JWT For Authentication
    const accesstoken = createAccessToken({ id: newUser._id });

    //console.log(req.cookies)
    res
      .status(200)
      .json({ user: { ...newUser._doc, password: undefined }, accesstoken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.status(500).json({ msg: "Enter Valid Email" });
    console.log(password, currentUser.password);
    const isMatch = await bcrypt.compareSync(password, currentUser.password);

    if (!isMatch) return res.status(500).json({ msg: "Incoorect Password" });
    const accesstoken = createAccessToken({ id: currentUser._id });
    res.status(200).json({ accesstoken, currentUser });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users, msg: "successFuly... All Users" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(500).json({ msg: "User Not Found" });
  // Get ResetPassword Token
  const resetToken = user.getRestPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = ` ${process.env.FRONTEND_URL}/api/v1/user/reset/${resetToken}`;

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/reset/${resetToken}`; //like that http://localhost:5000/api/v1/forget/e17c7b072f13cd242614843dad6f72c290e384aa  we will user params to access this
  const message = `Your Password  reset token is :- \n\n ${resetPasswordUrl} \n\nIf you are not require this email then ,Please Ignore IT`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Request To Change Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} Successfuly`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined; // to prevent user to make two change just one change
    user.resetPasswordExpire = undefined; // to prevent user to make two change just one change
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ msg: error.message });
  }
};
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ msg: "Reset Password Token Is Invaild or has Been Expired!!" });
  }
  if (req.body.password !== req.body.confirmpassword) {
    return res
      .status(400)
      .json({ msg: "Password Must be Match ConfirmPassword" });
  }
  // to crypt password
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  user.password = passwordHash;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  const accesstoken = createAccessToken({ id: user._id });
  await user.save();
  return res
    .status(200)
    .json({ msg: "Updated Password", accesstoken, user, success: true });
};
const ChangePassword = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(400)
      .json({ msg: "You Can't do This Process" });
  }
  if (req.body.password !== req.body.confirmpassword) {
    return res
      .status(400)
      .json({ msg: "Password Must be Match ConfirmPassword" });
  }
  // to crypt password
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  user.password = passwordHash;
  const accesstoken = createAccessToken({ id: user._id });
  await user.save();
  return res
    .status(200)
    .json({ msg: "Updated Password", accesstoken, user, success: true });
};
// FAVORITE SYSTEM
const addFavorite = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    var isFavorite = false;
    const favoriteArray = [];
    user.favorites.forEach((f) => {
      favoriteArray.push(f);
      if (f !== null && f == req.params.favorite) {
        isFavorite = true;
      }
    });

    if (!isFavorite) {
      favoriteArray.push(req.params.favorite);
      user.favorites = favoriteArray;
      user.save();

      res.status(200).json({
        favorites: user.favorites,
      });
    } else {
      res.status(200).json({
        status: "failed",
        error: "this is already your favorite.",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const deleteFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const favoritesArray = [];

    user.favorites.forEach((f) => {
      if (f !== req.params.favorite) {
        favoritesArray.push(f);
      }
    });

    user.favorites = favoritesArray;
    user.save();

    res.status(200).json({
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    res.status(200).json({
      user,
      message:"successfuly update User...."
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
      msg:"Try Againe Later...."

    });
  }
};
const updateUserProfileImg = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Hall",
      width: 150,
      crop: "scale",
    });
    const user = await User.findByIdAndUpdate(req.params.id, {
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    }).select("-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "24h" });
};
module.exports = {
  login,
  register,
  forgetPassword,
  resetPassword,
  addFavorite,
  deleteFavorite,
  deleteUser,
  getUserById,
  updateUser,
  GetAllUsers,
  updateUserProfileImg,
  ChangePassword
};

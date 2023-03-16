const Hall = require("../models/HallModal");
const User = require("../models/UserModel");
const Book = require("../models/Book");
const Report = require("../models/Report");
const cloudinary = require("cloudinary");
const Redis = require("redis");

// const client = Redis.createClient({
//   legacyMode: true,
//   PORT: 5001,
// });
// client.connect().catch(console.error);
// const DEFAULY_EXPIRATION = 10;
//Filtring ,Sorting and Pagination ترقيم الصفحات
class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObject = { ...this.queryString }; //equel req.query ?
    //console.log(queryObject) // After delete excludedFildes ==> { name: 'ahed', _id: '622bf0a3aef5b5371c92991b', page: '2' }
    const excludedFildes = ["page", "sort", "limit"];
    excludedFildes.forEach((el) => delete queryObject[el]); // to delete Page , sort or limit from query object
    //console.log(queryObject) // before Delete ExecludeFile ==>{ name: 'ahed', _id: '622bf0a3aef5b5371c92991b' }
    let querystr = JSON.stringify(queryObject); // to translate from { name: 'ahed', _id: '622bf0a3aef5b5371c92991b' } to {"name":"ahed","_id":"622bf0a3aef5b5371c92991b"}
    /*
            gte==> greater than or equal
            gt==>greater than
            lte==>less than or equel
            lt==> less than
        */
    // stackoverFlow to match
    querystr = querystr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // console.log(querystr) //{"title":{"$regex":"3"}}
    this.query.find(JSON.parse(querystr));
    return this; // witout this will return "msg": "Cannot read properties of undefined (reading 'query')"
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  pagination(e) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 70;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const CreateHall = async (req, res) => {
  try {
    const {
      name,
      namear,
      capacity,
       //imgs,
      location,
      locationar,
      floor,
      price,
      phone,
      hallimgposter,
      halltype,
      mohafza,
      mohafzaar,
      chairs,
      tables,
      threeplan,
      facebook,
      whatsup,
      messanger,
      instagram,
    } = req.body;

    if (
      !name ||
      !namear ||
      !mohafzaar ||
      !floor ||
      !locationar ||
      !capacity ||
      // !imgs ||
      !location ||
      !price ||
      !phone ||
      !hallimgposter ||
      !halltype ||
      !mohafza ||
      !chairs ||
      !tables ||
      !threeplan ||
      !facebook ||
      !messanger ||
      !whatsup ||
      !instagram
    ) {
      return res.status(500).json({ msg: "Please Enter All Data" });
    }
    if (phone.length !== 11) {
      return res.status(500).json({ msg: "Enter Vaild Number phone" });
    }

    if (
      !phone.startsWith("015") &&
      !phone.startsWith("010") &&
      !phone.startsWith("011") &&
      !phone.startsWith("012")
    ) {
      return res.status(500).json({ msg: "Enter Vaild Number phone" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.hallimgposter,
      {
        folder: "Hall",
        width: 150,
        crop: "scale",
      }
    );

    const newHall = new Hall({
      name,
      namear,
      capacity,
      mohafzaar,
     // imgs,
      floor,
      threeplan,
      location,
      locationar,
      price,
      hallimgposter: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      phone,
      halltype,
      mohafza,
      chairs,
      tables,
      facebook,
      whatsup,
      messanger,
      instagram,
    });
    await newHall.save();
    return res.status(200).json({ newHall, msg: "successFully Added New Hall" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      status: "failed",
    });
  }
};
const deleteHall = async (req, res) => {
  try {
    const { public_id } = req.body;
    const { id } = req.params;
    if (!public_id) return res.status(400).json({ msg: "No Image Selected" });
    await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
    });
    const hall = await Hall.findByIdAndDelete(id);
    if (!hall)
      return res.status(500).json({ msg: "There Is No hall With This ID" });

    res.status(200).json({ msg: "Hall Deleted.." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
//Get All Hall Using Redis

// const GetAllHall = async (req, res) => {
//   try {
//     //getOrSetCach( key_name , callback Fun )
//     const halls = await getOrSetCach("halls", async () => {
//       const features = new APIFeature(Hall.find(), req.query)
//         .filtering()
//         .sorting()
//         .pagination();

//       const data = await features.query;
//       return data;
//     });
//     res.status(200).json({ halls, msg: "SuccessFuly..." });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };

const GetAllHall = async (req, res) => {
  try {
   
      const features = new APIFeature(Hall.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const halls = await features.query;
    ;
    
    res.status(200).json({ halls, msg: "SuccessFuly..." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const updateHall = async (req, res) => {
  try {
    const {
      name,
      namear,
      mohafzaar,
      capacity,
      imgs,
      location,
      locationar,
      price,
      floor,
      phone,
      hallimgposter,
      halltype,
      threeplan,
      facebook,
      whatsup,
      messanger,
    } = req.body;

    if (
      !name ||
      !mohafzaar ||
      !namear ||
      !capacity ||
      !locationar ||
      !imgs ||
      !mohafza ||
      !chairs ||
      !floor ||
      !tables ||
      !location ||
      !price ||
      !phone ||
      !hallimgposter ||
      !halltype ||
      !threeplan || 
      !facebook ||
      !messanger ||
      !whatsup
    ) {
      res.status(500).json({ msg: "Please Enter All Data" });
    }
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

    await Hall.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        namear,
        mohafzaar,
        capacity,
        imgs,
        location,
        locationar,
        price,
        phone,
        threeplan,
        hallimgposter,
        halltype,
        mohafza,
        chairs,
        tables,
        floor,
        facebook,
        whatsup,
        messanger,
      }
    );

    res.status(200).json({ msg: "successFully Updated Hall" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      status: "failed",
    });
  }
};

const updateHall2=async (req,res)=>{
  try {
      const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        status: "success",
        hall,
      });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
}
const updateHallImages = async (req, res) => {
  try {
    const singleHall = await Hall.findById(req.params.id);
    if (singleHall) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.imgs, {
        folder: "Hall/admin_images",
        width: 150,
        crop: "scale",
      });
      var imgsobj = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      const singleHallUpdated = await Hall.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { imgs: imgsobj } }
      );
      singleHall.imgs.push(imgsobj);
      res.status(200).json({
        msg: "Image Successfuly Added",
        msgar: "تم اضافه الصوره بنجاح",
      });
    } else {
      res.status(200).json({
        msg: "There Is No Hall With This ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const deleteImageFromSlider = async (req, res) => {
  const { public_id, id, index } = req.body;
  console.log(id, index);
  if (!public_id) return res.status(400).json({ msg: "No Image Selected" });
  await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
    if (err) throw err;
    const hall = await Hall.findById(id);
    if (hall) {
      const entireArrimgs = hall.imgs;
      entireArrimgs.splice(index, 1);
      console.log(entireArrimgs);
      const newhall = await Hall.findByIdAndUpdate(
        id,
        { imgs: entireArrimgs },
        { new: true }
      );
      res.status(200).json({ newhall, msg: "IMage Deleted.." });
    }
  });
};
const updateHallRate = async (req, res) => {
  try {
    const rating = await Hall.findByIdAndUpdate(
      req.params.id,
      { rate: req.body.rate },
      { new: true }
    );

    res.status(200).json({
      rating,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
// like Action
const addedLike = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    var newlikes = hall.likes + 1;
    await Hall.findByIdAndUpdate({ _id: req.params.id }, { likes: newlikes });

    res.status(200).json({ hall, msg: "successFully added Likes" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      status: "failed",
    });
  }
};
const deleteLike = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    var newlikes = hall.likes - 1;
    if (newlikes < 0) newlikes = 0;
    await Hall.findByIdAndUpdate({ _id: req.params.id }, { likes: newlikes });

    res.status(200).json({ hall, msg: "successFully remove Like" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      status: "failed",
    });
  }
};

//get Hall By ID using Redis

// const getHallById = async (req, res) => {
//   try {
//     //getOrSetCach( key_name , callback Fun )
//     const hall = await getOrSetCach("hall", async () => {
//       const data = await Hall.findById(req.params.id);
//       return data;
//     });
//     res.status(200).json({ hall, msg: "SuccessFuly..." });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       error,
//     });
//   }
// };

const getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    res.status(200).json({ hall, msg: "SuccessFuly..." });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const trendHall = async (req, res) => {
  try {
    const hall = await Hall.find({}).sort({ rate: -1 }).limit(5);

    res.status(200).json({
      hall,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const exploreHall = async (req, res) => {
  try {
    const hall = await Hall.find({}).sort("-likes").limit(5);

    res.status(200).json({
      hall,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
// ADmins Functions
const getAllTypeHall = async (req, res) => {
  try {
    const allHall = await Hall.find({});
    const allUsers = await User.find({ role: "user" });
    const allBook = await Book.find({});
    const allReport = await Report.find({});

    const allAdmins = await User.find({ role: "admin" });
    const allOpenHall = await Hall.find({ halltype: "open" });
    const allClosedHall = await Hall.find({ halltype: "close" });

    res.status(200).json({
      opened: allOpenHall.length,
      closed: allClosedHall.length,
      allHall: allHall.length,
      allUsers: allUsers.length,
      allBook: allBook.length,
      allAdmins: allAdmins.length,
      allReport:allReport.length
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const getAllGovernorateHall = async (req, res) => {
  try {
    const labels = [];
    const datas = [];
    const data = await Hall.aggregate([
      {
        $group: {
          _id: "$mohafza",
          count: { $sum: 1 }, // this means that the count will increment by 1
        },
      },
    ]);
    data.map((item) => {
      labels.push(item._id);
    });
    data.map((item) => {
      datas.push(item.count);
    });

    res.status(200).json({
      datas,
      labels,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const getAllRportPerHall = async (req, res) => {
  try {
    const labels = [];

    const datas = [];
    const data = await Report.aggregate([
      {
        $group: {
          _id: "$hallId",
          count: { $sum: 1 }, // this means that the count will increment by 1
        },
      },
    ]);
    data.map((item) => {
      labels.push(item._id);
    });
    data.map((item) => {
      datas.push(item.count);
    });

    res.status(200).json({
      datas,
      labels,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
// Function To handle Redis Cache
const getOrSetCach = (key, cb) => {
  return new Promise((resolve, reject) => {
    client.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      client.setEx(key, DEFAULY_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
};
module.exports = {
  CreateHall,
  deleteHall,
  GetAllHall,
  exploreHall,
  updateHall,
  getHallById,
  trendHall,
  addedLike,
  deleteLike,
  updateHallRate,
  // Admins Functions
  getAllTypeHall,
  getAllGovernorateHall,
  getAllRportPerHall,
  deleteImageFromSlider,
  updateHallImages,
  updateHall2
};

const mongoose = require("mongoose");

const HallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter name"],
  },
  namear: {
    type: String,
    required: [true, "Please Enter Arbic name"],
  },
  mohafza: {
    type: String,
    required: [true, "Please Enter mohafza"],
  },
  mohafzaar: {
    type: String,
    required: [true, "Please Enter Arabic mohafza"],
  },
  capacity: {
    type: Number,
    required: [true, "Please Enter capacity"],
  },
  location: {
    type: String,
    required: [true, "Please Enter location"],
  },
  locationar: {
    type: String,
    required: [true, "Please Enter location Arabic"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter location"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter phone"],
  },
  halltype: {
    type: String,
    enum: ["open", "close"],
    required: [true, "Please Enter Hall Type"],
  },
  imgs: [
    {
      public_id: {
        type: String,
        default:"imgs",
      },
      url: {
        type: String,
        default:"https://images.unsplash.com/photo-1542665952-14513db15293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
    },
  ],
  hallimgposter: {
    public_id: {
      type: String,
      default:"test_id",
    },
    url: {
      type: String,
     default:"https://images.unsplash.com/photo-1542665952-14513db15293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  },
  threeplan: [
    {
      planHeader: {
        type: String,
        required: [true, "Please Enter plan Header"],
      },
      planPrice: {
        type: Number,
        required: [true, "Please Enter plan Price"],
      },
      planDes: [
        {
          planchairs: {
            type: Number,
            required: [true, "Please Enter plan Price"],
          },
          plantables: {
            type: Number,
            required: [true, "Please Enter plan Price"],
          },
          planfloors: {
            type: Number,
            required: [true, "Please Enter plan Price"],
          },
          plancake: {
            type: Number,
            required: [true, "Please Enter plan Price"],
          },
          plancans: {
            type: Number,
            required: [true, "Please Enter cans"],
          },
        },
      ],
    },
  ],
  chairs: {
    type: Number,
    required: [true, "Please Enter chairs"],
  },
  tables: {
    type: Number,
    required: [true, "Please Enter tables"],
  },
  rate: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  floor: {
    type: Number,
    required: [true, "Please Enter Num floor"],
  },
  videoUrl: {
    type: String,
    default: "https://www.youtube.com/channel/UC736dLU2NfXt_QjMMlnC8oA",
  },
  facebook: {
    type: String,
    required: [true, "Please Enter facebook"],
  },
  whatsup: {
    type: String,
    required: [true, "Please Enter whats up"],
  },
  messanger: {
    type: String,
    required: [true, "Please Enter Messanger"],
  },
  instagram: {
    type: String,
    required: [true, "Please Enter instagram"],
  },
});

module.exports = mongoose.model("hall", HallSchema);

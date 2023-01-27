const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const checkBok = await Book.find({
      $and: [{ hallRef: req.body.hallRef }, { date: req.body.date }],
    });
    if (checkBok.length === 0) {
      const book = await Book.create(req.body);

      res.status(201).json({
        status: "success",
        book,
        BookCount: book.length,
      });
    } else {
      res.status(00).json({
        status: "booked",
        msg: "sorry There is Weeding In this Day In this Hall",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getAllBook = async (req, res) => {
  try {
    const allBook = await Book.find({});

    res.status(200).json({
      allBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      book,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const checkBok = await Book.find({
      $and: [{ hallRef: req.body.hallRef }, { date: req.body.date }],
    });
    if (checkBok.length === 0) {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json({
        status: "success",
        book,
      });
    }else{
        res.status(00).json({
            status: "booked",
            msg: "sorry There is Weeding In this Day In this Hall",
          });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.deletebook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Delete Book ....",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.findWeedingWithSamedateBook = async (req, res) => {
  try {
    const retunedBook = await Book.findOne({
        $and: [{ hallRef: req.body.hallRef }, { date: req.body.date }],
      });
    if (retunedBook)
      return res
        .status(200)
        .json({
          status: "booked",
          msg: "soory There is anthor weeding in this Day",
          msgar: "عذرا لا يمكنك الحجز في هذا اليوم ",
        });
    res.status(200).json({
      status: "free",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

// Admins Functions

exports.getAllBokFilterByDate = async (req, res) => {
  try {
    const labels = [];
    const datas = [];
    const data = await Book.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
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

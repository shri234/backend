const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Counter = require("../../model/Counter");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const addUser = async (req, res) => {
  try {
    const userId = await getNextSequenceValue("userId");
    let user_find = await User.findOne({
      username: req.body.username,
    });

    const is_valid_referral_id = await User.findOne({
      referralId: req.body.referralId,
    });

    console.log(is_valid_referral_id, req.body.referralId);

    if (
      user_find == undefined && (req.body.referralId === null || is_valid_referral_id !== null)
    ) {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        userId: userId,
        role: req.body.role,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        referralId: req.body.referralId,
      });

      return res.status(200).json({ data: user });
    } else {
      return res
        .status(500)
        .json(
          is_valid_referral_id === null
            ? "Invalid referral id"
            : "User already exists"
        );
    }
  } catch (err) {
    console.error("Error", err);
  }
};

// function encrypt(text) {
//   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// function decrypt(text) {
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

const user_login = async (req, res) => {
  try {
    let user;
    const emailRegex = /\S+@\S+\.\S+/;
    let login_with_email = emailRegex.test(req.body.username);

    if (login_with_email) {
      user = await User.findOne({ email: req.body.username });
    } else {
      user = await User.findOne({ username: req.body.username });
      // let password=decrypt(String(user.password));
      // console.log(password)
    }
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      const is_management =
        user.role === "admin" ||
        user.role === "master" ||
        user.role === "back-office"
          ? "management"
          : user.role;
      const role_check = req.body.role === is_management;
      if (result && role_check) {
        let status_update = await User.findOneAndUpdate(
          {
            username: req.body.username,
          },
          {
            status: true,
          }
        );
        res.status(200).json({
          response: "Logged in successfully",
          user,
        });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    let pageno = parseInt(req.query.pageno);
    let skip_page = pageno * 10;
    const user = await User.find({ userId: parseInt(req.query.userId) })
      .skip(skip_page)
      .limit(10);
    let get_count = await User.find({
      userId: parseInt(req.query.userId),
    }).countDocuments();
    return res.status(200).json({ data: user, count: get_count });
  } catch (err) {
    console.error("Error", err);
  }
};

const getAllUser = async (req, res) => {
  try {
    let pageno = parseInt(req.query.pageno);
    let skip_page = pageno * 10;
    let user_all = [];
    const user = await User.find({ role: "user" }).skip(skip_page).limit(10);
    for (let i = 0; i < user.length; i++) {
      let all_user = {
        username: user[i].username + " " + `(${user[i].referralId})`,
        email: user[i].email,
        panNo: user[i].panNo,
        aadharNo: user[i].aadharNo,
        address: user[i].address,
        accountNo: user[i].accountNo,
        mobileNumber: user[i].mobileNumber,
        userId: user[i].userId,
        upi_id: user[i].upi_id,
      };
      user_all.push(all_user);
    }
    let get_count = await User.find({ role: "user" }).countDocuments();
    return res.status(200).json({ data: user_all, count: get_count });
  } catch (err) {
    console.error("Error", err);
  }
};

const addAgent = async (req, res) => {
  try {
    const userId = await getNextSequenceValue("userId");
    let username = req.body.username;

    let id = username.slice(0, 2) + (await getNextSequenceValue("agentId"));
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      userId: userId,
      role: req.body.role,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      agentId: id,
      referralId: id,
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error", err);
  }
};

const getAgent = async (req, res) => {
  try {
    let pageno = req.query.pageno;
    const user = await User.findOne({ agentId: req.query.agentId });
    res.status(200).json({ data: user });
  } catch (err) {
    console.error("Error", err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    const user = await User.find({
      referralId: req.query.referralId,
      role: "user",
    })
      .skip(skip_page)
      .limit(10);
    const user_count = await User.find({
      referralId: req.query.referralId,
    }).countDocuments();
    res.status(200).json({ data: user, count: user_count });
  } catch (err) {
    console.error("Error", err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne(
      {
        userId: req.query.userId,
      },
      {
        address: req.body.address,
        accountNo: req.body.accountNo,
        aadharNo: req.body.aadharNo,
        IFSC: req.body.IFSC,
        panNo: req.body.panNo,
        upi_id: req.body.upi_id,
      }
    );

    return res.status(200).json({ response: "updated successfully" });
  } catch (err) {
    console.error("Error", err);
  }
};

const SearchUser = async (req, res) => {
  try {
    let arr = [];

    let reqex = new RegExp("^" + req.query.username, "i");
    let searchUser = await User.findOne({
      username: req.query.username,
    });

    if (searchUser == null) {
    } else {
      arr.push(searchUser);
    }
    return res
      .status(200)
      .json({ response: "Got data successfully", data: arr });
  } catch (err) {
    console.error("Error", err);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mumbaimahaspinmaster@gmail.com",
    pass: "qnxy whqb isat bzqf",
  },
});

const sendPasswordMail = async (req, res) => {
  let user_find = await User.findOne({
    email: req.body.email,
  });
  let mailOptions;
  if (user_find != null) {
    mailOptions = {
      from: "mumbaimahaspinmaster@gmail.com",
      to: req.body.email,
      subject: "Password Mail",
      text: `${user_find.password}`,
    };
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
};

const Sendmail = async (req, res) => {
  const mailOptions = {
    from: req.body.email,
    to: "mumbaimahaspinmaster@gmail.com",
    subject: "Request Email",
    text: req.body.fullname + req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
};

async function getNextSequenceValue(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = {
  addUser,
  user_login,
  getUser,
  addAgent,
  updateUser,
  getAgent,
  getAllUser,
  SearchUser,
  Sendmail,
  sendPasswordMail,
  getAllUsers,
};

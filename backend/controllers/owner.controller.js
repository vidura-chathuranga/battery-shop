import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";

//generate Worker Id
const generateWorkerId = async () => {
  //get last Worker object, if there is a worker, then return that worker object, otherwise return empty array
  const lastWorkerDetails = await Worker.find().sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first stock ID
  if (lastWorkerDetails.length == 0) {
    return "WRK-1";
  }

  //if array is not null, last get last stock Id
  const workerId = lastWorkerDetails.map((data) => {
    return data.worker_id;
  });

  //then we get the Integer value from the last part of the ID
  const oldWorkerId = parseInt(workerId[0].split("-")[1]);

  const newWorkerId = oldWorkerId + 1; //then we add 1 to the past value

  return  `WRK-${newWorkerId}`;//return new Stock ID
};




export const adminLogin = async (req, res) => {
  // get details from the request body
  const NIC = req.body.emailOrNic;
  const password = req.body.password;

  console.log(NIC, password);
  User.find({ nic: NIC })
    .then((data) => {
      if (data.length > 0) {
        // extract user details from user array
        data = data[0];

        //   compare database password and user entered password and role
        if (
          bcrypt.compareSync(password, data.password) &&
          data.role === "ADMIN"
        ) {
          // create access Token
          const accessToken = jwt.sign(
            { _id: data._id, role: data.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
          ); //access Token will expires in 1 day

          //   set access Token as a http only cookie
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
          }); //this cookie expires in 1 day

          //   create user details
          const userDetails = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
          };

          //   sends the user details
          res.status(200).json(userDetails);
        } else {
          throw new Error("Password is wrong");
        }
      } else {
        throw new Error("Does not exist this user");
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};

export const logout = (req, res) => {
  res.cookie("accessToken", "", { maxAge: 1 });
  res.status(200).json({});
};

export const registerWorker = async (req, res) => {

  try {

    const existingWorker = await User.findOne({email:req.body.email });
    if (existingWorker) {
      return res.status(409).json({ message: "Worker already exists" });
    }

    const newWorker = new User({
      id : req.body.worker_id,
      name: req.body.name,
      nic:req.body.nic,
      password: req.body.password,
      phone: req.body.phone,
      role:"WORKER",
      address: req.body.address,
      gender: req.body.gender,
    });

    const savedWorker = await newWorker.save();
    console.log(savedWorker);
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(500).json({ message: "Failed to register worker", error });
  }
};

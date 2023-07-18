import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";


export const workerLogin = async (req, res) => {
  // get details from the request body
  const NIC = req.body.nic;
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
          (data.role === "ADMIN" || data.role === "WORKER")
        ) {

            // create access Token
          const accessToken = jwt.sign(
            { _id: data._id, role: data.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
          ); //access Token will expires in 1 day



        //   set access Token as a http only cookie
          res.cookie("accessToken",accessToken,{httpOnly:true,maxAge:24*60*60*1000,secure : false});//this cookie expires in 1 day
        
        //   create user details
          const userDetails = {
            _id : data._id,
            name : data.name,
            email : data.email,
            role : data.role,
            phone : data.phone
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
      res.status(404).json({error: error.message});
    });
};

export const logout = (req,res) =>{
  res.cookie('accessToken','',{maxAge : 1});
  res.status(200).json({});
}

export const getAllWorkers = async (req, res) => {
  console.log("workers");
  try {
    const workers = await User.find({ role: "WORKER" });
    console.log(workers);
    if (workers.length === 0) {

      // If no workers found, send a 404 status code with a message
      return res.status(404).json({ message: "No workers found" });
    }

    // Extract only the necessary details from the workers
    const workerDetails = workers.map((worker) => ({
      _id: worker._id,
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      address: worker.address,
      nic : worker.nic,
      gender : worker.gender,

    }));

    res.status(200).json(workerDetails); // Send the worker details as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workers", error });
  }
};

export const deleteWorker = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedWorker = await User.findByIdAndDelete(_id);

    if (!deletedWorker) {
      // If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete worker", error });
  }
};

export const updateWorker = async (req, res) => {
  
  const _id = req.params.id;

  const updateFields = {
   name : req.body.name,
   email :req.body.id,
   phone :  req.body.phone,
   address : req.body.address,
   nic : req.body.nic,
   gender : req.body.gender,
  }
  
console.log(updateFields);
  // try {
  //   const updatedWorker = await User.findByIdAndUpdate(_id, updateFields, {
  //     new: true,
  //   });

  //   if (!updatedWorker) {
  //     // If the worker is not found, send a 404 status code with a message
  //     return res.status(404).json({ message: "Worker not found" });
  //   }

  //   res.status(200).json(updatedWorker); // Send the updated worker as the response
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to update worker", error });
  // }
};



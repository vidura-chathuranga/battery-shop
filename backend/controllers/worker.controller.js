import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";

export const workerLogin = async (req, res) => {
  // get details from the request body
  const NIC = req.body.nic;
  const password = req.body.password;

  console.log(NIC,password)
  User.find({ nic: NIC }).then((data) => {
    if (data.length > 0) {
        // extract user details from user array
        data = data[0];

    //   compare database password and user entered password and role
      if (
        bcrypt.compareSync(password, data.password) &&
        (data.role === "ADMIN" || data.role === "WORKER")
      ) {
        
      }
      else{
        throw new Error("Password is wrong")
      }
    }else{
        throw new Error("Does not exist this user");
    }
  });
};

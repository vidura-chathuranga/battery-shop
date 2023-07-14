import Battery from "../models/battery.model.js";

//generate Stock Id
const generateStockId = async () => {
  //get last stock object, if there is a battery, then return that battery object, otherwise return empty array
  const lastStockDetails = await Battery.find().sort({ _id: -1,"isDeleted.count": 0 }).limit(1);

  //check if the result array is empty or not, if its empty then return first stock ID
  if (lastStockDetails.length == 0) {
    return "STK-1";
  }

  //if array is not null, last get last stock Id
  const stockId = lastStockDetails.map((data) => {
    return data.stock_id;
  });

  //then we get the Integer value from the last part of the ID
  const oldStockId = parseInt(stockId[0].split("-")[1]);

  const newStockId = oldStockId + 1; //then we add 1 to the past value

  return  `STK-${newStockId}`;//return new Stock ID
};

//get all added data
export const getAllItems = async (req, res) => {
  try {
    const batteries = await Battery.find({ "isDeleted.count": 0 }); // Retrieve all battery (not deleted by worker or admin) documents from the database

    res.status(200).json(batteries); // Send the batteries as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch batteries", error });
  }
};

//add items to the db
export const addBatteries = async (req, res) => {
  try {

    //generate Stock ID
    const customStockId = await generateStockId();

    const newBattery = new Battery({
      stock_id: customStockId,
      quantity: req.body.quantity,
      added_date: req.body.added_date,
      warranty: req.body.warnty_priod,
      sellingPrice: req.body.sellingPrice,
      actualPrice: req.body.actualPrice,
      batteryBrand: req.body.batry_brand,
      batteryDescription: req.body.Battery_description,
    });

    const savedBattery = await newBattery.save(); // Save the new battery document to the database

    console.log(savedBattery);

    res.status(201).json(savedBattery); // Send the saved battery as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to add battery", error });
  }
};

//delete battery
const deleteBattery = async (req, res) => {
  const stock_id = req.params.stock_id;

  try {
    const deletedBattery = await Battery.findByIdAndDelete(stock_id); // Find and delete the battery by ID

    if (!deletedBattery) {
      // If the battery is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Battery not found" });
    }

    res.status(200).json({ message: "Battery deleted successfully" }); // Send a success message
  } catch (error) {
    res.status(500).json({ message: "Failed to delete battery", error });
  }
};

//update battery
const updateBattery = async (req, res) => {
  const stock_id = req.params.stock_id;
  const updateFields = req.body; // Assuming the updated fields are passed in the request body

  try {
    const updatedBattery = await Battery.findByIdAndUpdate(
      stock_id,
      updateFields,
      { new: true }
    );

    if (!updatedBattery) {
      // If the battery is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Battery not found" });
    }

    res.status(200).json(updatedBattery); // Send the updated battery as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to update battery", error });
  }
};

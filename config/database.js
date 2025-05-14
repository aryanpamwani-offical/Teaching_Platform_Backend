import { connect } from 'mongoose';


const dbConnect = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Mongodb Connection Successful");
  } catch (error) {
    console.log("Error");
    console.log(error);
    process.exit();
  }
};

export default dbConnect;
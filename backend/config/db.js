import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // const connect = await mongoose.createConnection(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }).asPromise();
    console.log("Database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;

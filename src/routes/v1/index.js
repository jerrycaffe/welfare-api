import express from "express";
import userRoute from "./user";
// import userTypeRoute from "./userType";
// import serviceRoute from "./service";

const router = express.Router();

router.use("/auth", userRoute);
// router.use('/usertype', userTypeRoute);
// router.use('/service', serviceRoute);
router.all("/", (req, res) => {
  res.send({ message: "Hello, welcome to iwelfare api" });
});

export default router;

const { User } = require("./models");
const bcrypt = require("bcrypt");

// app.post("/api/1.0/users", async (req, res) => {
//   try {
//     // console.log(req.body);
//     const password = await bcrypt.hash(req.body.password, 10);

//     delete req.body.password;
//     const data = await User.create({ password, ...req.body });

//     return res.status(201).json({ data });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

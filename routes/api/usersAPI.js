const express = require("express");
const router = express.Router();
const users = require("../../users.js");

//Create routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/", (req, res) => {
  res.json(users);
});

//get single user
router.get("/:id", (req, res) => {
  const validId = users.some((user) => user.id === parseInt(req.params.id));
  if (validId) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ error: `"Invalid ID - User not found" ${req.params.id}` });
  }
});

//Create user POST Method
router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newUser.name || !newUser.email) {
    res.status(400).json({ error: "please include name/email" });
  }
  users.push(newUser);
  res.json(users);
});

//update member
router.put("/:id", (req, res) => {
  const validId = users.some((user) => user.id === parseInt(req.params.id));

  if (validId) {
    const updateUser = req.body;
    users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser ? updateUser.name : user.name;
        user.email = updateUser ? updateUser.email : user.email;

        res.json({ message: "Updated user", updateUser });
      }
    });
  } else {
    res.status(400).json({ error: "Invalid ID - User not found" });
  }
})

  //Delete user
  router.delete("/:id", (req, res) => {
    const validId = users.some((user) => user.id === parseInt(req.params.id));
  
    if (validId) {
     res.json({message : "User deleted", users: users.filter(user => user.id !== parseInt(req.params.id))})
    } else {
      res.status(400).json({ error: "Invalid ID - User not found" });
    }
  
});

module.exports = router;

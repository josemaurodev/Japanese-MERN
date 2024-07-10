app.get("/user", (req, res) => {
  const { userID } = req.query;
  UserModel.findById({ _id: userID })
    .then((user) => {
      if (user) {
        res.json({
          status: "success",
          user: { name: user.name, email: user.email },
        });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred" })
    );
});
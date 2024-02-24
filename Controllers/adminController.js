
exports.getAdmin = (req , res) => {
    res.status(200).json({
        message : "Welcome to admin page!",
    });
};

const admin = {
    userName : "admin",
    userPass : 123456789
}

exports.login = (req, res) =>{
    const { username, password } = req.body;
    if (username === admin.userName && password === admin.userPass) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
}


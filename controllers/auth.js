const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            message: "Email already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password)


    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
    const refreshToken = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET_REFRESH,
        {
            expiresIn: "7d"
        }
    )
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({
        message: "login successfuly",
        token
    })
}
const refreshTokenHandler = async (req, res) => {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
    } catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
    }

    const newAccessToken = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    res.json({ accessToken: newAccessToken });

}

module.exports = { register, login, refreshTokenHandler }
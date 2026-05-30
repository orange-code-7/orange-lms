const { User, Profile } = require("../models");
const { bcrypt, jwt } = require("../helpers");

class AuthService {
  static async register({ name, email, password, role }) {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Mentee",
    });

    await Profile.create({
      userId: user.id,
    });

    return user;
  }

  static async login({ email, password }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.comparePassword(password, user.password);
    // const valid = password === user.password;

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const access_token = jwt.generateToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return { access_token };
  }

  static async me(userData) {
    return User.findByPk(userData.id, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }
}

module.exports = AuthService;

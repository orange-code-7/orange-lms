const { User, Profile } = require("../models");
const { bcrypt } = require("../helpers");

class UserService {
  static async create({ email, password, role, name }) {
    const hashedPassword = await bcrypt.hashPassword(password);

    return User.create({
      email,
      password: hashedPassword,
      role,
      name,
    });
  }

  static async findAll() {
    return User.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Profile,
        as: "profile",
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }

  static async findById(id) {
    return User.findByPk(id, {
      include: {
        model: Profile,
        as: "profile",
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }

  static async update(id, data, currentUser) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    if (user.role === "Owner" && currentUser.role !== "Owner") {
      throw new Error("Cannot update owner");
    }

    return user.update(data);
  }

  static async delete(id, currentUser) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    if (user.role === "Owner" && currentUser.role !== "Owner") {
      throw new Error("Cannot delete owner");
    }

    await Profile.destroy({
      where: { userId: id },
    });

    await user.destroy();

    return true;
  }
}

module.exports = UserService;

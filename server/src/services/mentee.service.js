const { User, Profile } = require("../models");
const bcrypt = require("bcrypt");

class MenteeService {
  static async create({ email, password, name }) {
    const hashed = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashed, role: "mentee", name });
  }

  static async findAll() {
    return User.findAll({
      where: { role: "mentee" },
      order: [["id", "ASC"]],
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }

  static async findById(id) {
    return User.findByPk(id, {
      where: { role: "mentee" },
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }

  static async update(id, data, currentUser) {
    // Admin can update anyone, non-admin can only update self
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    if (user.role === "owner" && currentUser.role !== "owner")
      throw new Error("Cannot update owner");
    return user.update(data);
  }

  static async delete(id, currentUser) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    if (user.role === "owner") throw new Error("Cannot delete owner");
    await Profile.destroy({ where: { userId: id } });
    await user.destroy();
    return true;
  }
}

module.exports = MenteeService;

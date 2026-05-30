const { User, Profile } = require("../models");
const { bcrypt } = require("../helpers");

class MenteeService {
  static async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hashPassword(password);

    return User.create({
      email,
      password: hashedPassword,
      role: "Mentee",
      name,
    });
  }

  static async findAll() {
    return User.findAll({
      where: { role: "Mentee" },
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }

  static async findById(id) {
    return User.findOne({
      where: {
        id,
        role: "Mentee",
      },
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }

  static async update(id, data) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Mentee not found");

    return user.update(data);
  }

  static async delete(id) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Mentee not found");

    await Profile.destroy({
      where: { userId: id },
    });

    await user.destroy();

    return true;
  }
}

module.exports = MenteeService;

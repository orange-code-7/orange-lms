const { User, Profile } = require("../models");
const { bcrypt } = require("../helpers");

class MentorService {
  static async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hashPassword(password);

    return User.create({
      email,
      password: hashedPassword,
      role: "Mentor",
      name,
    });
  }

  static async findAll() {
    return User.findAll({
      where: { role: "Mentor" },
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
        role: "Mentor",
      },
      include: {
        model: Profile,
        as: "profile",
      },
    });
  }

  static async update(id, data) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Mentor not found");

    return user.update(data);
  }

  static async delete(id) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Mentor not found");

    await Profile.destroy({
      where: { userId: id },
    });

    await user.destroy();

    return true;
  }
}

module.exports = MentorService;

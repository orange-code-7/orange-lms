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

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "Owner" && currentUser.role !== "Owner") {
      throw new Error("Cannot update owner");
    }

    const payload = {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
    };

    if (["Owner", "Admin"].includes(currentUser.role)) {
      payload.role = data.role;
      payload.isActive = data.isActive;
    }

    if (data.password?.trim()) {
      payload.password = await bcrypt.hashPassword(data.password);
    }

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });

    await user.update(payload);

    return this.findById(id);
  }

  static async delete(id, currentUser) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "Owner" && currentUser.role !== "Owner") {
      throw new Error("Cannot delete owner");
    }

    await Profile.destroy({
      where: {
        UserId: id,
      },
    });

    await user.destroy();

    return true;
  }
}

module.exports = UserService;

const { Profile } = require("../models");

class ProfileService {
  static async findByUserId(UserId) {
    return Profile.findOne({
      where: { UserId },
    });
  }

  static async upsert(UserId, data) {
    const profile = await Profile.findOne({
      where: { UserId },
    });

    if (profile) {
      return profile.update(data);
    }

    return Profile.create({
      UserId,
      ...data,
    });
  }
}

module.exports = ProfileService;

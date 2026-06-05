const {
  TaskSubmission,
  Task,
  Class,
  User,
  AssessmentResult,
} = require("../models");

const ROLES = require("../constants/roles");

class TaskSubmissionService {
  static async create(currentUser, data) {
    if (currentUser.role !== ROLES.MENTEE) {
      throw new Error("Only mentee can submit task");
    }

    return TaskSubmission.create({
      ...data,
      status: "Submitted",
    });
  }

  static async findAll(currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return TaskSubmission.findAll({
        include: [Task, User, AssessmentResult],
      });
    }

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return TaskSubmission.findAll({
        include: [
          {
            model: Task,
            include: [
              {
                model: Class,
                where: {
                  MentorId: currentUser.id,
                },
              },
            ],
          },
          User,
          AssessmentResult,
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return TaskSubmission.findAll({
        where: {
          UserId: currentUser.id,
        },
        include: [Task, User, AssessmentResult],
      });
    }

    throw new Error("Unauthorized");
  }

  static async findAllByTask(TaskId, currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return TaskSubmission.findAll({
        where: { TaskId },
        include: [Task, User, AssessmentResult],
      });
    }

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return TaskSubmission.findAll({
        where: { TaskId },
        include: [
          {
            model: Task,
            include: [
              {
                model: Class,
                where: {
                  MentorId: currentUser.id,
                },
              },
            ],
          },
          User,
          AssessmentResult,
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return TaskSubmission.findAll({
        where: {
          TaskId,
          UserId: currentUser.id,
        },
        include: [Task, User, AssessmentResult],
      });
    }

    throw new Error("Unauthorized");
  }

  static async findById(id, currentUser) {
    const submission = await TaskSubmission.findByPk(id, {
      include: [
        {
          model: Task,
          include: [Class],
        },
        User,
        AssessmentResult,
      ],
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return submission;
    }

    if (
      currentUser.role === ROLES.MENTOR &&
      submission.Task?.Class?.MentorId === currentUser.id
    ) {
      return submission;
    }

    if (
      currentUser.role === ROLES.MENTEE &&
      submission.UserId === currentUser.id
    ) {
      return submission;
    }

    throw new Error("Permission denied");
  }

  static async update(id, data, currentUser) {
    const submission = await TaskSubmission.findByPk(id, {
      include: [
        {
          model: Task,
          include: [Class],
        },
      ],
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return submission.update(data);
    }

    if (
      currentUser.role === ROLES.MENTOR &&
      submission.Task?.Class?.MentorId === currentUser.id
    ) {
      return submission.update(data);
    }

    throw new Error("Permission denied");
  }

  static async delete(id, currentUser) {
    const submission = await TaskSubmission.findByPk(id, {
      include: [
        {
          model: Task,
          include: [Class],
        },
      ],
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return submission.destroy();
    }

    if (
      currentUser.role === ROLES.MENTEE &&
      submission.UserId === currentUser.id
    ) {
      return submission.destroy();
    }

    throw new Error("Permission denied");
  }
}

module.exports = TaskSubmissionService;

// src/lib/services/user.service.ts
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/user.model";

export class UserService {
  static async getProfile(userId: string) {
    await connectDB();
    return User.findById(userId).select("-password");
  }

  static async updateProfile(userId: string, data: any) {
    await connectDB();
    return User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).select("-password");
  }

  static async updatePreferences(userId: string, preferences: any) {
    await connectDB();
    return User.findByIdAndUpdate(
      userId,
      { $set: { preferences } },
      { new: true }
    ).select("preferences");
  }

  static async getActivities(userId: string) {
    await connectDB();
    return User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "forecasts",
          localField: "_id",
          foreignField: "createdBy",
          as: "activities"
        }
      },
      { $unwind: "$activities" },
      { $sort: { "activities.createdAt": -1 } },
      { $limit: 10 }
    ]);
  }
}
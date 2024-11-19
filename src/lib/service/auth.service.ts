import { connectDB } from "@/lib/db/mongodb";
import { User } from "../../lib/db/model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  static async register(userData: {
    email: string;
    password: string;
    name: string;
  }) {
    await connectDB();

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = await User.create({
      ...userData,
      password: await bcrypt.hash(userData.password, 12),
    });

    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  static async login(credentials: { email: string; password: string }) {
    await connectDB();

    const user = await User.findOne({ email: credentials.email });
    if (!user || !(await user.comparePassword(credentials.password))) {
      throw new Error("Invalid credentials");
    }

    await User.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    const token = jwt.sign(
      { id: user._id },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  static async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
      return decoded;
    } catch {
      return null;
    }
  }

  static async updateProfile(profile: { name: string; email: string }) {
    await connectDB();

    const user = await User.findOne({ email: profile.email });
    if (!user) {
      throw new Error("User not found");
    }

    user.name = profile.name;
    await user.save();

    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
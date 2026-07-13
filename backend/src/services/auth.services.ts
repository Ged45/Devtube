import { UserRepository } from "../repositories/user.repository.js";
import type { RegisterDto, LoginDto } from "../types/auth.types.js";
import type { UpdateProfileDto } from "../validators/auth.validator.js";
import type { Prisma } from "../generated/prisma/index.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";
import { createVideo } from "../repositories/video.repository.js";

export class AuthService {

  constructor(
    private readonly userRepository = new UserRepository()
  ) {}

  private publicUser(user: { password: string } & Record<string, unknown>) {
    const { password, ...profile } = user;
    return profile;
  }

  async register(data: RegisterDto) {

    const emailExists =
      await this.userRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError(409, "Email already exists");
    }

    const usernameExists =
      await this.userRepository.findByUsername(data.username);

    if (usernameExists) {
      throw new AppError(409, "Username already exists");
    }

    const password = await hashPassword(data.password);

    const user = await this.userRepository.create({
      email: data.email,
      username: data.username,
      password,
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
    });

    const token = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: this.publicUser(user),
      token,
    };
  }

  async uploadVideo(title: string, description: string | undefined, filename: string, uploaderId: number) {
    const video = await createVideo({
      title,
      description: description ?? "",
      filename,
      uploaderId,
    });
    return video;
  }

  async login(data: LoginDto) {

    const user =
      await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const passwordMatches =
      await comparePassword(
        data.password,
        user.password
      );

    if (!passwordMatches) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: this.publicUser(user),
      token,
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    return this.publicUser(user);
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    if (data.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing && existing.id !== userId) {
        throw new AppError(409, "Email already exists");
      }
    }

    if (data.username) {
      const existing = await this.userRepository.findByUsername(data.username);
      if (existing && existing.id !== userId) {
        throw new AppError(409, "Username already exists");
      }
    }

    const updateData: Prisma.UserUpdateInput = {};
    if (data.email !== undefined) updateData.email = data.email;
    if (data.username !== undefined) updateData.username = data.username;
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;

    const user = await this.userRepository.update(userId, updateData);
    return this.publicUser(user);
  }
}

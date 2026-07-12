import { UserRepository } from "../repositories/user.repository.js";
import type { RegisterDto, LoginDto } from "../types/auth.types.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";
import { createVideo } from "../repositories/video.repository.js";

export class AuthService {

  constructor(
    private readonly userRepository = new UserRepository()
  ) {}

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
      user,
      token,
    };
  }

  async uploadVideo(title: string, description: string | undefined, filename: string, userId: number) {
    const video = await createVideo({
      title,
      description: description ?? "",
      filename,
      userId,
      duration: 0,
      thumbnail: null,
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
      user,
      token,
    };
  }
}
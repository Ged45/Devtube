import { findByEmail, createUser } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { createVideo } from "../repositories/video.repository.js";
export async function register(
  username: string,
  email: string,
  password: string
) {
  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

export async function login(
  email: string,
  password: string
) {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await comparePassword(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}


export async function uploadVideo(
  title: string,
  description: string,
  filename: string,
  userId: number
) {
  return createVideo({
    title,
    description,
    filename,
    userId,
  });
}
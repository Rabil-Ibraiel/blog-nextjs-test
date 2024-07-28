"use server";

import User from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { signIn } from "next-auth/react";

export async function createUser(formData) {
  await mongoose.connect(process.env.MONGODB_URI);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("re-password");

  try {
    if (password === rePassword) {
      const usernameExsist = await User.findOne({ name: username });
      const emailExsist = await User.findOne({ email });

      if (usernameExsist || emailExsist) {
        if (usernameExsist) {
          throw new Error("This Username alredy exsist!");
        } else {
          throw new Error("This Email alredy exsist!");
        }
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          name: username,
          email,
          password: hashedPassword,
        });
        return { user: { name: newUser.name, email: newUser.email } };
      }
    } else {
      throw new Error("Password incorect");
    }
  } catch (err) {
    return { error: err.message };
  }
}

export async function handleSignIn(formData){
    const email = formData.get('email')
    const password = formData.get('password')
    await signIn('credentials', {email, password})
}
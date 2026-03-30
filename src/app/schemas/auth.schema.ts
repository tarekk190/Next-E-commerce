import * as z from "zod";

export const loginschema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Enter your email" }),

  password: z.string().nonempty({ message: "Password is required" }).min(8),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(20, { message: "Name must be at most 20 characters" }),
    email: z
      .string()
      .email({ message: "Enter a valid email address" })
      .min(1, { message: "Enter your email" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: "Password must start with uppercase",
      }),
    rePassword: z.string().nonempty({ message: "Confirm your password" }),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, {
      message: "Enter a valid Egyptian phone number",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Enter your email" }),
});

export const verifyResetCodeSchema = z.object({
  resetCode: z.string().min(1, { message: "Enter the reset code" }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  newPassword: z
    .string()
    .nonempty({ message: "Enter new password" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
      message: "Password must start with uppercase",
    }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty({ message: "Enter current password" }),
    password: z
      .string()
      .nonempty({ message: "Enter new password" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: "Password must start with uppercase",
      }),
    rePassword: z.string().nonempty({ message: "Confirm new password" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

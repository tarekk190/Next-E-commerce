import {
  forgotPasswordSchema,
  loginschema,
  signupSchema,
  verifyResetCodeSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "@/app/schemas/auth.schema";
import * as z from "zod";

export type LoginSchema = z.infer<typeof loginschema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeSchema = z.infer<typeof verifyResetCodeSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

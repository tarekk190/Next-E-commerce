import ResetPasswordClient from "./ResetPasswordClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}

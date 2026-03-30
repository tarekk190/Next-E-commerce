import VerifyCodeClient from "./VerifyCodeClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function VerifyCodePage() {
  return (
    <Suspense>
      <VerifyCodeClient />
    </Suspense>
  );
}

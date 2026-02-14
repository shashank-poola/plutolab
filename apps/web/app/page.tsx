import { SignIn } from "@/src/components/base/SignIn";
import { GradientBackground } from "@/src/components/base/gradientBackground";

export default function Page() {
  return (
    <>
      <GradientBackground fullScreen />
      <div className="relative flex items-center justify-center min-h-svh" style={{ zIndex: 1 }}>
        <SignIn />
      </div>
    </>
  );
}
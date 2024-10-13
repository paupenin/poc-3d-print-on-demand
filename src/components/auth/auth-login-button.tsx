"use client";

import { signIn } from "next-auth/react";
import { Button, type ButtonProps } from "../ui/button";

export default function AuthLoginButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <Button onClick={() => signIn("google")} {...rest}>
      {children}
    </Button>
  );
}

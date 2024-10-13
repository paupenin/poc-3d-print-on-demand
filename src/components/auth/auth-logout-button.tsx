"use client";

import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "../ui/button";

export default function AuthLogoutButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <Button onClick={() => signOut()} {...rest}>
      {children}
    </Button>
  );
}

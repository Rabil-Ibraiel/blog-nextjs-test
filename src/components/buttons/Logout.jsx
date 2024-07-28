"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return <button className="bg-accent px-2 rounded-md font-bold" onClick={signOut}>Logut</button>;
};

export default Logout;

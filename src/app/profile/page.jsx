import { UserProfile } from "@clerk/nextjs";
import React from "react";

function page() {
  return <UserProfile routing="hash" />;
}

export default page;

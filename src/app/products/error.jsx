"use client";

import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl text-red-500">
        Error fetching Bookmark Details.
      </div>
    </div>
  );
}

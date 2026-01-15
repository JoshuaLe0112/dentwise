"use client";

import React from 'react'
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

function UserSync() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const handleUserSync = async () => {
      if (isLoaded && isSignedIn) {
        try {
          // Call server action dynamically
          await fetch("/api/syncUser"); // we’ll create this route
        } catch (error) {
          console.log("Failed to sync user", error);
        }
      }
    };

    handleUserSync();
  }, [isLoaded, isSignedIn]);

  return null;
}

export default UserSync;

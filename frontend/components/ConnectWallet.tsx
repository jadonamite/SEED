"use client";

import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useConnect } from "@stacks/connect-react"; // 👈 New Import
import { userSession } from "../lib/auth";
import { useState, useEffect } from "react";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  // 1. Get the authenticate function from the hook
  const { authenticate } = useConnect();

  useEffect(() => {
    setMounted(true);
    if (userSession.isUserSignedIn()) {
      setIsSignedIn(true);
    }
  }, []);

  // 2. Use the hook's authenticate function
  const connect = () => {
    authenticate({
      appDetails: {
        name: "STX Raffle",
        icon: window.location.origin + "/favicon.ico",
      },
      onFinish: () => {
        window.location.reload();
      },
    });
  };

  const disconnect = () => {
    userSession.signUserOut("/");
    setIsSignedIn(false);
  };

  if (!mounted) return null;

  if (isSignedIn) {
    return (
      <Button 
        onClick={disconnect} 
        colorScheme="red" 
        variant="outline" 
        size="sm"
      >
        Disconnect
      </Button>
    );
  }

  return (
    <Button 
      onClick={connect} 
      bg="brand.500" 
      color="white" 
      _hover={{ bg: 'brand.600' }}
      rightIcon={<ArrowForwardIcon />} 
      shadow="md"
    >
      Connect Wallet
    </Button>
  );
}
"use client";

import { Box, Container, Grid, GridItem, Flex, Heading } from "@chakra-ui/react";
import { Connect } from "@stacks/connect-react"; // 👈 Import Provider
import { userSession } from "../lib/auth";       // 👈 Import your session

import ConnectWallet from "../components/ConnectWallet";
import PotCard from "../components/dashboard/PotCard";
import ActionCard from "../components/dashboard/ActionCard";
import StatsCard from "../components/dashboard/StatsCard";
import { useRaffleData } from "../hooks/useRaffleData"; 

export default function Home() {
  const { potSize, round, isLoading, stxPrice } = useRaffleData();

  return (
    // 1. WRAP EVERYTHING IN THE CONNECT PROVIDER
    <Connect 
      authOptions={{
        appDetails: {
          name: "STX Raffle",
          icon: typeof window !== "undefined" ? window.location.origin + "/favicon.ico" : "",
        },
        userSession: userSession as any,
      }}
    >
      <Flex 
        minH="100vh" 
        bg="#FAFAFA" 
        direction="column" 
        align="center" 
        justify="center"
        pb={20}
      >
        
        {/* Navbar */}
        <Box py={8} px={4} w="full">
          <Container maxW="container.lg">
            <Flex justify="space-between" align="center">
              <Heading fontFamily="var(--font-montserrat)" fontWeight="900" fontSize="2xl" letterSpacing="tighter" color="black">
                OPENSEASON
              </Heading>
              <ConnectWallet />
            </Flex>
          </Container>
        </Box>

        {/* Main Grid */}
        <Container maxW="container.lg" mt={2}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} templateRows={{ base: "auto", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }}>
              <PotCard potSize={potSize ? potSize / 1000000 : 0} round={round} loading={isLoading} price={stxPrice} />
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }} rowSpan={{ base: 1, md: 2 }}>
              {/* 2. PASS THE STX PRICE TO ACTION CARD IF NEEDED LATER */}
              <ActionCard />
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 3 }}>
               <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={6}>
                  <StatsCard />
               </Grid>
            </GridItem>
          </Grid>
        </Container>
      </Flex>
    </Connect>
  );
}
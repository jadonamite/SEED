"use client";

import { Box, Container, Grid, GridItem, Flex, Heading } from "@chakra-ui/react";
import ConnectWallet from "../components/ConnectWallet";
import PotCard from "../components/dashboard/PotCard";
import ActionCard from "../components/dashboard/ActionCard";
import StatsCard from "../components/dashboard/StatsCard";

// 1. IMPORT THE HOOK
// (Make sure this path matches where you put the file I gave you earlier)
import { useRaffleData } from "../hooks/useRaffleData"; 

export default function Home() {
  // 1. USE THE CORRECT NAMES (potSize, not prizePool)
  // The error log showed us exactly what the hook returns: { potSize, round, isLoading }
  const { potSize, round, isLoading } = useRaffleData(); 

  return (
    <Box minH="100vh" bg="#FAFAFA" pb={20}>
      
      {/* Navbar */}
      <Box py={8} px={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Heading 
              fontFamily="var(--font-montserrat)" 
              fontWeight="900" 
              fontSize="2xl" 
              letterSpacing="tighter"
              color="black"
            >
              OPENSEASON
            </Heading>
            <ConnectWallet />
          </Flex>
        </Container>
      </Box>

      {/* Main Grid */}
      <Container maxW="container.lg" mt={2}>
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
          templateRows={{ base: "auto", md: "repeat(2, 1fr)" }}   
          gap={6}
        >
          {/* Pot Card */}
          <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }}>
            
            {/* 2. PASS THE MATCHING VARIABLES */}
            <PotCard 
              potSize={potSize}   // Now matches the variable from the hook
              round={round}       // Now uses the real round number
              loading={isLoading} // Uses the real loading state
            />

          </GridItem>

          {/* Action Card */}
          <GridItem colSpan={{ base: 1, md: 1 }} rowSpan={{ base: 1, md: 2 }}>
            <ActionCard />
          </GridItem>

          {/* Stats Strip */}
          <GridItem colSpan={{ base: 1, md: 3 }}>
             <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={6}>
                <StatsCard />
             </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
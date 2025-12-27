"use client";

import { Card, CardBody, Stack, Flex, Badge, Text, Heading, Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// 1. Define the props this component expects
interface PotCardProps {
  potSize: number;
  round: number;
  loading: boolean;
  price?: number; // 🆕 Optional Prop
}

// Animations
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// 2. Accept the props in the function definition
export default function PotCard({ potSize, round, loading, price }: PotCardProps) {
  const shimmerAnimation = `${shimmer} 3s linear infinite`;
  const scrollAnimation = `${scroll} 20s linear infinite`;

  // 🆕 Use real price or default to 2.00
  const currentPrice = price || 2.00;
  const usdValue = (potSize * currentPrice).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <Card 
      bg="white" 
      border="1px solid" 
      borderColor="gray.200" 
      shadow="xl" 
      rounded="3xl" 
      h="full"
      overflow="hidden"
      position="relative"
    >
      <CardBody p={0}>
        
        <Stack spacing={8} justify="center" h="full" p={8} pb={16}>
          
          <Flex justify="space-between" align="center">
            <Badge 
              colorScheme="green" variant="solid" 
              px={3} py={1} rounded="full" fontSize="xs" letterSpacing="wider"
            >
              ● LIVE
            </Badge>
            {/* REAL ROUND DATA */}
            <Text fontSize="sm" color="gray.400" fontWeight="bold">
              #{loading ? "..." : round}
            </Text>
          </Flex>
          
          <Box textAlign="center">
            <Text fontSize="xs" color="gray.400" fontWeight="800" letterSpacing="widest" textTransform="uppercase" mb={1}>
              Current Prize Pool
            </Text>
            
            {/* REAL POT DATA */}
            <Heading 
              size="4xl" 
              fontWeight="900" 
              letterSpacing="tight"
              bgGradient="linear(to-r, gray.800, gray.500, gray.800)" 
              bgClip="text"
              backgroundSize="200% auto"
              animation={shimmerAnimation}
            >
              {loading ? "..." : `${potSize} STX`}
            </Heading>
            
            <Text fontSize="xl" color="brand.500" fontWeight="bold" mt={2}>
              {loading ? "..." : `≈ $${usdValue} USD`}
            </Text>
          </Box>

          <Flex justify="space-between" align="center" bg="gray.50" p={4} rounded="2xl">
            <Text fontSize="xs" fontWeight="bold" color="gray.400">CLOSING IN</Text>
            <Text fontFamily="monospace" fontSize="xl" fontWeight="bold" color="gray.800">
              18 : 20 : 45
            </Text>
          </Flex>
        </Stack>

        {/* Live Ticker */}
        <Box 
          position="absolute" bottom={0} left={0} right={0} 
          h="12" bg="gray.900" color="white" 
          overflow="hidden" display="flex" alignItems="center"
        >
          <Box whiteSpace="nowrap" animation={scrollAnimation} fontSize="xs" fontWeight="bold">
            <Text as="span" mx={4}>🎟️ ST6X...9NN8 bought 5 tickets</Text>
            <Text as="span" mx={4} color="brand.500">•</Text>
            <Text as="span" mx={4}>🎟️ SP3F...22A1 bought 10 tickets</Text>
          </Box>
        </Box>

      </CardBody>
    </Card>
  );
}
"use client";

import { Card, CardBody, VStack, Heading, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useConnect } from "@stacks/connect-react";
// 1. FIX: Import the constant 'STACKS_TESTNET' instead of the class
import { STACKS_TESTNET } from "@stacks/network";
import { PostConditionMode, uintCV } from "@stacks/transactions";
import { userSession } from "../../lib/auth";

export default function ActionCard() {
  const [ticketCount, setTicketCount] = useState(1);
  const { doContractCall } = useConnect();
  const toast = useToast();

  const TICKET_PRICE = 10; 

  const handleEnterRaffle = async () => {
    if (!userSession.isUserSignedIn()) {
      toast({ status: "error", title: "Connect Wallet first!", isClosable: true });
      return;
    }

    await doContractCall({
      // 2. FIX: Use the constant directly
      network: STACKS_TESTNET,
      anchorMode: 1,
      contractAddress: "ST3GAYKCWBD2PTNR77WGYWCPPR102C5E0C9V1H9ZX",
      contractName: "stx-raffle",
      functionName: "buy-ticket", 
      functionArgs: [uintCV(ticketCount)], 
      // 3. FIX: Change .ALLOW to .Allow (Case sensitive update)
      postConditionMode: PostConditionMode.Allow, 
      // 4. FIX: Add type 'any' to data to stop the TypeScript warning
      onFinish: (data: any) => {
        toast({
          title: "Transaction Sent!",
          description: `Tx ID: ${data.txId}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onCancel: () => {
        toast({ title: "Transaction Cancelled", status: "info" });
      },
    });
  };

  return (
    <Card bg="gray.900" color="white" h="full" rounded="3xl" shadow="xl">
      <CardBody display="flex" flexDirection="column" justifyContent="center" p={8}>
        <VStack spacing={6} align="stretch">
          
          <Heading size="md" color="white">
            Enter the Raffle
          </Heading>

          <Text fontSize="sm" color="gray.400">
            Select how many tickets you want to buy. <br/> 
            <Text as="span" color="brand.400">1 Ticket = {TICKET_PRICE} STX</Text>
          </Text>

          <NumberInput 
            min={1} 
            max={50} 
            value={ticketCount} 
            onChange={(_, val) => setTicketCount(val)}
            variant="filled"
          >
            <NumberInputField bg="gray.800" color="white" _hover={{ bg: "gray.700" }} />
            <NumberInputStepper>
              <NumberIncrementStepper color="white" />
              <NumberDecrementStepper color="white" />
            </NumberInputStepper>
          </NumberInput>

          <Text fontSize="xs" fontWeight="bold" textAlign="right" color="gray.500">
            TOTAL: {ticketCount * TICKET_PRICE} STX
          </Text>

          <Button 
            size="lg" 
            colorScheme="green" 
            onClick={handleEnterRaffle}
            isDisabled={ticketCount < 1}
          >
            Buy Tickets
          </Button>

        </VStack>
      </CardBody>
    </Card>
  );
}
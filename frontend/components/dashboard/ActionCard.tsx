"use client";

import { Card, CardBody, VStack, Heading, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { STACKS_TESTNET } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions"; // Removed uintCV since we don't need it anymore
import { userSession } from "../../lib/auth";

export default function ActionCard() {
  const [ticketCount, setTicketCount] = useState(1);
  const { doContractCall } = useConnect();
  const toast = useToast();

  const TICKET_PRICE = 0.1; // Updated to match your contract (100,000 uSTX = 0.1 STX)

  const handleEnterRaffle = async () => {
    if (!userSession.isUserSignedIn()) {
      toast({ status: "error", title: "Connect Wallet first!", isClosable: true });
      return;
    }

    await doContractCall({
      network: STACKS_TESTNET,
      anchorMode: 1,
      contractAddress: "ST3GAYKCWBD2PTNR77WGYWCPPR102C5E0C9V1H9ZX",
      contractName: "stx-raffle",
      functionName: "buy-ticket", 
      
      // 🚨 THE FIX: Send empty arguments because your contract takes 0 args
      functionArgs: [], 

      postConditionMode: PostConditionMode.Allow,
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
            Current Round Ticket Price: <br/> 
            <Text as="span" color="brand.400">1 Ticket = {TICKET_PRICE} STX</Text>
          </Text>

          {/* NOTE: Your contract only supports buying 1 ticket per transaction.
             I have disabled the input so users don't get confused trying to buy 5.
          */}
          <NumberInput 
            min={1} 
            max={1} 
            value={1} 
            isDisabled={true} // Locked to 1 for now
            variant="filled"
          >
            <NumberInputField bg="gray.800" color="white" _hover={{ bg: "gray.700" }} />
            {/* Steppers hidden since we are locked to 1 */}
          </NumberInput>

          <Text fontSize="xs" fontWeight="bold" textAlign="right" color="gray.500">
            TOTAL: {TICKET_PRICE} STX
          </Text>

          <Button 
            size="lg" 
            colorScheme="green" 
            onClick={handleEnterRaffle}
          >
            Buy 1 Ticket
          </Button>

        </VStack>
      </CardBody>
    </Card>
  );
}
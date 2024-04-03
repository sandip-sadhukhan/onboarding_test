import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axiosInstance from "@/utils/axiosInstance";
import useScore from "@/utils/useScore";
import { Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function RewardPage() {
  interface IReward {
    id: number;
    name: string;
    description: string;
    score_to_unlock: number;
  }

  const [rewards, setRewards] = useState<IReward[]>([]);
  const score = useScore();


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("rewards/")
      const data = res.data as IReward[];
      setRewards(data);
    }
    fetchData();

  }, []);

  return (
    <HStack h="100vh" align="start" spacing={0}>
      <Sidebar />

      <VStack flex={1} h="full">
        <Navbar title="Reward" description="Earn points and use those points to claim rewards" icon="/gift.png" score={score} />

        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' w="full" maxW="container.lg" mt={5}>
          {
            rewards.map(reward => (
              <Card key={reward.id}>
                <CardHeader>
                  <Heading size='md'>{reward.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{reward.description}</Text>
                </CardBody>
                <CardFooter>
                  <Tooltip hasArrow label={`Score required: ${reward.score_to_unlock}`} aria-label="A tooltip">

                    <Button colorScheme="blue" isDisabled={reward.score_to_unlock > score}>Claim</Button>
                  </Tooltip>
                </CardFooter>
              </Card>

            ))
          }
        </SimpleGrid>

      </VStack>

    </HStack>
  );
}

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axiosInstance from "@/utils/axiosInstance";
import useScore from "@/utils/useScore";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
  const score = useScore();

  interface ILeaderboard {
    id: number;
    first_name: string;
    total_score: number;
  }

  const [leaderBoardData, setLeaderBoardData] = useState<ILeaderboard[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("leaderboard/")
      const data = res.data as ILeaderboard[];
      setLeaderBoardData(data);
    }
    fetchData();

  }, []);

  return (
    <HStack h="100vh" align="start" spacing={0}>
      <Sidebar />

      <VStack flex={1} h="full">
        <Navbar title="Leaderboard" description="See where you stand among other learners around the worlds." icon="/award.png" score={score} />


        <VStack w="full" maxW="container.sm">
          {
            leaderBoardData.map((leader, index) => (
              <HStack key={leader.id} bg="linkedin.100" w="full" px={5} py={2} justifyContent="space-between" spacing={8} borderRadius="sm">
                <Text>{index + 1}</Text>
                <HStack flex={1}>
                  <Avatar bgColor="blue.300" name={leader.first_name} size="sm" />
                  <Text>{leader.first_name}</Text>
                </HStack>
                <Text>{leader.total_score} Points</Text>
              </HStack>
            ))
          }

        </VStack>


      </VStack>

    </HStack>
  );
}

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axiosInstance from "@/utils/axiosInstance";
import useScore from "@/utils/useScore";
import { Button, Container, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import axios from "axios";
import NextLink from 'next/link';
import { useEffect, useState } from "react";

export default function Home() {
  var baseURL = "http://localhost:8000"

  interface IActivity {
    id: number;
    activity_name: string;
    completed: boolean;
    start_date: string;
    end_date: string;
    is_active: boolean;
  }

  const [activities, setActivities] = useState<IActivity[]>([]);
  const score = useScore();


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('activities/')
      console.log(res)
      const data = res.data as IActivity[];
      setActivities(data);
    }
    fetchData();

  }, []);

  return (

    <HStack h="100vh" align="start" spacing={0}>
      <Sidebar />
      <VStack flex={1} h="full">
        <Navbar title="Activities" description="Complete below activities to earn score. And use those to claim rewards." icon="/house.png" score={score} />

        <Container maxW="container.lg" mt={5}>
          <TableContainer>
            <Table variant='simple'>
              <Thead bg="gray.100">
                <Tr>
                  <Th>Activity name</Th>
                  <Th>Start date</Th>
                  <Th>End date</Th>
                  <Th>Is active</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  activities.map((activity) => (
                    <Tr key={activity.id}>
                      <Td>{activity.activity_name}</Td>
                      <Td>{new Date(activity.start_date).toDateString()}</Td>
                      <Td>{new Date(activity.end_date).toDateString()}</Td>
                      <Td>{activity.is_active ? "Yes" : "No"}</Td>
                      <Td><Button as={NextLink} href={activity.completed ? "/": `/activity/${activity.id}`} size="sm" colorScheme={activity.completed ? "gray" : "blue"} isDisabled={activity.completed}>{activity.completed ? "Completed" : "Learn"}</Button></Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </Container>

      </VStack>

    </HStack>
  );
}

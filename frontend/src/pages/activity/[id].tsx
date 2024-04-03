import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axiosInstance from "@/utils/axiosInstance";
import useScore from "@/utils/useScore";
import { Button, Container, Flex, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

export default function Home() {
    // get path variable from uRL
    const { id } = useParams();
    const router = useRouter();

    const score = useScore();

    interface IActivity {
        id: number;
        name: string;
        description: boolean;
    }


    const [activity, setActivity] = useState<IActivity | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get(`activity/${id}`)
            const data = res.data as IActivity;
            setActivity(data);
        }

        fetchData();

    }, []);

    const completeActivity = async function() {
        await axiosInstance.post(`activity/complete/${id}/`);
        // redirect to index page
        router.push("/")
    }

    return (
        <HStack h="100vh" align="start" spacing={0}>
            <Sidebar />
            <VStack flex={1} h="full">
                <Navbar title={activity && activity.name} description="Complete below activity to earn score. And use those to claim rewards." icon="/house.png" score={score} />

                <Container maxW="container.lg" mt={5} boxShadow="md" h="full" mb={3} p={5}>
                    <Text>{activity && activity.description}</Text>

                    <Flex>
                        <Button colorScheme="blue" mx="auto" my={10} onClick={completeActivity}>Complete Activity</Button>
                    </Flex>
                </Container>

            </VStack>

        </HStack>
    );
}

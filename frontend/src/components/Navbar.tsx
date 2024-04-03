import { Box, Container, HStack, Heading, Image, Progress, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface Props {
    title: string;
    icon: string;
    description: string;
    score: number;
}

const Navbar = (props: Props) => {
    const gold_badge = 1000;

    return (
        <Box as="nav" w="full" borderBottom="1px solid" borderBottomColor="gray.300" pos="relative">
            <VStack my={2} spacing={3}>
                <Image src={props.icon} w="70px" alt="Home" />
                <Heading as="h1" size="lg" color="gray.600">{props.title}</Heading>
                <Text color="gray.600" mb={5}>{props.description}</Text>
            </VStack>

            <VStack pos="absolute" top={0} right={0} spacing={1} p={2} align="start">
                <HStack align="center" justifyContent="center">

                    <Text fontSize="14px" color="blue.400" fontWeight="bold">Score: {props.score}</Text>
                    <Progress value={props.score / gold_badge * 100} size='md' borderRadius="md" colorScheme='blue' w="200px" />
                </HStack>
                <Text fontSize="12px" color="gray.600" fontWeight="semibold">(Score {gold_badge - props.score} more points, to earn gold badge)</Text>
            </VStack>
        </Box>
    )
}

export default Navbar
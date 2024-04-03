import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
    // Get current path
    const router = useRouter()
    const path = router.pathname

    const links = [{
        name: 'LEARN',
        href: '/',
        icon: '/house.png'
    }, {
        name: 'LEADERBOARD',
        href: '/leaderboard',
        icon: '/award.png'
    }, {
        name: 'REWARD',
        href: '/reward',
        icon: '/gift.png'

    }]

    return (
        <VStack h="full" pt={5} px={3} borderRight="1px solid" borderRightColor="gray.300">
            <Image src="/logo.webp" w="140px" alt="Logo" />

            <VStack align="stretch" mt={10} w="full" spacing={4}>
                {
                    links.map(link => (
                        <NextLink key={link.name} href={link.href}>
                            <HStack alignItems="center" px={6} py={2} spacing={4} w="full" borderRadius="sm" _hover={{bgColor: "linkedin.100", outline: "2px solid", outlineColor:"linkedin.300"}}  bgColor={path == link.href ? "linkedin.100": "none"}>
                                <Image src={link.icon} h="20px" />
                                <Text color="gray.600" fontWeight="bold" fontSize="12px" >{link.name}</Text>
                            </HStack>
                        </NextLink>
                    ))
                }
            </VStack>

        </VStack>
    )
}

export default Sidebar
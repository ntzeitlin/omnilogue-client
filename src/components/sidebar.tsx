import { Box, Flex, Heading, Separator } from "@radix-ui/themes"
import Link from "next/link"

export const SideBar = () => {

    return (
       <Flex 
       direction="column"
       gap="3"
       px="5"
       style={{
        height: '100vh',
        width: '250px',
        borderRight: '0.25px solid white'
       }}>
        <Heading align="center" mt="3">
            Bookshelf
        </Heading>
        <Separator size="4" mb="2" />

       <Box px="3" py="2" style={{border: '2px solid white', borderRadius: "6px", background: "", opacity: 0.7}}>
        <Flex direction="column" gap="3">
            <Link href="/stories/1">Test Book</Link>
        </Flex>
       </Box>

       </Flex>
    )
}
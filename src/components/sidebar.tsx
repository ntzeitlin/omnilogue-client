import { useAuthToken } from "@/auth/queries"
import { getBookshelf } from "@/data/stories"
import { Box, Flex, Heading, Separator } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export const SideBar = () => {

    const {token} = useAuthToken()

    const {data: bookshelfStories} = useQuery({
        queryKey: ["bookshelf", token],
        queryFn: () => {
            return getBookshelf(token)
        }
    })

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

            {bookshelfStories && bookshelfStories.map((story) => { return (
       <Box key={story.id} px="3" py="2" style={{border: '2px solid white', borderRadius: "6px", background: "", opacity: 0.7}}>
        <Flex direction="column" gap="3">
                <Link href={`/library/stories/${story.story.id}`}>{story.story.title}</Link>
                
        </Flex>
       </Box>
                )})}

       </Flex>
    )
}
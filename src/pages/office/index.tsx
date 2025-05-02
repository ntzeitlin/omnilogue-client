import { useAuthToken } from "@/auth/queries"
import { NavBar } from "@/components/navbar"
import { StoryOverviewCard } from "@/components/storyoverview"
import { getAllStories } from "@/data/stories"
import { Box, Button, Flex, ScrollArea } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"


export default function Office() {
    const router = useRouter()
    const {userId, token} = useAuthToken()

    const {data: myStories, isLoading} = useQuery({
        queryKey: ['stories_overview', userId],
        queryFn: async () => {
            const filtered_stories = await getAllStories(token).then((data) => data.filter(story => parseInt(story.author.id) === parseInt(userId)))
            return filtered_stories
        }
    })

    return (
    <>
    <Flex justify="center">
    <Box maxWidth="800px">
        <ScrollArea type="auto" scrollbars="vertical" style={{height: '100vh'}}>
        <Flex direction="column" gap="2" p="3">
          {!isLoading && myStories?.map(story => {
            return <StoryOverviewCard key={story.id} story={story} />
          })}
        </Flex>
        </ScrollArea>
    </Box>
    </Flex>
    </>
    )
}

Office.getLayout = function getLayout(page)
{   return (
    <>
        <NavBar />
        {page}
    </>
)
}
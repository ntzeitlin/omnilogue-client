import { useAuthToken } from "@/auth/queries"
import { getBookshelf } from "@/data/stories"
import { Card, Flex, Heading, Separator } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export const SideBar = () => {

    const {token} = useAuthToken()

    const {data: bookshelfStories} = useQuery({
        queryKey: ["bookshelf", token],
        queryFn: () => {
            return getBookshelf(token)
        },
        placeholderData: [], 
        enabled: !!token
    })

    return (
        <Card style={{width: '22em'}}>
            <Flex 
            direction="column"
            gap="3"
            px="5"
            style={{
                height: '70vh',
                width: '250px',
            }}>
                <Heading align="center" mt="3">
                    Bookshelf
                </Heading>
                <Separator size="4" mb="2" />

                    {bookshelfStories && bookshelfStories?.map((story) => { return (
            <Card key={story.id} mr="1">
                    <Link href={`/library/stories/${story?.story.id}/read/${story?.story?.start_section?.id}`}>{story.story.title}</Link>        
            </Card>
                        )})}

            </Flex>
        </Card>
    )
}
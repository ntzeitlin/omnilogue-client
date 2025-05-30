import { useAuthToken } from "@/auth/queries";
import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";
import { StoryOverviewCard } from "@/components/storyoverview";
import { getAllStories } from "@/data/stories";
import { Box, Container, Flex, ScrollArea } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";


interface StoryOverview {
  "id": number;
  "is_public": boolean;
  "author": object;
  "title": string;
  "subtitle": string;
  "category": object;
  "story_tags": object[];
  "average_rating": number; 
}

export default function Library() {
  const { token } = useAuthToken()

  const {data: stories, isLoading} = useQuery<StoryOverview[]>({
    queryKey: ['stories_overview'],
    queryFn: async () => {
      return await getAllStories(token)
    },
    enabled: !!token
  })

  if (isLoading) {
    return <>Loading Stories...</>
  }

  return (
    <>
    <ScrollArea type="auto" scrollbars="vertical" style={{height: '100vh'}}>
        <Flex direction="column" gap="2" px="3">
          {!isLoading && stories?.map(story => {
            return <StoryOverviewCard key={story.id} story={story} />
          })}
        </Flex>
        </ScrollArea>
    </>
  );
}

Library.getLayout = function getLayout(page)
{
  return (
    <>
    <NavBar />
    <Container>
      <Flex>
        <SideBar />
        {page}
      </Flex>
    </Container>

    </>

  )
}
import { useAuthToken } from "@/auth/queries";
import { NavBar } from "@/components/navbar";
import { getAllStories } from "@/data/stories";
import { Flex } from "@radix-ui/themes";
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

export default function Home() {
  const {token} = useAuthToken()

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
      OMNILOGUE HOMEPAGE
    </>
  );
}

Home.getLayout = function getLayout(page)
{
  return (
    <>
    <NavBar />
    <Flex>
    <Flex grow="1" p="4">
    {page}
    </Flex>
    </Flex>
    </>

  )
}
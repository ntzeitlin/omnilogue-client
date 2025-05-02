import { useAuthToken } from "@/auth/queries";
import { getBookshelf } from "@/data/stories";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface Author {
    first_name: string;
    last_name: string;
    id: string | number;
  }
  
  interface Category {
    name: string;
    id: string | number;
  }
  
  interface Tag {
    name: string;
    id: string | number;
  }
  
  interface StoryTag {
    tag: Tag;
    id: string | number;
  }
interface Story {
    id: string | number;
    is_public: boolean;
    author: Author;
    title: string;
    subtitle: string;
    category: Category;
    story_tags: StoryTag[];
    average_rating: number;
  }

  interface StoryOverviewCardProps {
    story: Story
  }

export const StoryOverviewCard: React.FC<StoryOverviewCardProps> = ({story}) => {
    const {id, is_public, author, title, subtitle, category, story_tags, average_rating} = story

    const {token} = useAuthToken()
    const queryClient = useQueryClient()
    const {data: bookshelf} = useQuery({
      queryKey: ['bookshelf', token],
      queryFn: async () => { return await getBookshelf(token)}
    })

    // Check to see if the current book is on the bookshelf
    // Toggle between mutation functions depending on presence
    // Toggle between button styles

    const isOnBookshelf = () => {
      return bookshelf?.some(story => story?.story.id === id)
    }
    
    const toggleBookshelfMutation = useMutation({
      mutationFn: async () => {
        if (!isOnBookshelf()) {
          const response = await fetch("http://localhost:8000/bookshelves", {
            method: 'POST',
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "story_id": id
            })
          })
          if (!response.ok) {
            throw new Error('Failed to add to bookshelf')
          }
          const data = await response.json()
          return data
        }

        // if already on bookshelf, run delete instead
        const response = await fetch(`http://localhost:8000/bookshelves/${id}`,{
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to remove from bookshelf')
        } 

        const data = await response.json()
        return data        
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: ['bookshelf', token]})
      }
    })

    // if (!is_public){
    //     return ""
    // }

    if (!story) {
      return "Loading..."
    }

    // NOTE: Fix formatting for cards
    return (
        // <Box>
            <Card>
                <Flex gap="4" justify="center" align="center"> 
                    <Flex direction="column" align="center">
                        <Link href={`/library/stories/${id}/read/${story.start_section ? story.start_section.id : 1}`}>
                          <Text>
                          {title} 
                          </Text>
                        </Link>
                        <Text>
                        {subtitle ? `"${subtitle}"` : ""}
                        </Text>
                    </Flex> 
                    <Flex align="center">
                        {author?.first_name} {author?.last_name}
                    </Flex>
                    <Flex align="center">
                        {category?.name}
                    </Flex>
                    <Flex align="center">
                        {story_tags?.map(story_tag => `"${story_tag.tag.name}", `)}
                    </Flex>
                    <Flex align="center">
                       Average Rating: {average_rating || "No Reviews"}
                    </Flex>
                    {isOnBookshelf() ? <Button onClick={()=> {toggleBookshelfMutation.mutate()}}>Remove from Bookshelf</Button> : <Button onClick={()=> {toggleBookshelfMutation.mutate()}}>Add to Bookshelf</Button> }
                    
                </Flex>
            </Card>
        // </Box>
    )
}
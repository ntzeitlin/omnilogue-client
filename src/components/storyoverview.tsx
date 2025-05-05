import { useAuthToken } from "@/auth/queries";
import { getBookshelf } from "@/data/stories";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
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
            // <Card>
            //     <Flex gap="4" justify="center" align="center"> 
            //         <Flex direction="column" align="center">
            //             <Link href={`/library/stories/${id}/read/${story.start_section ? story.start_section.id : 1}`}>
            //               <Text>
            //               {title} 
            //               </Text>
            //             </Link>
            //             <Text>
            //             {subtitle ? `"${subtitle}"` : ""}
            //             </Text>
            //         </Flex> 
            //         <Flex align="center">
            //             {author?.first_name} {author?.last_name}
            //         </Flex>
            //         <Flex align="center">
            //             {category?.name}
            //         </Flex>
            //         <Flex align="center">
            //             {story_tags?.map(story_tag => `"${story_tag.tag.name}", `)}
            //         </Flex>
            //         <Flex align="center">
            //            Average Rating: {average_rating || "No Reviews"}
            //         </Flex>
            //         {isOnBookshelf() ? <Button onClick={()=> {toggleBookshelfMutation.mutate()}}>Remove from Bookshelf</Button> : <Button onClick={()=> {toggleBookshelfMutation.mutate()}}>Add to Bookshelf</Button> }
                    
            //     </Flex>
            // </Card>
        // </Box>
        <Card variant="surface" size="2" mb="3" p="4">
      <Flex direction="column" gap="3">
        {/* Title and Bookmark Button Row */}
        <Flex justify="between" align="center">
          <Link href={`/library/stories/${id}/read/${story.start_section ? story.start_section.id : 1}`}>
            <Heading as="h3" size="4" className="hover:underline">
              {title}
            </Heading>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => toggleBookshelfMutation.mutate()}
            aria-label={isOnBookshelf() ? "Remove from Bookshelf" : "Add to Bookshelf"}
          >
            {isOnBookshelf() ? 
              <BookmarkFilledIcon width="20" height="20" className="text-amber-500" /> : 
              <BookmarkIcon width="20" height="20" />
            }
          </Button>
        </Flex>

        {/* Subtitle */}
        {subtitle && (
          <Text size="2" color="gray" italic>
            "{subtitle}"
          </Text>
        )}

        {/* Author Row */}
        <Flex gap="2" align="center">
          <Avatar
            size="1" 
            fallback={author?.first_name?.[0] || "A"} 
            radius="full"
          />
          <Text size="2" weight="medium">
            {author?.first_name} {author?.last_name}
          </Text>
        </Flex>

        {/* Tags and Categories */}
        <Flex gap="3" align="center" wrap="wrap">
          {category && (
            <Badge color="amber" variant="surface" radius="full" size="1">
              {category.name}
            </Badge>
          )}
          {story_tags && story_tags.length > 0 && (
            <Flex gap="1" wrap="wrap">
              {story_tags.map((tag, index) => (
                <Badge key={index} color="gray" variant="soft" radius="full" size="1">
                  {tag.tag.name}
                </Badge>
              ))}
            </Flex>
          )}
          
          {/* Rating */}
          {average_rating ? (
            <Flex align="center" gap="1" ml="auto">
              <Text size="1" weight="bold">
                {average_rating}
              </Text>
              <Text size="1" color="amber">★</Text>
            </Flex>
          ) : (
            <Text size="1" color="gray" ml="auto">
              No reviews yet
            </Text>
          )}
        </Flex>
        
        {/* Read Button */}
        <Box mt="2">
          <Link href={`/library/stories/${id}/read/${story.start_section ? story.start_section.id : 1}`}>
            <Button variant="soft" color="indigo" size="2" width="100%">
              Read Story
            </Button>
          </Link>
        </Box>
      </Flex>
    </Card>
      )
}
import { useAuthToken } from "@/auth/queries";
import { deleteStory, getBookshelf } from "@/data/stories";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { AlertDialog, Avatar, Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

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
  
    const {token, userId} = useAuthToken()
    const router = useRouter()
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
    
    const handleDelete = (token, storyId) => {
      deleteStory(token, storyId).then(()=> {router.push('/library/')})
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


    return (
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
          <Flex gap="2">

          <Link href={`/library/stories/${id}/read/${story.start_section ? story.start_section.id : 1}`}>
            <Button variant="soft" color="indigo" size="2" width="100%">
              Read Story
            </Button>
          </Link>
        {story && parseInt(author?.id) === parseInt(userId) ? 
                    <>
                        <Flex gap="2" justify="center">
                        <Button variant="soft" color="green" onClick={()=>{router.push(`/office/stories/${story.id}/edit`)}}>Edit</Button>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button variant="soft" color="red">Delete</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Delete Story</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure? This story will no longer be accessible and any related information will also be deleted.
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button color="red" onClick={()=>{handleDelete(token, id)}}>DELETE</Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                        </Flex>
                    </> 
                    : ""}
          </Flex>
        </Box>
      </Flex>
    </Card>
      )
}
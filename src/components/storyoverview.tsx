import { Box, Card, Flex, Text } from "@radix-ui/themes"
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

    if (!is_public){
        return ""
    }

    // NOTE: Fix formatting for cards
    return (
        <Box>
            <Card>
                <Flex gap="4" justify="center"> 
                    <Flex direction="column" align="center">
                        <Link href={`/library/stories/${id}`}>
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
                        {category.name}
                    </Flex>
                    <Flex align="center">
                        {story_tags.map(story_tag => `"${story_tag.tag.name}", `)}
                    </Flex>
                    <Flex align="center">
                       Average Rating: {average_rating || "No Reviews"}
                    </Flex>
                </Flex>
            </Card>
        </Box>
    )
}
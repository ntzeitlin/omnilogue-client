import { Box, Card, Flex, Text } from "@radix-ui/themes"

export const StoryOverviewCard = ({story}) => {
    const {is_public, author, title, subtitle, category, story_tags, average_rating} = story

    // if (!is_public){
    //     return ""
    // }

    // NOTE: Fix formatting for cards
    return (
        <Box>
            <Card>
                <Flex gap="4" justify="center"> 
                    <Flex direction="column" align="center">
                        <Text>
                        {title} 
                        </Text>
                        <Text>
                        "{subtitle}"
                        </Text>
                    </Flex> 
                    <Flex align="center">
                        {author?.first_name} {author?.last_name}
                    </Flex>
                    <Flex align="center">
                        {category.name}
                    </Flex>
                    <Flex align="center">
                        {story_tags.map(story_tag => `"${story_tag.tag.name}, `)}
                    </Flex>
                    <Flex align="center">
                       Average Ratng: {average_rating || "No Reviews"}
                    </Flex>
                </Flex>
            </Card>
        </Box>
    )
}
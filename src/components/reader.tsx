import { useAuthToken } from "@/auth/queries"
import { deleteStory } from "@/data/stories"
import { Badge, Box, Button, Card, Flex, Heading, ScrollArea, Separator, Text } from "@radix-ui/themes"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"





const StoryMetaData = ({story}) => {
    return (
        <Card variant="surface" size="1" my="3">
            <Flex gap="3" align="center">
                {story.category && (<Badge color="amber" variant="surface" radius="full" size="1">
                    {story.category.name}
                </Badge>)}

                {story.story_tags && story.story_tags.length > 0 && (
                    <Flex gap="1" wrap="wrap">
                        {story.story_tags.map((tag, index) => (
                            <Badge key={index} color="gray" variant="soft" radius="full" size="1">
                                {tag.tag.name}
                            </Badge>
                        ))}
                    </Flex>
                )}

                {story.average_rating && (
                    <Flex align="center" gap="1" ml="auto">
                        <Text size="1" weight="bold">
                            {story.average_rating}
                        </Text>
                        <Text size="1" color="gray">★</Text>
                    </Flex>
                )}
            </Flex>
        </Card>
    )
}

const SectionList = ({sections}) => {
    return (
        <>
        <Heading size="5">Sections:</Heading>
        {sections?.map((section, index) => (
            <Box py="2" px="3" my="1" key={`story-section-${index}`}>
                <Text size="2">{section.title}</Text>
            </Box>
        ))}
        </>
    )
}


//URL: /stories/{story_id}/read/{section_id}
export const StoryReader = ({story}) => {
    const router = useRouter()
    const {token, userId} = useAuthToken()
    const {storyId} = router.query

    const handleDelete = (token, storyId) => {
        deleteStory(token, storyId).then(()=> {router.push('/library/')})
    }
    // Loading state
    if (router.isFallback) {
    return (
        <Flex justify="center" align="center" height="100vh">
            <div className="loading-spinner">Loading...</div>
        </Flex>
    );
    }

    // Story not found state
    if (!story) {
    return (
        <Flex direction="column" justify="center" align="center" height="100vh" gap="3">
        <Heading size="4">Story Not Found</Heading>
        <Button asChild>
            <Link href="/books">Return to Library</Link>
        </Button>
        </Flex>
    );
    }

    return (
        <>
        <Head>
           <title>{story?.title} | OMNILOGUE</title> 
        </Head>
        <Flex>
            {/* SIDEBAR: */}
            <Flex direction="column" style={{height: '100vh', borderRight: '0.25px solid white'}}>
                <Box p="3">
                    <Heading size="4" mb="1">{story.title}</Heading>
                    {story.subtitle && (
                    <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
                    {story.subtitle}
                    </Text>  
                    )}
                    {story.author && (
                        <Flex align="center" gap="2" mb="3">
                            <Text size="2">
                        {story.author.first_name} {story.author.last_name}
                    </Text>
                        </Flex>
                    )}
                    <StoryMetaData story={story}/>
                    <Separator my="3" size="4" />

                    <SectionList sections={story.sections} />

                    <Separator my="3" size="4" />
                    {story && parseInt(story.author.id) === parseInt(userId) ? 
                    <>
                        <Flex gap="2">
                        <Button onClick={()=>{router.push(`/office/stories/${story.id}/edit`)}}>EDIT</Button>
                        <Button color="red" onClick={()=>{handleDelete(token, storyId)}}>DELETE</Button>
                        </Flex>
                    </> 
                    : ""}
                    
                </Box>
            </Flex>

            {/* READER: */}
            
            <ScrollArea type="always" scrollbars="vertical" style={{height: '100vh'}} >
                <Box mx="5">
                    {story?.sections && (
                        story?.sections.map((section, index) => (
                            <Box key={`story-section-box-${index}`} width="700px">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {section.content}
                                </ReactMarkdown>
                            </Box>
                        ))
                    )}
                </Box>
            </ScrollArea>

        </Flex>

        </>
    )
}
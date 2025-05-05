import React from 'react';
import { Box, Button, Card, Flex, Heading, Text, Badge, Avatar, Container, Grid, Separator } from "@radix-ui/themes";
import { BookmarkIcon, MagnifyingGlassIcon, PersonIcon, PlusIcon, ReaderIcon } from "@radix-ui/react-icons";
import { NavBar } from '@/components/navbar';
import { useRouter } from 'next/router';

const HomePage = () => {
    const router = useRouter()

  // Sample story data to showcase the platform
  const featuredStories = [
    {
      id: 1,
      title: "The Midnight Library",
      subtitle: "Every book a different life you could have lived",
      author: { first_name: "Emma", last_name: "Wells", id: 1 },
      category: { name: "Fantasy", id: 1 },
      story_tags: [
        { tag: { name: "Parallel Universes", id: 1 }, id: 1 },
        { tag: { name: "Choices", id: 2 }, id: 2 }
      ],
      average_rating: 4.8,
      start_section: { id: 1 }
    },
    {
      id: 2,
      title: "Digital Nomad",
      subtitle: "A journey through the code that shapes our world",
      author: { first_name: "Marcus", last_name: "Chen", id: 2 },
      category: { name: "Sci-Fi", id: 2 },
      story_tags: [
        { tag: { name: "Technology", id: 3 }, id: 3 },
        { tag: { name: "AI", id: 4 }, id: 4 }
      ],
      average_rating: 4.6,
      start_section: { id: 1 }
    }
  ];

  // Sample sections to demonstrate the reading experience
  const sampleStory = {
    title: "Welcome to Omnilogue",
    subtitle: "Where every story opens new worlds",
    author: { first_name: "The", last_name: "Team", id: 0 },
    sections: [
      {
        id: 1,
        title: "Begin Your Journey",
        content: "# Welcome to Omnilogue\nYou've just discovered a new way to experience stories. Here, narratives aren't just read—they're *explored*.\n\nClick on [[Discover More]] to continue your journey."
      },
      {
        id: 2,
        title: "Discover More",
        content: "# The Power of Connected Stories\nOmnilogue brings the concept of linked knowledge to storytelling. Every [[connection]] can lead to new insights, unexpected twists, or deeper context.\n\nAs a reader, you can follow these paths at your own pace, creating a unique journey through each story."
      },
      {
        id: 3,
        title: "connection",
        content: "# Connections: The Heart of Omnilogue\nIn traditional books, you might find footnotes or references. Here, those connections are seamless and dynamic.\n\nEach story can be organized in the way that makes the most sense for its narrative—chronologically, thematically, or even as a web of interconnected ideas.\n\nReady to [[Try It Yourself]]?"
      }
    ],
    category: { name: "Guide", id: 0 },
    story_tags: [
      { tag: { name: "Getting Started", id: 0 }, id: 0 },
      { tag: { name: "Tutorial", id: 5 }, id: 5 }
    ]
  };

  // Story component inspired by StoryOverviewCard
  const StoryCard = ({ story }) => {
    return (
      <Card variant="surface" size="2" p="4">
        <Flex direction="column" gap="3">
          <Flex justify="between" align="center">
            <Heading as="h3" size="4" className="hover:underline">
              {story.title}
            </Heading>
            <Button variant="ghost" aria-label="Add to Bookshelf">
              <BookmarkIcon width="20" height="20" />
            </Button>
          </Flex>

          {story.subtitle && (
            <Text size="2" color="gray" style={{fontStyle:'italic'}}>
              {story.subtitle}
            </Text>
          )}

          <Flex gap="2" align="center">
            <Avatar size="1" fallback={story.author?.first_name?.[0] || "A"} radius="full" />
            <Text size="2" weight="medium">
              {story.author?.first_name} {story.author?.last_name}
            </Text>
          </Flex>

          <Flex gap="3" align="center" wrap="wrap">
            {story.category && (
              <Badge color="amber" variant="surface" radius="full" size="1">
                {story.category.name}
              </Badge>
            )}
            {story.story_tags && story.story_tags.length > 0 && (
              <Flex gap="1" wrap="wrap">
                {story.story_tags.map((tag, index) => (
                  <Badge key={index} color="gray" variant="soft" radius="full" size="1">
                    {tag.tag.name}
                  </Badge>
                ))}
              </Flex>
            )}
            
            {story.average_rating ? (
              <Flex align="center" gap="1" ml="auto">
                <Text size="1" weight="bold">
                  {story.average_rating}
                </Text>
                <Text size="1" color="amber">★</Text>
              </Flex>
            ) : null}
          </Flex>
          
          <Box mt="2">
            <Button variant="soft" color="indigo" size="2">
              Read Story
            </Button>
          </Box>
        </Flex>
      </Card>
    );
  };

  // Reader component inspired by your StoryReader
  const ReaderDemo = ({ story }) => {
    const [currentSectionId, setCurrentSectionId] = React.useState(1);
    
    const currentSection = story.sections.find(section => section.id === currentSectionId);

    // Function to handle link clicks in markdown content
    const handleContentClick = (e) => {
      if (e.target.tagName === 'STRONG' && e.target.textContent.includes('[[')) {
        const linkText = e.target.textContent.replace(/\[\[|\]\]/g, '');
        const targetSection = story.sections.find(section => section.title === linkText);
        if (targetSection) {
          setCurrentSectionId(targetSection.id);
        }
      }
    };

    // Custom markdown renderer that handles [[links]]
    const MarkdownContent = ({ content }) => {
      // Replace [[text]] patterns with <strong>[[text]]</strong> for styling and click handling
      const processedContent = content.replace(/\[\[(.*?)\]\]/g, '**[[$1]]**');
      
      return (
        <Box 
          className="markdown-content" 
          onClick={handleContentClick}
          dangerouslySetInnerHTML={{ 
            __html: processedContent
              .replace(/#{1,6} (.*?)$/gm, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br />')
          }} 
        />
      );
    };

    return (
      <Flex style={{ border: '1px solid var(--gray-6)', borderRadius: '8px', overflow: 'hidden' }}>
        {/* SIDEBAR */}
        <Flex direction="column" style={{ width: '220px', borderRight: '1px solid var(--gray-6)' }}>
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
            
            <Card variant="surface" size="1" my="3">
              <Flex gap="3" align="center">
                {story.category && (
                  <Badge color="amber" variant="surface" radius="full" size="1">
                    {story.category.name}
                  </Badge>
                )}
                {story.story_tags && story.story_tags.length > 0 && (
                  <Flex gap="1" wrap="wrap">
                    {story.story_tags.map((tag, index) => (
                      <Badge key={index} color="gray" variant="soft" radius="full" size="1">
                        {tag.tag.name}
                      </Badge>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Card>
            
            <Separator my="3" size="4" />

            <Heading size="5">Sections:</Heading>
            {story.sections?.map((section, index) => (
              <Box 
                py="2" 
                px="3" 
                my="1" 
                key={`story-section-${index}`}
                style={{ 
                  backgroundColor: currentSectionId === section.id ? 'var(--gray-4)' : 'transparent',
                  borderRadius: '4px'
                }}
                onClick={() => setCurrentSectionId(section.id)}
              >
                <Text size="2">{section.title}</Text>
              </Box>
            ))}
          </Box>
        </Flex>

        {/* READER */}
        <Box p="4" style={{ flex: 1, minHeight: '340px' }}>
          {currentSection && (
            <Box width="100%">
              <MarkdownContent content={currentSection.content} />
            </Box>
          )}
        </Box>
      </Flex>
    );
  };

  return (
    <Container size="4">
      <Box py="6">
        {/* Hero Section */}
        <Flex direction="column" align="center" justify="center" gap="4" pb="5">
          <Heading size="9" align="center">OMNILOGUE</Heading>
          <Text size="5" align="center" style={{ maxWidth: '760px' }}>
          Stories Beyond Boundaries
          </Text>
        </Flex>

        <Separator size="4" my="6" />
        
        {/* How It Works Section */}
        <Box my="2">
          <Heading size="6" mb="6" align="center">How Omnilogue Works</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
            <Card variant="surface" p="4">
              <Flex direction="column" align="center" gap="2">
                <Box mb="2">
                  <ReaderIcon width="32" height="32" />
                </Box>
                <Heading size="3">Explore</Heading>
                <Text align="center">
                  Discover stories with connected nodes that let you navigate narratives in new ways
                </Text>
              </Flex>
            </Card>
            
            <Card variant="surface" p="4">
              <Flex direction="column" align="center" gap="2">
                <Box mb="2">
                  <BookmarkIcon width="32" height="32" />
                </Box>
                <Heading size="3">Collect</Heading>
                <Text align="center">
                  Save your favorite stories to your personal bookshelf for easy access
                </Text>
              </Flex>
            </Card>
            
            <Card variant="surface" p="4">
              <Flex direction="column" align="center" gap="2">
                <Box mb="2">
                  <PlusIcon width="32" height="32" />
                </Box>
                <Heading size="3">Create</Heading>
                <Text align="center">
                  Write your own interconnected stories using our intuitive editing tools
                </Text>
              </Flex>
            </Card>
            
            <Card variant="surface" p="4">
              <Flex direction="column" align="center" gap="2">
                <Box mb="2">
                  <PersonIcon width="32" height="32" />
                </Box>
                <Heading size="3">Connect</Heading>
                <Text align="center">
                  Follow authors, rate stories, and join a community of storytellers
                </Text>
                <Badge key={'comingsoon'} color="gray" variant="soft" radius="full" size="1">
                    Coming Soon
                </Badge>
              </Flex>
            </Card>
          </Grid>
        </Box>
        
        <Separator size="4" my="6" />
        
        {/* Demo Section */}
        <Box my="8">
          <Heading size="6" mb="2">Experience Omnilogue</Heading>
          <Text size="3" mb="6">Try out our interactive reader with this sample story</Text>
          
          <ReaderDemo story={sampleStory} />
          
          <Text size="2" color="gray" align="center" mt="4">
            Click on the bolded links in the story to navigate between sections, just like in a real Omnilogue story!
          </Text>
        </Box>
        
        <Separator size="4" my="6" />
        
        {/* Featured Stories Section */}
        <Box my="8">
          <Flex justify="between" align="baseline" mb="4">
            <Heading size="6">Featured Stories</Heading>
            <Button variant="ghost" color="gray" onClick={() => {router.push('/library')}}>
              <Flex gap="1" align="center">
                <Text>Browse Library</Text>
                <MagnifyingGlassIcon />
              </Flex>
            </Button>
          </Flex>
          
          <Grid columns={{ initial: '1', sm: '2' }} gap="4">
            {featuredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </Grid>
        </Box>

        <Separator size="4" my="6" />
        
        {/* Call to Action */}
        <Flex direction="column" align="center" justify="center" gap="4" py="5">
          <Heading size="7" align="center">Ready to Start Your Journey?</Heading>
          <Text size="4" align="center" style={{ maxWidth: '760px' }}>
            Join Omnilogue today and discover a new way to experience stories
          </Text>
          <Button size="4" color="indigo" mt="4" onClick={()=> {router.push('/register')}}>
            Sign Up Now
          </Button>
        </Flex>
        
      </Box>
    </Container>
  );
};

HomePage.getLayout = function getLayout(page)
{
    return (

        <>
            <NavBar />
            {page}
        </>
    )
}

export default HomePage;
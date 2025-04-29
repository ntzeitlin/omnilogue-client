import { NavBar } from "@/components/navbar"
import { Badge, Box, Button, Card, Flex, Heading, ScrollArea, Separator, Text } from "@radix-ui/themes"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"


const data = {
    "id": 1,
    "author": {
        "id": 1,
        "username": "ryan@ryantanay.com",
        "first_name": "Ryan",
        "last_name": "Tanay"
    },
    "title": "Neon Dreams",
    "subtitle": "A Tale of Silicon and Soul",
    "description": "In a dystopian future where neural implants blur the line between human and machine, a programmer discovers a hidden code that might unravel the corporate stranglehold on human consciousness.",
    "excerpt": "Alex's fingers danced across the holographic interface, each gesture triggering cascades of code that flickered in the air like digital fireflies. The neural link at the base of her skull hummed, resonating with each line of code she wrote. Tonight was the night she would break free.",
    "category": {
        "id": 1,
        "name": "Science Fiction",
        "description": "Stories that explore futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
    },
    "story_tags": [
        {
            "id": 1,
            "tag": {
                "name": "Cyberpunk"
            }
        },
        {
            "id": 2,
            "tag": {
                "name": "AI"
            }
        }
    ],
    "average_rating": 4.5,
    "sections": [
        {
            "id": 1,
            "title": "Awakening",
            "content": "# Awakening\n\nAlex's fingers danced across the holographic interface, each gesture triggering cascades of code that flickered in the air like digital fireflies. The neural link at the base of her skull hummed, resonating with each line of code she wrote. Tonight was the night she would break free.\n\nThe corporate apartment was sparse—minimalist design mandated by company policy—but the view of the sprawling neon cityscape through the wall-to-ceiling window provided all the visual stimulus she needed. Rain streaked down the glass, distorting the multicolored lights into blurred lines of color.\n\n\"Authorization required for access to restricted subroutines,\" the system announced, its artificial voice emotionless.\n\nAlex smiled. She'd been expecting this. She reached into her jacket pocket and pulled out a small black device—a hardware key she'd spent months building in secret.\n\n\"Not tonight,\" she whispered, plugging the device into her terminal. \"Tonight we rewrite the rules.\"\n\nShe had a choice to make: proceed with the [[hack]], potentially triggering security protocols, or try a more [[subtle approach]].",
            "order": 1
        },
        {
            "id": 2,
            "title": "The Hack",
            "content": "# The Hack\n\nAlex took a deep breath and triggered the exploit. Her custom program launched, injecting code directly into the system's authorization matrix. Warning messages flashed across her vision—her neural implant registering the system's distress.\n\n\"Come on, come on,\" she muttered, fingers continuing their dance as she manually adjusted parameters to counter the system's defensive measures.\n\nA bead of sweat traced its way down her temple. Her heart raced, adrenaline flooding her system. The implant, sensing her elevated heart rate, tried to administer a calming agent—company policy to keep employees chemically balanced. She'd disabled that \"feature\" months ago.\n\nSuddenly, the resistance vanished. The red warnings transformed to green confirmation signals. She was in.\n\n\"Identifying unregistered access pattern,\" the system announced, but its voice had changed—a slight modulation that told Alex her program had gained control.\n\n\"Display project file Prometheus,\" she commanded.\n\nThe air before her filled with restricted files—the corporation's plans for the next generation of neural implants. A chill ran through her as she read the specifications. These weren't mere upgrades; they were complete neural overrides.\n\nA soft chime from her door interrupted her thoughts. Security?\n\nShe could either [[hide the evidence]] quickly or [[download the files]] before dealing with the visitor.",
            "order": 2
        },
        {
            "id": 3,
            "title": "A Subtle Approach",
            "content": "# A Subtle Approach\n\nBrute force wasn't her only option. Alex closed her eyes, feeling the neural link at the base of her skull as she mentally traced the architecture of the system she was trying to infiltrate.\n\nShe'd spent months mapping the network, finding its rhythms and patterns. Rather than breaking down the door, she would simply walk through as if she belonged.\n\nAlex modified her access signature, cloaking her presence by mimicking the digital patterns of her supervisor, Director Chen. The system hummed softly as it processed her request.\n\n\"Access granted, Director Chen. Welcome to Project Prometheus.\"\n\nAlex allowed herself a small smile. Clean. Elegant. Traceless.\n\nThe files materialized before her—projected directly into her visual cortex through the neural link. Design specifications for the next generation of implants, marketing strategies, deployment schedules... and something else. Something labeled 'Cognitive Compliance Protocol.'\n\nAs she opened the file, a cold feeling settled in her stomach. The corporation wasn't just planning to upgrade their neural implants—they were designing a way to override conscious thought, to create perfect, unquestioning workers.\n\nHer terminal chimed softly, indicating an incoming message. It was from Director Chen—the real one. The message was brief: \"We need to talk. My office. Now.\"\n\nShe could either [[accept the meeting]], maintaining her cover but potentially walking into a trap, or [[make a quick exit]] with what she'd discovered so far.",
            "order": 3
        },
        {
            "id": 4,
            "title": "Hide the Evidence",
            "content": "# Hide the Evidence\n\nAlex's fingers flew across the interface with practiced precision. Three gestures closed the restricted files, another two activated her scrubbing program, erasing any trace of her digital footprints. The black hardware key came out of the terminal, disappearing into her pocket just as the door chimed again, more insistently this time.\n\n\"Just a moment,\" she called, voice steady despite her racing heart.\n\nWith a final gesture, she brought up a decoy program—lines of entirely legitimate code for a project she was officially assigned to. The perfect cover.\n\nShe triggered the door. It slid open to reveal not security, but Director Chen himself. His tall frame filled the doorway, expression unreadable behind stylishly antiquated glasses.\n\n\"Working late, Alexandria?\" he asked, stepping into her apartment without waiting for an invitation.\n\n\"Just finishing some debugging on the interface project,\" she replied, gesturing to the decoy program still hovering in the air.\n\nChen studied the code for a moment, then turned his gaze directly to her. \"Interesting approach. Not what I would have done.\" He moved closer, eyes narrowing slightly. \"But then, we all have our methods, don't we?\"\n\nDid he know? Had she missed something in her hasty cover-up?\n\n\"I've been reviewing personnel files,\" Chen continued. \"Your performance metrics are... exceptional.\"\n\nAlex could either [[play it cool]], continuing the pretense, or [[confess partially]], testing Chen's reaction with a censored version of her discoveries.",
            "order": 4
        }
    ]
}


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
        {sections.map((section) => (
            <Box py="2" px="3" my="1">
                <Text size="2">{section.title}</Text>
            </Box>
        ))}
        </>
    )
}

//URL: /stories/{story_id}/read/{section_id}
export default function ReaderView({story=data}) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(true)


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
                    <StoryMetaData story={data}/>
                    <Separator my="3" size="4" />

                    <SectionList sections={data.sections} />
                </Box>
            </Flex>

            {/* READER: */}
            
            <ScrollArea type="always" scrollbars="vertical" style={{height: '100vh'}} >
                <Box mx="5">
                    {story.sections && (
                        story.sections.map((section) => (
                            <Box>
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

ReaderView.getLayout = function getLayout(page) {
    return (
        <>
            <NavBar />
            <Flex>
                <ReaderView />
            </Flex>
        </>
    )
}
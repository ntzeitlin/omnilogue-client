import { useAuthToken } from "@/auth/queries";
import { NavBar } from "@/components/navbar"
import { getCategories } from "@/data/categories";
import { Button, Card, Flex, Select, Text, TextArea, TextField } from "@radix-ui/themes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewStory() {
    const {token} = useAuthToken()
    const queryClient = useQueryClient()
    const router = useRouter()

    
    const {data: categories, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await getCategories(token)
        },
        enabled: !!token
    })
    
    
    const [sectionCount, setSectionCount] = useState(0)
    const [sectionArray, setSectionArray] = useState([])
    
    const [story, setStory] = useState({
        title: "",
        subtitle: "",
        description: "",
        excerpt: "",
        is_public: false,
        category: "",
        content: []
    })
    
    const sectionComponent = (index) => {
        return <TextArea
        key={`section-${index}`}
        placeholder="Story Content"
        value={story.content[index]}
        style={{minHeight: '200px'}}
        onChange={(event) => {
            const copy = {...story}
            copy.content[index] = {"title": "test title", "content": event.target.value}
            setStory(copy)
        }}
        />
    }
   
    const storySubmissionMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:8000/stories", {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(story)
            })
            if (!response.ok) {
                throw new Error('Failed to create story')
            }
            const data = await response.json()
            return data
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['stories_overview']})
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        storySubmissionMutation.mutate()
        router.push('/office')
    }

    const handleAddSection = () => {
        const newSection = sectionComponent(sectionCount - 1)
        setSectionArray(prev => [...prev, newSection])
    }

    useEffect(() => {
        if (sectionCount > 0){
            handleAddSection()
        }
    }, [sectionCount])




   

    return (
    <Card size="2" m="2" style={{maxWidth: '500px', margin: '0 auto'}}>
    <Flex direction="column" gap="4" style={{margin: '0, auto', maxWidth: '500px'}}>
        <Text size="5" weight="bold">Create a Story</Text>
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
                <Flex direction="column" gap="1">
                        <Text as="label" htmlFor="category" size="2" weight="medium">Category</Text>
                        <Select.Root
                            value={story.category}
                            onValueChange={(event) => {
                                const copyStory = {...story}
                                copyStory.category = event
                                setStory(copyStory)
                            }}
                            required
                        >
                            <Select.Trigger placeholder="Select Category" />
                            <Select.Content>
                                {categories?.map((category) => {
                                    return (
                                        <Select.Item key={category.id} value={category.name}>{category.name}</Select.Item>
                                    )
                                })}
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                <Flex direction="column" gap="1">
                    <Text as="label" htmlFor="storytitle" size="2" weight="medium">Story Information:</Text>
                    <TextField.Root
                        placeholder="Story Title"
                        id="storytitle"
                        type="text"
                        value={story.title}
                        onChange={(event) => {
                            const copyStory = {...story}
                            copyStory.title = event.target.value
                            setStory(copyStory)
                        }}
                        required
                    />
                </Flex>
                
                <TextField.Root
                    placeholder="Story subtitle"
                    type="text"
                    value={story.subtitle}
                    onChange={(event) => {
                        const copyStory = {...story}
                        copyStory.subtitle = event.target.value
                        setStory(copyStory)
                    }}
                />
                <TextArea
                    placeholder="Description"
                    value={story.description}
                    onChange={(event) => {
                        const copyStory = {...story}
                        copyStory.description = event.target.value
                        setStory(copyStory)
                    }}
                    required
                />
                <TextArea
                    placeholder="Story Excerpt"
                    value={story.excerpt}
                    onChange={(event) => {
                        const copyStory = {...story}
                        copyStory.excerpt = event.target.value
                        setStory(copyStory)
                    }}
                />


                {/* version 1 story handling:
                    - TextArea for Sections / Chapters

                    Version 2:
                    - Button to add new Section -> generates new TextArea

                    Version 3: 
                    - Upload Zip file of markdown files.
                */}

                <Flex direction="column" gap="2">
                    <Text as="label" htmlFor="storycontent" size="2" weight="medium">Story Content:</Text>
                    <Text size="1" weight="medium" color="gray">Section Links must match Section Titles exactly. Section Links are written using square brackets.</Text>
                    <Text size="1" weight="medium" color="gray">Example: # SectionTitle  [[SectionTitle]]</Text>

                       
                {sectionArray.map((section) => {return (
                section
                )})}
                <Button onClick={(e)=>{
                    e.preventDefault()
                    setSectionCount(prev => prev + 1)
                }}>Add Section</Button>
                </Flex>
                <Button type="submit">Submit Story</Button>
            </Flex>
        </form>
    </Flex>
    </Card>
)
}

NewStory.getLayout = function getLayout(page)
{
    return (
        <>
            <NavBar />
            {page}
        </>
    )
}
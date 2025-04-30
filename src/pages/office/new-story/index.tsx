import { useAuthToken } from "@/auth/queries";
import { NavBar } from "@/components/navbar"
import { getCategories } from "@/data/categories";
import { Button, Card, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function NewStory() {
    const {token} = useAuthToken()

    const [story, setStory] = useState({
        title: "",
        subtitle: "",
        description: "",
        excerpt: "",
        is_public: false,
        category: null
    })

    const {data: categories, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await getCategories(token)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <Card size="2" m="2" style={{maxWidth: '500px', margin: '0 auto'}}>
    <Flex direction="column" gap="4" style={{margin: '0, auto', maxWidth: '400px'}}>
        <Text size="5" weight="bold">Create a Story</Text>
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
                <Flex direction="column" gap="1">
                    <Text as="label" htmlFor="storytitle" size="2" weight="medium">Title</Text>
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
                />

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
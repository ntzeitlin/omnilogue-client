import { NavBar } from "@/components/navbar"
import { Button, Flex, Text } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function NewStory() {
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
            
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <Flex direction="column" gap="4" style={{margin: '0, auto', maxWidth: '400px'}}>
        <Text size="5" weight="bold">Create a Story</Text>
        <form onSubmit={handleSubmit}>

        </form>
    </Flex>
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
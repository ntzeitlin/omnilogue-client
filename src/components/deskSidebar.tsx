import { Button, Card, Flex, Heading, Separator } from "@radix-ui/themes"
import { useRouter } from "next/router"


export const DeskSideBar = () => {
    const router = useRouter()

    return (
            <Card>
        <Flex direction="column" gap="3" px="5" style={{height: '100vh', width: "250px", borderRight: '0.25 solid white'}}>
            <Heading align="center" mt="3">
                Office Desk
            </Heading>
            <Separator size="4" mb="2" />
            <Button onClick={() => {router.push(`/office/stories/new`)}}>Write new Story</Button>
        </Flex>
            </Card>
    )
}
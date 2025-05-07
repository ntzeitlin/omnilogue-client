import { useAuthToken } from "@/auth/queries"
import { NavBar } from "@/components/navbar"
import { getStoryDetail } from "@/data/stories"
import { Button } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export default function StoryDetailView() {
    const router = useRouter()
    const {storyId} = router.query

    const {token} = useAuthToken()

    const {data: storyDetail, isLoading} = useQuery({
        queryKey: ['story_detail', storyId],
        queryFn: async () => {
            return await getStoryDetail(token, storyId)
        }
    })

    return <>STORY DETAIL for story: {storyId}
    <Button onClick={()=>{router.push(`${storyId}/read/1`)}}>READ ME</Button></>
}

StoryDetailView.getLayout = function getLayout(page) {
    return (
        <>
            <NavBar />
            {page}
        </>
    )
}
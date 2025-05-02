import { useAuthToken } from "@/auth/queries"
import { NavBar } from "@/components/navbar"
import { StoryReader } from "@/components/reader"
import { getStoryDetail } from "@/data/stories"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export default function ReaderView() {
    const router = useRouter()
    const {storyId} = router.query

    const {token} = useAuthToken()

    const {data: storyDetail, isLoading} = useQuery({
        queryKey: ['story_detail', storyId],
        queryFn: async () => {
            return await getStoryDetail(token, storyId)
        },
        enabled: !!storyId
    })

    return <StoryReader story={storyDetail} />
}

ReaderView.getLayout = function getLayout(page) {
    return (
        <>
            <NavBar />
            {/* Sidebar currently inside the ReaderView component */}
            <ReaderView />
        </>
    )
}
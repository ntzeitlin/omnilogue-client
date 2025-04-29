import { NavBar } from "@/components/navbar"
import { useRouter } from "next/router"

export default function StoryDetailView() {
    const router = useRouter()
    const {storyId} = router.query
    return <>STORY DETAIL for story: {storyId}</>
}

StoryDetailView.getLayout = function getLayout(page) {
    return (
        <>
            <NavBar />
            {page}
        </>
    )
}
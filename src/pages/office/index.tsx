import { NavBar } from "@/components/navbar"
import { Button } from "@radix-ui/themes"
import { useRouter } from "next/router"


export default function Office() {
    const router = useRouter()
    return (
        <>THIS IS OFFICE
        <Button
        onClick={()=>{
            router.push('office/stories/new')
        }}>CREATE A NEW STORY</Button>
        </>
    )
}

Office.getLayout = function getLayout(page)
{   return (
    <>
        <NavBar />
        {page}
    </>
)
}
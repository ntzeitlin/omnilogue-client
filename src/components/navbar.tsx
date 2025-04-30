import { useLogout } from "@/auth/queries"
import { TabNav } from "@radix-ui/themes"
import Link from "next/link"
import { useRouter } from "next/router"

export const NavBar = () => {
    const router = useRouter()
    const {mutate: logout} = useLogout()

    return (
        <>
            <TabNav.Root justify="center" mb="3">
                <TabNav.Link asChild active={router.pathname === "/"}>
                    <Link href="/">Home</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={router.pathname === "/library"}>
                    <Link href="/library">Library</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={router.pathname === "/office"}>
                    <Link href="/office">Office</Link>
                </TabNav.Link>
                {/* <TabNav.Link asChild active={router.pathname === "/profile"}>
                    <Link href="/">Profile</Link>
                </TabNav.Link> */}
                <TabNav.Link asChild active={router.pathname === ""}>
                    <Link href="/" onClick={()=> {logout()}}>Logout</Link>
                </TabNav.Link>
            </TabNav.Root>
        </>
    )


}
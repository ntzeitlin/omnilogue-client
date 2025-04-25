import { useAuthStatus } from "@/auth/queries"
import { useRouter } from "next/router"


export const PageWrapper = ({children}) => {
    const router = useRouter()
    const {isAuthenticated, isLoading} = useAuthStatus()
    const authRoutes = ['/login', '/register']
  
    if (isLoading) {
        return <>Checking Authentication...</>
    }  

    if (!isAuthenticated && !authRoutes.includes(router.pathname)) {
      router.push('/login')
    }

  return (
    <>
      {children}
    </>
  )
}
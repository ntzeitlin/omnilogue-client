import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export const QueryWrapper = ({children}) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })) 

    return (
    <QueryClientProvider client={queryClient}>
        {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider> 
    )
}
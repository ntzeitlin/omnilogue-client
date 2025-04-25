import { useLogout } from "@/auth/queries";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {data: token} = useQuery({
    queryKey: ["token"]
  })

  const {mutate: logout} = useLogout()
  return (
    <>
     <Flex direction="column" gap="2">
      <Text>Hello World!</Text>
      <Text>{token}</Text>
      <Button>Let's Go!</Button>
      <Button onClick={()=>{logout()}}>Log Out</Button>
     </Flex>
    </>
  );
}

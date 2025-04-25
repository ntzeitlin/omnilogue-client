import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import type { AppProps } from "next/app";
import { PageWrapper } from '@/context/wrapper';
import { QueryWrapper } from '@/context/context';



export default function App({ Component, pageProps }: AppProps) {

  return (
  <Theme appearance='dark'>
    <QueryWrapper>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </QueryWrapper>
  </Theme>
)
}

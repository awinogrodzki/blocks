import * as React from "react";
import { GetServerSideProps } from "next";
import { Block } from "@blocks/domain";
import { getAllBlocks } from "../api";
import { Blocks } from "../components/Blocks";

interface HomePageProps {
  blocks: Block[];
}

export default function HomePage({ blocks = [] }: HomePageProps) {
  return (
    <main style={{ margin: "0 auto", width: "960px", maxWidth: "100%" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }
            
            html {
              font-family: 
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI', 
                'Roboto',
                'Oxygen', 
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                sans-serif;
            }
            
            body {
              margin: 0;
              padding: 1rem 2rem;
            }
          `,
        }}
      />
      <h1>Blocks</h1>
      <Blocks blocks={blocks} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const blocks = await getAllBlocks();

  return {
    props: {
      blocks,
    },
  };
};

import React, { useState } from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from "next-auth/react";
import 'src/Theme/globals.css'

export default function MyApp(props) {
  const [session, setSession] = useState(props.pageProps.session);
  const router = useRouter();
  const { Component, pageProps } = props;

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
            />
        </Head>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} updateSession={setSession} />
          </Auth>
        ) : 
          <Component {...pageProps} updateSession={setSession} />
        }
      </SessionProvider>
    </>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
/*
TODO
- Review signIn method in NextAuth
// https://github.com/cosimochellini/aws-share-files/blob/4134d3735d8a6c5e4434a6b7c8622bfa1bc2fbd6/src/hooks/auth.hook.ts
*/

import { useState, useEffect } from 'react';
import { InboxInIcon } from '@heroicons/react/solid'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'
import { useRouter } from 'next/router';
import { getCsrfToken } from 'next-auth/react';

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}

function AuthLogin({ csrfToken }) {
  
  const [errorMsg, setErrorMsg] = useState(null)
  const [success, setSuccess] = useState(null)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const query = router.query;

  useEffect(() => {
    console.log(`QUERY: ${query}`)
  }, [query])

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      console.log("SIGNING THE USER IN");
      console.log(`Email: `, email)
      console.log(`NEXT AUTH URL: ${process.env.NEXTAUTH_URL}`)
      const { error, ok, url, status } = await signIn("email", {
        email: email,
        redirect: false,
      });
      if (error) {
        console.log(`ERROR: ${error}`)
        setErrorMsg(error);
      }
      console.log(`OK: `, ok);
      console.log(`URL: `, url);
      console.log(`STATUS: `, status);
      setSuccess(true);
    } catch (err) {
      console.log('Unable to sign-in: ', err)
      setErrorMsg(err);
    }
  }  
  
  return (
    <WrapperElement>
      <div className='wrapper'>
        <h2>Enter your email below</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              id='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='elon@spacex.com'
            />
          </div>
          <button type='submit'>Sign in</button>
          {errorMsg ? (
            <div className='error'>
              Access Denied
              Error:{errorMsg}
            </div>
          ) : null}
        </form>
      {success ? (
        <div className='portal-wrapper'>
          <div className='portal-container-outer'>
            <div className='portal-container-inner'>
              <InboxInIcon className='portal-icon'/>
              <div className='portal-header'>Confirm your email</div>
              <div className='portal-description'>
                <p>We emailed a magic link to {email}.</p>
                <p>Click the link to login.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      </div>
    </WrapperElement>
  )
}

const WrapperElement = styled.div`
  .wrapper {
    background-color: rgb(31 41 55);
    color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100vh;
  }

  .success {
    margin: 10px 0px;
    padding: 10px;
    color: #FFF;
    width: 40%;
  }

  p {
    padding-top: 4px;
  }

  form {
    width: 50%;
  }

  input {
    padding: 4px 8px;
    margin: 6px 0px;
    border-radius: 0.375rem;
    width: 80%;
    color: black;

    @media (min-width: 768px) {
      width: 300px;
    }
  }

  button {
    background-color: #27AE60;
    border-radius: 0.375rem;
    color: #FFFFFF;
    font-size: 19.2px;
    font-weight: 600;
    margin-top: 8px;
    padding-bottom: 12px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 12px;
    width: 80%;
    
    :hover {
      cursor: pointer;
      filter: brightness(1.25);
    }
  
    @media (min-width: 768px) {
      font-size: 24px;
      width: 300px;
    }
  }


  .portal-wrapper {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 10;
    background-color: rgb(31, 41, 55, .8);
  }

  .portal-container-outer {
    min-height: 100vh;
    margin-top: -20px;
    padding-left: 6px;
    padding-right: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .portal-container-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 24rem;
  }

  .portal-icon {
    width: 40px;
    height: 40px;
  }

  .portal-header {
    margin-top: 8px;
    font-size: 24px;
    font-weight: 700;
  }

  .portal-description {
    margin-top: 16px;
    font-size: 20px;
  }
`

export default AuthLogin

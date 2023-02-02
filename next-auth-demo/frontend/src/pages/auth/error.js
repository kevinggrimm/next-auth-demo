import { useRouter } from "next/router"

export default function AuthError() {
  
  const router = useRouter()
  const queryParams = router.query
  console.log(`QUERY PARAMS: ${queryParams}`)
  
  return (
    <p>{`Error during create: ${queryParams}`}</p>
  )

}
import React , {useEffect} from 'react'
import Loader from "react-loader-spinner";
import { getToken } from '../apollo/path'
import { useRouter } from 'next/router'

const Home = () => {
  const route = useRouter()

  useEffect(async function() {
    const token = await getToken();
    if (!token) {
      route.push('/start')
    } else {
      route.push('/dashboard')
    }
  },[]);

  return (
    <div className="home">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={10000}
      />
    </div>
  )
}

export default Home;

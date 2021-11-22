import { gql, GraphQLClient } from "graphql-request"
import { getVideos } from "../services"

export const getStaticProps = async () => {
  const videos = (await getVideos()) || []

  return {
    props: { videos },
  }
}

const Home = ({ videos }) => {
  console.log(videos)
  return <div>Hello</div>
}

export default Home

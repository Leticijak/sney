/* eslint-disable @next/next/no-img-element */
import { getVideos } from "../services"
import Image from "next/image"

export const getStaticProps = async () => {
  const videos = (await getVideos()) || []

  return {
    props: { videos },
  }
}

const Home = ({ videos }) => {
  const randomVid = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }
  return (
    <>
      <div className='app'>
        <div className='main-video'>
          <img
            src={randomVid(videos).thumbnail.url}
            alt={randomVid(videos).title}
          />
        </div>
      </div>
      <div className='video-feed'></div>
    </>
  )
}

export default Home

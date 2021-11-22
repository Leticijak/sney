/* eslint-disable @next/next/no-img-element */
import { getVideos, getAcc } from "../services"
import Image from "next/image"
import Section from "../components/Section"
import Header from "../components/Header"
import Card from "../components/Card"

export const getStaticProps = async () => {
  const videos = (await getVideos()) || []
  const acc = (await getAcc()) || []

  return {
    props: { videos, acc },
  }
}

const Home = ({ videos, acc }) => {
  console.log(acc)
  // const randomVid = (videos) => {
  //   return videos[Math.floor(Math.random() * videos.length)]
  // }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }
  const unseenVids = (videos) => {
    return videos.filter((vid) => vid.seen == false || vid.seen == null)
  }
  return (
    <>
      <Header acc={acc} />
      <div className='app'>
        <div className='main-video'>
          <img src={videos[3].thumbnail.url} alt={videos[3].title} />
        </div>
      </div>
      <div className='video-feed'>
        <Section genre={"Recommended for you"} videos={unseenVids(videos)} />
        <Section
          genre={"documentary"}
          videos={filterVideos(videos, "documentary")}
        />
        <Section genre={"classic"} videos={filterVideos(videos, "classic")} />
        <Section genre={"drama"} videos={filterVideos(videos, "drama")} />
      </div>
    </>
  )
}

export default Home

/* eslint-disable @next/next/no-img-element */
import { getVideos, getAcc } from "../services"
import Image from "next/image"
import Section from "../components/Section"
import Header from "../components/Header"
import Card from "../components/Card"
import Link from "next/link"
import Img1 from "../public/fb512.webp"
import Img2 from "../public/logo193.webp"
import Img3 from "../public/graph512.webp"
import Img4 from "../public/matui.webp"

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
        <div className='video-feed'>
          <Link passHref href='#sney'>
            <div className='franchise' id='sney'>
              <Image src={Img1} width={256} height={256} alt='rand' />
            </div>
          </Link>
          <Link passHref href='#drama'>
            <div className='franchise' id='drama'>
              <Image src={Img2} width={256} height={256} alt='rand' />
            </div>
          </Link>
          <Link passHref href='#documentary'>
            <div className='franchise' id='documentary'>
              <Image src={Img3} width={256} height={256} alt='rand' />
            </div>
          </Link>
          <Link passHref href='#classic'>
            <div className='franchise' id='classic'>
              <Image src={Img4} width={256} height={256} alt='rand' />
            </div>
          </Link>
        </div>
        <Section genre={"Recommended for you"} videos={unseenVids(videos)} />
        <Section
          id='documentary'
          genre={"documentary"}
          videos={filterVideos(videos, "documentary")}
        />
        <Section
          id='classic'
          genre={"classic"}
          videos={filterVideos(videos, "classic")}
        />
        <Section
          id='darma'
          genre={"drama"}
          videos={filterVideos(videos, "drama")}
        />
      </div>
    </>
  )
}

export default Home

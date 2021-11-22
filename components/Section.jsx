import Card from "./Card"
import Link from "next/link"

const Section = ({ genre, videos }) => {
  return (
    <>
      <div className='section'>
        <h3 className='category'>{genre}</h3>
        <div>
          {videos.map((vid) => (
            <a className='vid-links' key={vid.id} href={`/video/${vid.slug}`}>
              <Card thumbnail={vid.thumbnail} />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Section

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { gql, GraphQLClient } from "graphql-request"
import { useState } from "react"

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPHCMS_TOKEN,
    },
  })
  const pageSlug = pageContext.query.slug
  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        tags
        seen
        slug
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `
  const variables = {
    pageSlug,
  }
  const data = await graphQLClient.request(query, variables)
  const video = data.video

  return {
    props: { video },
  }
}

const changeToSeen = async (slug) => {
  await fetch("/api/changeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  })
}

export default function Video({ video }) {
  const [watchin, setWatchin] = useState(false)
  return (
    <>
      {!watchin && (
        <img
          className='video-image'
          src={video.thumbnail.url}
          alt={video.title}
        />
      )}
      {!watchin && (
        <div className='info'>
          <p className='info-links'> {video.tags.join(", ")} </p>
          <p className='info-desc'> {video.description} </p>
          <a className='info-back' href='/'>
            <p>Go Back</p>
          </a>
          <button
            className='video-overlay'
            onClick={() => (
              changeToSeen(video.slug),
              watchin ? setWatchin(false) : setWatchin(true)
            )}
          >
            PLAY
          </button>
        </div>
      )}
      {watchin && (
        <div className='cont-vid'>
          <video width='60%' height='60%' controls muted autoPlay>
            <source src={video.mp4.url} type='video/mp4' />
          </video>
        </div>
      )}
      <div
        className={"info-footer"}
        onClick={() => (watchin ? setWatchin(false) : null)}
      ></div>
    </>
  )
}

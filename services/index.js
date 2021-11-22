import { gql, GraphQLClient } from "graphql-request"

const url = process.env.ENDPOINT
const graphQLClient = new GraphQLClient(url, {
  headers: {
    Authorization: process.env.GRAPHCMS_TOKEN,
  },
})

export const getVideos = async () => {
  const query = gql`
    query MyQuery {
      videos {
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

  const data = await graphQLClient.request(query)
  const videos = data.videos
  return videos
}

export const getVideo = async () => {
  const query = gql`
    query ($slug: String!) {
      video(where: { slug: $slug }) {
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

  const data = await graphQLClient.request(query, { slug })
  const video = data.video
  return video
}

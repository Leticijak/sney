/* eslint-disable import/no-anonymous-default-export */
import { GraphQLClient } from "graphql-request"

export default async ({ body }, res) => {
  const graphcms = new GraphQLClient(process.env.ENDPOINT, {
    headers: {
      Authorization: process.env.GRAPHCMS_TOKEN,
    },
  })

  await graphcms.request(
    `
        mutation($slug: String!) {
            updateVideo(where:{slug:$slug},
            data: {seen:true}){
              id
              seen
              title
            }
          }
        `,
    { slug: body.slug }
  )
  await graphcms.request(
    `
  mutation publishVide($slug: String){
      publishVideo(where: {slug:$slug},to: PUBLISHED){
          slug
      }
  }`,
    {
      slug: body.slug,
    }
  )

  res.status(201).jsong({ slug: body.slug })
}

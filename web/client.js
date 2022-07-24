import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: '4us2f7vp',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-01-31',
})

export default client

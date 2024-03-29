import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import * as prismicH from '@prismicio/helpers'

import style from './styles.module.scss'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={style.container}>
        <div className={style.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType('publication', {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  const posts = response.map((post) => ({
    slug: post.uid,
    title: prismicH.asText(post.data.title),
    excerpt:
      post.data.content.find((content: any) => content.type === 'paragraph')
        ?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }))

  return {
    props: {
      posts,
    },
  }
}

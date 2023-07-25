import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

export const getStaticProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1K79VII5eyll1s9bA8NzcOXY')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      }
    ).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({product}: HomeProps) {
  return (
      <h1>HEllo world</h1>
  )
}

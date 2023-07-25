/* eslint-disable @next/next/no-img-element */
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { ActiveLink } from '../ActiveLink'
import Link from 'next/link'

export function Header() {
  const { asPath } = useRouter()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />
        <nav>
          <Link className={styles.active} href="/">
            Home
          </Link>
          <Link className={styles.active} href="/posts">
            Posts
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

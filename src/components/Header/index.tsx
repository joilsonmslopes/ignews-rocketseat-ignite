import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  const { asPath } = useRouter()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <>Home</>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <>Posts</>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

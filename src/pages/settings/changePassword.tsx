import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const changePassword: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <h1 className={styles.title}>
            Change password
        </h1>
      </main>
    </div>
  )
}
export default changePassword
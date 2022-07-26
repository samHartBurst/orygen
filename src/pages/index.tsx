import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
//import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = ({}) => {
  //const { user, isLoading, error } = useUser();
  return (
    // <div>
    // 	{user ? (
    // 		<a href="/api/auth/logout"> Logout</a>
    // 	) : (
    // 		<a href="/api/auth/login"> Login</a>
    // 	)}
    // </div>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Admin App</h1>
      </main>
    </div>
  );
};
export default Home;

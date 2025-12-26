import Image from 'next/image';
// import { Button } from '@repo/ui/button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>This is main emiplanner.com</main>
      <footer className={styles.footer}>(c) 2025 Emiplanner.com</footer>
    </div>
  );
}

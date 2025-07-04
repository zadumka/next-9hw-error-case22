import { getMe } from '@/lib/api/serverApi';
import css from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function Profile() {
  const data = await getMe();

  return (
    <>
      {data && (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <div className={css.header}>
              <h1 className={css.formTitle}>Profile Page</h1>
              <Link href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
              </Link>
            </div>
            <div className={css.avatarWrapper}>
              <Image
                src={data.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            </div>
            <div className={css.profileInfo}>
              <p>Username: {data.username}</p>
              <p>Email: {data.email}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

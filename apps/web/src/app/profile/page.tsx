'use client';

import { getProfileProcess } from '@/api/profile';
import EditProfile from '@/components/profileSection/EditProfile';
import Transactions from '@/components/profileSection/Transactions';
import Points from '@/components/profileSection/Points';
import SidebarProfile from '@/components/profileSection/SidebarProfile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Profile } from '@/interface/interface';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    saldo: 0,
    points: 0,
    discount: 0,
    referralCode: '',
  });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [transactions, setTransactions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          router.push('/login');
        }
        if (user) {
          const { profileId } = JSON.parse(user);
          const response = await getProfileProcess(profileId);

          setProfile(response.data);
          setUser(response.data.user);
          setTransactions(response.data.transactions);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <section className="p-12 max-w-screen-xl mx-auto items-center">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <SidebarProfile />
        <div className="col-span-2 bg-primary shadow-md w-full">
          <EditProfile profile={user} setProfile={setUser} />
          <hr className="col-span-3 my-4" />
          <Points
            id={profile.id}
            saldo={profile.saldo}
            points={profile.points}
            discounts={profile.discount}
            referralCode={profile.referralCode}
          />
          <hr className="col-span-3 my-4" />
          <Transactions transactions={transactions} />
        </div>
      </div>
    </section>
  );
}

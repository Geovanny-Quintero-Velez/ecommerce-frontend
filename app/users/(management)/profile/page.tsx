import React from 'react';
import Sidebar from '@/components/users/management/Sidebar';
import UserProfile from '@/components/users/management/profile/UserProfile';

// Datos de ejemplo
const user = {
  userid: "1",
  email: "julieta.cohen@example.com",
  name: "Julieta",
  lastname: "Cohen",
  birthdate: new Date("1990-01-01"),
  role: "Administrador",
  username: "julieta_cohen",
};

const ProfilePage = () => {
  return (
      <UserProfile user={user} />
  );
};

export default ProfilePage;
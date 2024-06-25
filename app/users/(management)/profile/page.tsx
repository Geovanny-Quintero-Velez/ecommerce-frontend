import React from 'react';
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
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <UserProfile user={user} />
        </div>
    );
};

export default ProfilePage;

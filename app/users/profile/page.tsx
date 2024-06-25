import React from 'react';
import { User } from '@/interfaces/user/user'; // Asegúrate de que la ruta a tu archivo de interfaz sea correcta

const user: User = {
    userid: "1",
    email: "user@example.com",
    name: "John",
    lastname: "Doe",
    birthdate: new Date(1990, 1, 1),
    password: "password123",
    role: "User",
    username: "johndoe",
    createdat: new Date(),
};

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img
                        className="h-32 w-32 rounded-full object-cover mb-4"
                        src={`https://avatars.dicebear.com/api/initials/${user.name}-${user.lastname}.svg`}
                        alt="User avatar"
                    />
                    <h2 className="text-2xl font-semibold text-gray-900">{user.name} {user.lastname}</h2>
                    <p className="text-gray-600">@{user.username}</p>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
                    <ul className="mt-2 text-gray-700">
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Fecha de nacimiento:</strong> {user.birthdate.toDateString()}</li>
                        <li><strong>Rol:</strong> {user.role}</li>
                        <li><strong>Creado el:</strong> {user.createdat?.toDateString()}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

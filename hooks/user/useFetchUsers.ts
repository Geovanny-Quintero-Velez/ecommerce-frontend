import { useState } from 'react';
import { User } from '@/interfaces/user/user';
import { UserService } from '@/services/user/user.service';

export const useFetchUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const userService = new UserService();
    
    const fetchUserById = async (userId: string): Promise<User | null> => {
        setLoading(true);
        setError(null);
        try {
            const user = await userService.getUserById(userId);
            return user as User;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchUserById, loading, error };
}

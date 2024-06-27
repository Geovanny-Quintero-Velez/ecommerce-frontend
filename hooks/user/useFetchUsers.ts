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

    const fetchAllUsers = async (): Promise<User[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const users = await userService.getAllUsers();
            return users as User[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const createUser = async (user: User): Promise<User | null> => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await userService.createUser(user);
            return newUser as User;
        } catch (err: any) {
            setError(err.message || 'Failed to create user');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (user: User): Promise<User | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await userService.updateUser(user);
            return updatedUser as User;
        } catch (err: any) {
            setError(err.message || 'Failed to update user');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (userId: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await userService.deleteUser(userId);
        } catch (err: any) {
            setError(err.message || 'Failed to delete user');
        } finally {
            setLoading(false);
        }
    }

    return { deleteUser, createUser, updateUser, fetchAllUsers, fetchUserById, loading, error };
}

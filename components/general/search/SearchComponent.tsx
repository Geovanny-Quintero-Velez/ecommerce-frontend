import { useRouter } from "next/navigation";
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";

interface Props {
    placeholder: string,
    redirect: string,
    show: boolean
}

function SearchComponent({ placeholder, redirect, show }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`${redirect}?search_query=${searchQuery}`);
    };

    if (!show) return null;

    return (
        <>
            <form className="md:flex hidden items-center" onSubmit={handleSearch}>
                <div className="relative ml-5 w-100%">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full backgroundBackground px-5 py-2 pl-10 focus:outline-none placeholderPrimary"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 left-0 pl-3 flex items-center textPrimary"
                    >
                    <CiSearch/>
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchComponent;
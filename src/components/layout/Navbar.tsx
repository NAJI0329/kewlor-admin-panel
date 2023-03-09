import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import { RootState } from '../../store';

function Navbar() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);

    const { logout } = useAuth()

    const onSignOut = async () => {
        await logout()
    }


    return (
        <div className='n-container py-2'>

            <div className="flex justify-end items-center">
                {!isAuthenticated ? (
                    <>
                        <Link to={"/auth/signin"}>
                            <button className="text-black font-normal text-lg border-l border-black pl-4">
                                Login
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <div>
                            <p className='font-medium'>
                                {user?.email}
                            </p>
                            <p className="text-sm text-end cursor-pointer" onClick={onSignOut}>
                                Log out
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
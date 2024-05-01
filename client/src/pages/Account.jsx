import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Places from './Places';
import { CiUser } from 'react-icons/ci';
import { TbListSearch } from 'react-icons/tb';
import { PiBuildingsFill } from 'react-icons/pi';

function Account() {
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profile'
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...'
    }    

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    
    
    function linkClasses (type=null){
        let classes = 'px-4 py-2 rounded-full';
        if( type === subpage ) {
            classes += ' text-white bg-primary ';
            
        }
        else {
            classes += ' bg-gray-200'
        }
        return classes;
    }

    if (redirect){
        return <Navigate to={'/'} /> 
    }


    return (
    <div>
        <nav className='w-full flex mt-8 gap-4 justify-center mb-8'>
            <Link className={`inline-flex justify-center items-center gap-1  ${linkClasses('profile')}`} to={'/account'}>
                <CiUser />
                My Profile
            </Link>
            <Link className={`inline-flex justify-center items-center gap-1 ${linkClasses('bookings')}`} to={'/account/bookings'}>
                <TbListSearch/>
                My Bookings
            </Link>
            <Link className={`inline-flex justify-center items-center gap-1  ${linkClasses('places')}`} to={'/account/places'}>
                <PiBuildingsFill/>
                My Accomodations
            </Link>
        </nav>

        {
            subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} {user.email}
                    <button onClick={logout} className='btn max-w-sm mt-6'>Logout</button>
                </div>
            )
        }

        {
            subpage === 'places' && (
                <Places />
            )
        }
    </div>
   )
}

export default Account;
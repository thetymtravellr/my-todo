import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import MyTask from '../Components/MyTask';
import auth from '../firebase.init';

const Home = () => {
    const [user] = useAuthState(auth)
    
    return (
        <div>
            <div className='bg-primary min-h-[30vh] grid place-content-center'>
            <h1 className='text-5xl text-center text-base-100'>Welcome {user?.displayName?.split(' ')[0]}</h1>
            </div>
            <MyTask></MyTask>
        </div>
    );
};

export default Home;
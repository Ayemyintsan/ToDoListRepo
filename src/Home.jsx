import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './component/Strike.css';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();
    const createHandler = (e) => {
        e.preventDefault();
        navigate("/AddTask")
    }

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const [categories, setCategories] = useState([]);
    const apiUrl = 'http://localhost:8080/categories'
    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setCategories(response.data)
                console.log(response.data)
            })
    }, [])

    const [tasks, setTasks] = useState([])
    const apiUrl2 = 'http://localhost:8080/tasks'
    useEffect(() => {
        axios
            .get(apiUrl2)
            .then((response) => {
                setTasks(response.data)
                console.log(response.data)
            })
            .catch((error) =>
                console.error.apply(error));

    }, [])

    return (
        <>
            <div className='w-full'>
                <div className='p-11'>
                    <div className='float-left'>
                        <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <div className='float-right flex gap-6'>
                        <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    </div>
                </div>
                <div className='float-left p-10'>
                    <div className='mb-7'>
                        <h1 className='font-bold text-xl'>Hill there, Villy</h1>
                        <p>Organize your plans for the day</p>


                    </div>

                    <div className='mb-7 '>
                        <div className='flex mb-8'>
                            <h2 className='font-bold text-xl float-left'>Categories</h2>
                            <div className='float-left'>
                                <Link to='/addCategory'>
                                    <svg class="h-6 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                </Link>
                            </div>
                        </div>


                        <div className='mb-7 flex'>
                            <div className='flex gap-5 overflow-auto'>
                                {
                                    categories.map((category) =>
                                        <div className='pl-3' key={category.id}>
                                            <div className='bg-gray-300 items-center rounded-xl'><img src={category.imageUrl} alt='category' className='text-center m-auto  w-14 h-14' /></div>
                                            <p className='text-center font-medium'>{category.name}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-xl font-bold'>Today's Tasks</h2>

                            <div className='flex flex-col gap-2 task-container h-[450px]'>
                                <div className='flex flex-wrap p-5 w-64 rounded-lg gap-6  '>
                                    {
                                        tasks.map((task) =>
                                            <div className='bg-slate-300 flex flex-wrap p-5 w-96 rounded-lg'>
                                                <input type='checkbox' onChange={handleCheckboxClick} />
                                                <div className=' pl-5 w-96 '>
                                                    <label className={isChecked ? 'font-medium completed' : 'font-medium'}>{
                                                        task.label
                                                    }</label>
                                                    <div className='flex justify-end '>
                                                        <svg className="h-8 w-6 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                        <svg className="h-8 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>

                                                    </div>
                                                    <p className=''>{task.startTime}-{task.endTime}</p>

                                                </div>


                                            </div>
                                        )
                                    }


                                </div>
                            </div>

                        </div>
                    </div>
                    <button className='bg-blue-700 p-4 text-white w-80 rounded-lg' onClick={createHandler}>Add new Tasks</button>
                </div>
            </div>








        </>
    );
}

export default Home;

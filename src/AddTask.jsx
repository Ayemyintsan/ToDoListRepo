import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTask = () => {
    const repeatOptions = ['EVERYDAY', 'EVERYWEEK', 'EVERYMONTH ']
    const [categoryOption, setCategoryOption] = useState([]);
    const [inputTask, setInputTask] = useState({
        label: '',
        startTime: '',
        endTime: '',
        repeatType: '',
        category: {
            id: ''
        }
    });

    const navigate = useNavigate();

    const TaskHandler = (e) => {
        e.preventDefault();
        if (!inputTask.label ||
            !inputTask.startTime ||
            !inputTask.endTime ||
            !inputTask.repeatType ||
            !inputTask.category) {
            alert('Please fill all the fields');
        }
        const apiUrl = "http://localhost:8080/tasks"
        axios
            .post(apiUrl, {
                label: inputTask.label,
                startTime: inputTask.startTime,
                endTime: inputTask.endTime,
                repeatType: inputTask.repeatType,
                category: {
                    id: inputTask.category.id,
                }
            })
            .then((value) => {
                window.location.reload();
                console.log(value);

            });
        axios.get(apiUrl)
        .then((response) => console.log(response.data));
        navigate('/')
    };
    const categoryapiUrl = "http://localhost:8080/categories"
    useEffect(() => {
        axios
        .get(categoryapiUrl).then((response)=>{
            setCategoryOption(response.data)
        })
        .catch((error)=> console.error.apply(error));
    },[])


const taskInputHandler = (e) => {
    const taskLabel = e.target.value; //currentvalue
    setInputTask({
        ...inputTask,
        label: taskLabel
    });
}
const startTimeHandler = (e) => {
    const startTime = e.target.value;
    setInputTask({
        ...inputTask,
        startTime: startTime
    });
}
const endTimeHandler = (e) => {
    const endTime = e.target.value;
    setInputTask({
        ...inputTask,
        endTime: endTime
    });
}
const taskRepeatHandler = (e) => {
    const repeatType = e.target.value;
    setInputTask({
        ...inputTask,
        repeatType: repeatType
    });
}
const taskCategoryHandler = (e) => {
    const taskCategory = e.target.value;
    setInputTask({
        ...inputTask,
        category: {
            id: taskCategory
        }
    });
}

return (
    <>
        <div className='ml-96'>
            <Link to="/">
                <div className=''>
                    <svg className="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="8" y1="12" x2="16" y2="12" />  <line x1="8" y1="12" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="12" y2="8" />
                    </svg>
                </div>
            </Link>


            <h1 className='pl-7 font-bold '>Add Task</h1>
            <div className=' m-5 ' >
                <h2 className='mb-5'>Label</h2>
                <div className=''>
                    <input type="text" placeholder='Create Instagram Post' className='w-96 h-11 shadow-2xl pl-5 rounded-lg bg-slate-200'
                        name='label'
                        id='label'
                        onChange={taskInputHandler}
                    />
                </div>
            </div>

            <div className="flex gap-7 text-left p-7">

                <div>
                    <h2 className=''>Start</h2>
                    <input type="time" className="inline-flex w-44  justify-between  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="startTime" aria-expanded="true" aria-haspopup="true"
                        name='startTime'
                        onChange={startTimeHandler}

                    />


                </div>
                <div>
                    <h2 className=''>End</h2>
                    <input type="time" className="inline-flex w-44 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="endTime" aria-expanded="true" aria-haspopup="true"
                        name='endtime'
                        onChange={endTimeHandler}
                    />


                </div>

            </div>

            <div className='p-7'>
                <h2 className=''>Repeat</h2>
                <select
                    className='bg-gray-100 w-96 h-12 rounded-lg mb-7 p-2'
                    name='repeatOptions'
                    id='repeatOptions'
                    onChange={taskRepeatHandler}

                // {/* <option value="Everyday">Everyday</option>
                // <option value="EveryWeek">EveryWeek</option>
                // <option value="EveryMonth">EveryMonth</option> */
                >
                    {repeatOptions.map((option, index) => {
                        return (
                            <option key={index} value={option} onChange={taskRepeatHandler}>{option}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className='p-7'>
                <h2 className=''>Category</h2>
                <select
                    className='bg-gray-100 w-96 h-12 rounded-lg mb-7 p-2'
                    name='category'
                    id='category'
                    onChange={taskCategoryHandler}

                // {/* <option value="Everyday">Everyday</option>
                // <option value="EveryWeek">EveryWeek</option>
                // <option value="EveryMonth">EveryMonth</option> */
                >
                    {
                        categoryOption.map((option, index) => {
                            return (
                                (<option
                                    key={index}
                                    value={option.id}
                                >
                                    {option.name}
                                </option>
                                )
                            )
                        })
                    }

                </select>
            </div>
            <div className='flex pl-7'>
                <button className='bg-blue-700 p-4 text-white w-96 rounded-lg' onClick={TaskHandler}>Create Tasks</button>
            </div>
        </div>

    </>
);
}

export default AddTask;

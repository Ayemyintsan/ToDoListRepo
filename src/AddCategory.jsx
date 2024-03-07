import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AddCategory = () => {
    const [inputData, setInputdata] = useState({
        name: '',
        image: ''
    })
const navigate = useNavigate()

    const categoryInputHandler = (e) => {
        const categoryName = e.target.value;
        setInputdata({ ...inputData, name: categoryName });
    }
    const imageUrlInputHandler = (e) => {
        const imageUrl = e.target.value;
        setInputdata({ ...inputData, image: imageUrl });
    }

    const addHandler = (e) => {
        e.preventDefault(); //fixed 
        console.log(inputData);
        if (!inputData.name || !inputData.image) {
            alert('Please fill out all required fields')
        }
        const apiUrl = "http://localhost:8080/categories"
        axios
            .post(apiUrl, { name: inputData.name, imageUrl: inputData.image })
            .then((value) => console.log(value))
            navigate('/')
    }//reach backend 


    return (
        <>
            <form className='m-auto w-80 mt-12' onSubmit={addHandler}>
                <div>
                    <label className='text-lg font-medium'>Name</label>
                    <div className='mt-2'>
                        <input className='bg-gray-100 w-80 h-12 rounded-lg mb-2 p-2'
                            name='name'
                            id='name'
                            type='text'
                            placeholder='Enter your name' required
                            onChange={categoryInputHandler} />
                    </div>
                </div>
                <div>
                    <label className='text-lg font-medium'>ImageUrl</label>
                    <div className='mt-2'>
                        <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2'
                            name='imageUrl' type='text'
                            id='imageUrl'
                            placeholder='Enter your imageUrl' required
                            onChange={imageUrlInputHandler} />
                    </div>
                </div>
                <button className='bg-violet-500 w-80 h-11 rounded-md' type='submit'>Create Category</button>
            </form>
        </>
    );
}


export default AddCategory;



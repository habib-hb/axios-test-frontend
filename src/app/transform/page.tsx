'use client'

import { useState } from "react";
import axios from 'axios';

export default function get() {

   
    interface data {
        status: string;
        message: string;
        timestamp: string;
        name: string;
        statusCode: number;    
    }


    interface error {
        status: string;
        message: string;
        statusCode: number;    
    }


    const [data, setData] = useState<data | null>(null);

    const [error , setError] = useState<error | null>(null);

    const [name , setName] = useState<string>('');


    // useEffect(() => {

        const postData = async () => {

                    if(name === ''){
                        alert('Please enter name');
                        return;
                    }

                    try {

                        const response = await axios.post('http://localhost/axios-test-backend/post' ,
                        {
                            name: name  
                        }, 
                        {
                            headers: {
                                'Authorization': 'Bearer token',
                            },
                            timeout: 5000
                        });

                        const obj = {
                            ...response.data,
                            statusCode: response.status
                        }

                        setData(obj);
                        setError(null);


                    }catch (error: unknown) {

                        if (axios.isAxiosError(error)) {
                            const errorResponse = error.response;

                            const obj = {
                                ...errorResponse?.data,
                                statusCode: errorResponse?.status
                            }

                            setError(obj);
                            setData(null);
                    
                            console.error(errorResponse);
                        } else {
                            // Handle unexpected error type
                            console.error("Unexpected error:", error);
                        }

                        console.error(error);
                    }

                };

        // }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Axios Get Data Test</h1>

                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 mb-4" placeholder="Enter any name" />
              
                <div className="flex justify-center mb-4">
                    <button 
                        onClick={postData} 
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        POST Data
                    </button>
             </div>

                {data && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Response Data:</h2>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Status Code: {data.statusCode}</h2>
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}

                {error && (
                    <div className="mt-6 bg-red-200 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Response Data:</h2>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Status Code: {error.statusCode}</h2>
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    )

}
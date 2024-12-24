'use client'

import { useState } from "react";
import axios from 'axios';

export default function get() {

    const [data, setData] = useState(null);

    // useEffect(() => {

        const getData = async () => {

                    try {

                        const response = await axios.get('http://localhost/axios-test-backend/get/' , {
                            params : {
                                name: 'Habibur Rahman',
                            },
                            headers: {
                                'Authorization': 'Bearer token',
                            },
                            timeout: 5000
                        });

                        setData(response.data);


                    }catch (error) {
                        console.error(error);
                    }

                };

        // }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Axios Get Data Test</h1>
                
                <div className="flex justify-center mb-4">
                    <button 
                        onClick={getData} 
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        GET Data
                    </button>
             </div>

                {data && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Response Data:</h2>
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    )

}
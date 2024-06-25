import React from 'react';

const Toast = ({ message, type }) => {
    const toastTypeClass = type === 'success' 
        ? 'text-green-500 bg-green-100 dark:text-green-400 dark:bg-green-800'
        : 'text-red-500 bg-red-100 dark:text-red-400 dark:bg-red-800';

    return (
        <div className='flex justify-center'>
            <div className={`flex justify-center w-full max-w-xs p-4 ${toastTypeClass} rounded-lg shadow dark:bg-gray-800`} role="alert">
            <div className="ms-3 text-sm font-normal">{message}</div>
           </div>
        </div>
        
    );
};

export default Toast;

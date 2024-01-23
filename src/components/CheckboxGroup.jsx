import React from 'react';

const CheckboxGroup = ({ label, options, registerKey, errorsKey, register }) => {
    return (
        <div>
            <p className='text-center font-bold text-xl'>{label}</p>
            <div className="checkbox-group flex gap-5 justify-center items-center text-sm">
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            className='rounded-full'
                            type="radio"
                            value={option}
                            {...register(`${registerKey}`, { required: true })}
                        />
                        <label className='px-1'>{option}</label>
                        {errorsKey && (
                            <div className="text-red-500">* Not tagged</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;

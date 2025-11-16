import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';

const WorksCard = ({title,text}) => {
    return (
        <div className='bg-white p-10 hover:bg-primary rounded-xl'>
            <span><CiDeliveryTruck size={33}/></span>

            <h3 className='font-bold text-xl'>{title}</h3>
            <p>{text}</p>
            
        </div>
    );
};

export default WorksCard;
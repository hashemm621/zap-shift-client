import React from 'react';
import WorksCard from '../WorksCard/WorksCard';

const Works = () => {
    
    return (
        <div className=' bg-sky-100 p-10 rounded-2xl'>
            <h2 className='font-bold text-3xl mb-5'>How it  Works</h2>


            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                            <WorksCard title='Booking Pick & Drop' text='From personal packages to business shipments — we deliver on time, every time.'/>
                            <WorksCard title='Cash On Delivery' text='From personal packages to business shipments — we deliver on time, every time.'/>
                            <WorksCard title='Delivery Hub' text='From personal packages to business shipments — we deliver on time, every time.'/>
                            <WorksCard title='Booking SME & Corporate' text='From personal packages to business shipments — we deliver on time, every time.'/>

            </div>
        
        </div>
    );
};

export default Works;
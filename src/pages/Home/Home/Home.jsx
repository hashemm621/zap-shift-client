import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works/Works';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';


const reviewsPromise = fetch('/reviews.json').then(res =>res.json())


const Home = () => {
    return (
        <div>
            <Banner/>
            <Works/>
            <Brands/>
            <Reviews reviewsPromise={reviewsPromise}/>
        </div>
    );
};

export default Home;
import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <img
        className="home--pic"
        src="https://images.unsplash.com/photo-1560233026-ad254fa8da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=910&q=80"
      />
      <div className="home-description">
        <h1>Fitness starts with what you eat.</h1>
        <p>
          Take control of your goals. Track calories, break down ingredients,
          and log activities with MyFitnessPal.
        </p>

        <h1>The Tools for Your Goals</h1>
        <p>
          Trying to lose weight, tone up, lower your BMI, or invest in your
          overall health? We give you the right features to hit your goals.
        </p>

        <img src="https://www.myfitnesspal.com/react-static/3ab1cfd69caefffa56dacb7d05438515.svg" />
        <p>
          Learn. Track. Improve. Keeping a food diary helps you understand your
          habits and increases your likelihood of hitting your goals.
        </p>
        <img src="https://www.myfitnesspal.com/react-static/64475ddfb7a3d11b993fd34925507624.svg" />
        <p>
          Logging Simplified Scan barcodes, save meals and recipes, and use
          Quick Tools for fast and easy food tracking.
        </p>
        <img src="https://www.myfitnesspal.com/react-static/2a43224f252f9a15a3f412a3b50bb6b2.svg" />
        <p>
          Stay Motivated Join the World’s Largest Fitness Community for advice,
          tips, and support 24/7.
        </p>
        <h1>Recipes & Inspiration</h1>
        <p>
          {' '}
          Get nutritionist-approved recipes and motivational workout tips from
          MyFitnessPal experts
        </p>
        <img src="https://www.myfitnesspal.com/react-static/b3754d3c0fff1f109ab484002e29f3a3.png" />
        <img src="https://www.myfitnesspal.com/react-static/768ff781fc3c8abdd33789d3bd301e76.png" />
        <img src="https://www.myfitnesspal.com/react-static/fda07e55f2952750bad581ed72cfad0a.png" />
      </div>
    </div>
  )
}

export default Home

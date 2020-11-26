import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <img
        className="home--pic"
        style={{ height: '1400px', width: '100%' }}
        src="https://images.unsplash.com/photo-1560233026-ad254fa8da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=910&q=80"
      />
      <div className="home-description">
        <div className="header-desc1">
          <div>
            <h1>Fitness starts with what you eat.</h1>
            <p>
              Take control of your goals. Track calories, break down
              ingredients, and log activities with MyFitnessPal. Take control of
              your goals. Track calories, break down ingredients, and log
              activities with MyFitnessPal.Take control of your goals. Track
              calories, break down ingredients, and log activities with
              MyFitnessPal.
            </p>
          </div>
          <div>
            <h1>The Tools for Your Goals</h1>
            <p>
              Trying to lose weight, tone up, lower your BMI, or invest in your
              overall health? We give you the right features to hit your goals.
              Trying to lose weight, tone up, lower your BMI, or invest in your
              overall health? We give you the right features to hit your goals.
            </p>
          </div>
        </div>
        <div className="header-image">
          <div className="h-image">
            <img src="https://www.myfitnesspal.com/react-static/3ab1cfd69caefffa56dacb7d05438515.svg" />
            <p>
              Learn. Track. Improve. Keeping a food diary helps you understand
              your habits and increases your likelihood of hitting your goals.
            </p>
          </div>
          <div className="h-image">
            <img src="https://www.myfitnesspal.com/react-static/64475ddfb7a3d11b993fd34925507624.svg" />
            <p>
              Logging Simplified Scan barcodes, save meals and recipes, and use
              Quick Tools for fast and easy food tracking.
            </p>
          </div>
          <div className="h-image">
            <img src="https://www.myfitnesspal.com/react-static/2a43224f252f9a15a3f412a3b50bb6b2.svg" />
            <p>
              Stay Motivated Join the World’s Largest Fitness Community for
              advice, tips, and support 24/7.
            </p>
          </div>
        </div>

        <div className="header-reciepe">
          <h1>Recipes & Inspiration</h1>
          <p>
            Get nutritionist-approved recipes and motivational workout tips from
            MyFitnessPal experts
          </p>
          <div className="reciepe-img">
            <img src="https://www.myfitnesspal.com/react-static/b3754d3c0fff1f109ab484002e29f3a3.png" />
            <img src="https://www.myfitnesspal.com/react-static/768ff781fc3c8abdd33789d3bd301e76.png" />
            <img src="https://www.myfitnesspal.com/react-static/fda07e55f2952750bad581ed72cfad0a.png" />
          </div>
        </div>
      </div>
      <footer className="h-footer">
        <h2>My FitnessPal est.2020</h2>
        <div className="h-f1">
          <span>calorieCounter</span>
          <span>Blog</span>
          <span>Terms</span>
          <span>Privacy</span>
          <span>ContactUs</span>
          <span>API</span>
          <span>Feedback</span>
          <span>Community</span>
          <span>Guidelines</span>
        </div>
        <div className="h-f1">
          <span>Cookie Preference</span>
          <span>AdChoices</span>
          <span>Do Not Sell My Personal Information</span>
        </div>
        <div className="h-f1">
          <span>© MyFitnessPal Inc 2020</span>
        </div>
      </footer>
    </div>
  )
}

export default Home

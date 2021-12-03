## Burger Build Udemy Project
Live on [S3](http://burger-builder-test.s3-website-us-east-1.amazonaws.com/) and [Firebase](https://udemy-react-dae8e.web.app/)

Now live on [AWS Elastic Beanstalk](http://burgerbuilder-env.eba-rnsht67i.us-east-1.elasticbeanstalk.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
This project originated from the Udemy React & React Hooks Course. It serves as a bit of a sandbox for working on React. I ended up picking it up for a Docker and Kubernetes: The Complete Guide Udemy course.

So this went from being a humble React app hosted on S3 to now having its own deployment pipeline and being dockerized.

I will try to fill out this readme and make this project a better place to grab example code from at some point.

## Local Run Set up

- Install npm
- Run `npm install` in project directory

## Running the Project

- `npm run start` to run development server
- `sh docker_entry.sh` to tag and build a new docker container
- `docker-compose up --build` to build and run a new docker container and run tests

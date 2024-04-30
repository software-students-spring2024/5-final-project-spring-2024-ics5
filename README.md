<div align="center">
   <img src="https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/blob/main/images/metguessr.PNG" alt="metguessr">
   <br>
   <h3>Met Artwork Guessing Game</h3>
   <p><a href="http://64.225.55.188/" target="_blank">Play Game</a></p>
   <br>
   <b>Created by: </b><em><a target="_blank" href="https://github.com/zhaojustin">Justin Zhao</a>, <a target="_blank" href="https://github.com/exl7954">Eric Lin</a>, <a target="_blank" href="https://github.com/ayd2134">Alice Ding</a></em>
</div>

***

![pylinter](https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/actions/workflows/pylinter.yml/badge.svg)
![pytester](https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/actions/workflows/pytester.yml/badge.svg)
![docker](https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/actions/workflows/docker-push.yml/badge.svg)
![redeploy](https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/actions/workflows/redeploy.yml/badge.svg)

This is **Metguessr**, an online game where the user is given five random artifacts from The Met, and needs to guess when they were made. Users can record their scores by logging in / signing up, view their profile stats, as well as see the global leaderboard.

## Instructions to run locally


### Option 1: Docker Compose
1. Clone the repository
2. In the root directory, run `docker-compose pull` to ensure the latest images
3. In the root directory, run `docker-compose up -d` to start the system
4. Run `docker-compose ps` to verify all containers started successfully

After starting the system, navigate to [http://localhost](http://localhost) in your browser to view the webapp locally

### Option 2: Local Setup
1. Clone the repository
2. Ensure that MongoDB is running locally
3. In the `backend` directory, create a `.env` file and add `MONGO_HOST="localhost"`
4. In the `backend` directory, run `pip install -r requirements.txt`
5. In the `backend` directory, run `python app.py`
6. In the `frontend` directory, run `npm install`
7. In the `frontend` directory, run `npm start`

After starting the system, navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the webapp locally


## Docker Images

<div>
   <div><a target="_blank" href="https://hub.docker.com/layers/exl7954/metguessr/backend-latest/images/sha256-d04c7e96e9fc0e718356221cb232d762196256141d1edf4c19e8a4c338b97e3b?context=repo"><img src="https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/blob/main/images/docker-mark-blue.png" width="15px"> exl7954/metguessr:backend-latest</a></div>
   <br>
   <div><a target="_blank" href="https://hub.docker.com/layers/exl7954/metguessr/frontend-latest/images/sha256-a7cb81d6ae773104541e76e3e884b866c9bba3e896f65e25000fbc0caf9d23f3?context=repo"><img src="https://github.com/software-students-spring2024/5-final-project-spring-2024-ics5/blob/main/images/docker-mark-blue.png" width="15px"> exl7954/metguessr:frontend-latest</a></div>
</div>

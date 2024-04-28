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

This is **Metguessr**, an online game where the user is given five random artifacts from The Met, and needs to guess when they were made. Users can record their scores by logging in / signing up, view their profile stats, as well as see the global leaderboard.

## Instructions to run locally

1. Clone the repository
2. In the root directory, run `docker-compose pull` to ensure the latest images
3. In the root directory, run `docker-compose up -d` to start the system
4. Run `docker-compose ps` to verify all containers started successfully

After starting the system, navigate to [http://localhost](http://localhost) in your browser to view the webapp locally


## Docker Images

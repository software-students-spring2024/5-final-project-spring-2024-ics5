# in Docker, it is common to base a new image on a previously-created image
FROM node:latest
# Set the working directory in the image
WORKDIR /frontend
# install dependencies into the image - doing this first will speed up subsequent builds, as Docker will cache this step
COPY package*.json ./
RUN npm install
# the ADD command is how you add files from your local machine into a Docker image
# Copy the current directory contents into the container at /frontend
ADD . .
# expose the port that the Flask app is running on... by default 5000
EXPOSE 3000

# Run app.py when the container launches
CMD ["npm", "start"]
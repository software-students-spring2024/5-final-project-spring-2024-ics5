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
# Build the app
RUN npm run build
# Install serve
RUN npm install -g serve
# Run serve
CMD ["serve", "-s", "build", "-l", "3000"]
# expose the port that the app is running on
EXPOSE 3000
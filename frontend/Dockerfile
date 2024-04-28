# BUILD STAGE
FROM node:latest as build-stage
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

# PRODUCTION STAGE
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /frontend/build /usr/share/nginx/html
COPY app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
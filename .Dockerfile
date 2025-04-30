# Use an ultra-lightweight web server
FROM nginx:alpine

# Copy your HTML into the default Nginx directory
COPY index.html /usr/share/nginx/html/index.html

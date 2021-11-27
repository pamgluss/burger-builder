docker build -f Dockerfile.dev -t burgerbuilder .

# docker run -p 3000:3000 -v /app/node_modules/ -v $(pwd):/app burgerbuilder:latest
docker run -it -p 3000:3000 -v /usr/app/node_modules/ -v $(pwd):/usr/app/ burgerbuilder

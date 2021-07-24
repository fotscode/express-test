if [ $NODE_ENV = "production" ]; then
node ./bin/www;
else
nodemon ./bin/www;
fi

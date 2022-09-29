
echo $NODE_ENV

if [[ $NODE_ENV -eq "production" ]]
then
  node /app/server.js
else
  cd /app
  npm run dev
fi

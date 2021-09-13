 #!/bin/bash
 # Start the server.
 trap "kill 0" EXIT
 
 cd ./server/
 npm run start &
 
 cd ../
 
 # Start the web server
 cd ./country-search-app/
 npm run start &
 
wait

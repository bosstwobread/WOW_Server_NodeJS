docker cp /ftp-file/wow.zip wow-web-node:var/wow-web;
docker exec -i wow-web-node bash -c "
cd var/wow-web;
unzip -o wow;
pm2 restart www"
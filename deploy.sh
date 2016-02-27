#!/bin/bash

DEPLOY_TAR="deploy_package.tar.gz";
SERVER_ADDR="kassikas.com";
SERVER_USER="server-user"
SERVER_PATH="/server/path/for/meter/add";


echo " *** create meteor bundle *** "

meteor bundle $DEPLOY_TAR

if [ ! -f "$DEPLOY_TAR" ]
then
    echo "File $DEPLOY_TAR does not exists!";
    exit 1
fi

echo " *** move to remote server *** "

scp $DEPLOY_TAR $SERVER_USER@$SERVER_ADDR:$SERVER_PATH/$DEPLOY_TAR


echo " *** use in remote server *** "

REMOTE_TMP_DIR="$SERVER_PATH/tmp"

ssh $SERVER_USER@$SERVER_ADDR "mkdir -p $REMOTE_TMP_DIR ; \
cd $REMOTE_TMP_DIR ; \
pwd ; \
tar xzf $SERVER_PATH/$DEPLOY_TAR ; \
cd $REMOTE_TMP_DIR/bundle/programs/server ; \
npm install --production ; \
npm prune --production ; \
mv $SERVER_PATH/bundle $SERVER_PATH/bundle.old ; \
mv $REMOTE_TMP_DIR/bundle $SERVER_PATH/bundle ; \
echo \"restart passenger and app, and then wait 10s \" ; \
passenger-config restart-app $SERVER_PATH/bundle ; \
sleep 10s ; \
rm -rf $SERVER_PATH/bundle.old ; \
"

echo " *** remote actions done *** "

echo "try> http://$SERVER_ADDR/ "
echo " ... and see if update was success!"

sleep 1s




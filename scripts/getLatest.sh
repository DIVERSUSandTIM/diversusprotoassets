#!/bin/sh
#
# Purpose:
#   Copy the contents of the latest FramerX autosave file to the git repo.
# Notes:
#   This script still puts things deep into the public/framer-x/Martins/container
#   directory rather than into the root of the repo as would be preferred.
# Author:
#   Shawn Murphy 
#   http://github.com/smurp
#   2018-12-28

# this is the GUID in FramerX project package.json file
FRAMER_GUID="d8154bac-199e-4eb6-87bd-065a9510e422"

# this is where Framers autosave files get stored
AUTOSAVE="/Users/martinadmin/Library/Autosave Information"

# this is the container from the autosave
SRCCONTAINER=$AUTOSAVE/`ls -ct "$AUTOSAVE" | head -1`/container

# this is the package.json in the autosave
SRCPKG="${SRCCONTAINER}/package.json"


#ls "$SRCCONTAINER"
DESTCONTAINER="/Users/martinadmin/Desktop/Prototype Framer/Nooron Collab/public/framer-x/Martins/container"
#DESTCONTAINER="/tmp/container/"

# this is how many times the FRAMER_GUID appears in the package.json file, ie 0 means it does not
HAS_GUID=`grep $FRAMER_GUID "$SRCPKG" | wc -l`


if [  $HAS_GUID -eq 0 ] ; then
  echo "the last autosave file was not the right project"
  exit
fi

echo "About to copy the autosave contents into the git repo"
echo $SRCCONTAINER

cd "${SRCCONTAINER}"

rsync -r -v --exclude '.cache*' --exclude '.backups*' --exclude 'node_modules*' . ${DESTCONTAINER}
#echo  "$SRCCONTAINER"

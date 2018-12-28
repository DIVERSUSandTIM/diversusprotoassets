#!/bin/sh
AUTOSAVE="/Users/martinadmin/Library/Autosave Information/"
LATEST=$AUTOSAVE`ls -ct "$AUTOSAVE" | head -1`
echo $LATEST
ls "$LATEST"/container


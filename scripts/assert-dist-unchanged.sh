DIFF=$(git status ./dist --porcelain | sed s/^...//)
if [ -z "$DIFF" ]
then
    exit 0
else
    echo "GIT DIFF IS NOT EMPTY" &&
    exit 1
fi

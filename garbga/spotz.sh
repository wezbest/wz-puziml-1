#!/usr/bin/bash
# This bash srcript is for installing the KL docker image here
clear

# Colors
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[0;33m'
export BLUE='\033[0;34m'
export PURPLE='\033[0;35m'
export CYAN='\033[0;36m'
export WHITE='\033[0;37m'
export NC='\033[0m' # No Color

# Commands

hea1() {
    echo -e "${CYAN}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${CYAN}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~${NC}"
}


c1() {
    hea1 "Spotify Downlad"
    # Get name of Project
    # echo -e "Enter Url "
    # read name_of_project
    # if [ -z "$name_of_project" ]; then
    #     echo -e "${RED}BASTARD ! Project name cannot be empty${NC}"
    #     exit 1
    # fi

    TAR1="https://open.spotify.com/episode/4OBfP9mRYWuWHgfMkX2sWJ"
    CO1="votify $TAR1"
    echo -e "${GREEN}Running Command: $CO1${NC}"
    eval "$CO1"

}

# Execution
c1

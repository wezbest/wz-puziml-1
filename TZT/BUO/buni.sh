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

bun_start() {
    # Bun init start 
    hea1 "Buni: Starting the installation and install"

    # Get Name of project
    echo -e "Enter the name of the project: "
    read name_of_project
    if [ -z "$name_of_project" ]; then
        echo -e "${RED}BASTARD ! Project name cannot be empty${NC}"
        exit 1
    fi

    # Commands and variables
    CO1="mkdir -v $name_of_project && cd $name_of_project && bun init -y"
    CO2="bun add chalk axios dotenv ora cli boxen progress openai inquirer"
    CO3="bun add @types/bun @types/progress -D"
    CO4="bun pm ls"

    # RUN Above Commands
    echo -e "--- Initiate ${CO1} ---"
    eval "$CO1"
    echo -e "--- Adding PKGS ${CO2} ---"
    eval "$CO2" && eval "$CO3" && eval "$CO4"
    echo -e "${GREEN}***** Installation Completed *****${NC}"
}

bun_basic() {
    # Bun init start 
    hea1 "Bun Basic Install"

    # Get Name of project
    echo -e "Enter the name of the project: "
    read name_of_project
    if [ -z "$name_of_project" ]; then
        echo -e "${RED}BASTARD ! Project name cannot be empty${NC}"
        exit 1
    fi

    # Commands and variables
    CO1="mkdir -v $name_of_project && cd $name_of_project && bun init -y"
    CO2="bun pm ls"

    # RUN Above Commands
    echo -e "--- Initiate ${CO1} ---"
    eval "$CO1"
    echo -e "--- Init Bun Basic ---"
    eval "$CO2" 
    echo -e "${GREEN}***** Installation Completed *****${NC}"
}



# Execute Command 
bun_start
#!/usr/bin/bash
# This bash srcript is for making cast accounts
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

cast_wallet_mnemonic() {
    hea1 "Create Wallets Using cast and menmonic"
    # Get name of Project
    echo -e "Enter Number Of Wallets to create with cast starting with 12"
    read number_of_wallets

    # Validate numeric input and minimum value
    if ! [[ "$number_of_wallets" =~ ^[0-9]+$ ]]; then
        echo -e "${RED}FUKR: NUMBER ONL${NC}"
        exit 1
    fi

    if [ -z "$number_of_wallets" ]; then
        echo -e "${RED}BASTARD ! Can be empty{NC}"
        exit 1
    fi

    # Commands to execute
    output_file="wallets_${number_of_wallets}.txt"
    CO1="cast w nm -a ${number_of_wallets}"

    # Execute command and save output
    if ! eval "$CO1" >"$output_file"; then
        echo -e "${RED}Error: Failed to create wallets${NC}"
        exit 1
    else
        echo -e "${GREEN}Successfully created $number_of_wallets wallets"
        echo -e "Output saved to: $output_file${NC}"
    fi

}

# Execution
cast_wallet_mnemonic

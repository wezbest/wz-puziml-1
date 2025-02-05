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

ca_wa_ba() {
    hea1 "Balance Checker"

    WA1="0xA158b0C3B87e4bCd4870Dc3c9A8199cfa1E8Fc8f"
    WA2="0x1eFfd0829A1891Fd87056521e12D7A1bA6152D73"
    SEP_RPC="https://rpc.ankr.com/eth_sepolia"
    HOL_RPC="https://rpc.ankr.com/eth_holesky"

    CO1S="cast b -e ${WA1} -r ${SEP_RPC}"
    CO1H="cast b -e ${WA1} -r ${HOL_RPC}"
    CO2S="cast b -e ${WA2} -r ${SEP_RPC}"
    CO2H="cast b -e ${WA2} -r ${HOL_RPC}"

    w1_output_sepolia=$(eval "$CO1S")
    if [ $? -ne 0 ]; then
        echo -e "${RED}${WA1}Sepolia balance check failed${NC}"
        exit 1
    fi

    w1_output_holesky=$(eval "$CO1H")
    if [ $? -ne 0 ]; then
        echo -e "${RED}${WA1} - olesky balance check failed${NC}"
        exit 1
    fi

    w2_output_sepolia=$(eval "$CO2S")
    if [ $? -ne 0 ]; then
        echo -e "${RED}${WA2}Sepolia balance check failed${NC}"
        exit 1
    fi

    w2_output_holesky=$(eval "$CO2H")
    if [ $? -ne 0 ]; then
        echo -e "${RED}${WA2}Holesky balance check failed${NC}"
        exit 1
    fi

    echo -e "${GREEN}${WA1}Sepolia Balance: $w1_output_sepolia${NC}"
    echo -e "${GREEN}${WA1}Holesky Balance: $w1_output_holesky${NC}"
    echo -e "-------------------------------------------------------"
    echo -e "${GREEN}${WA2}Sepolia Balance: $w2_output_sepolia${NC}"
    echo -e "${GREEN}${WA2}Holesky Balance: $w2_output_holesky${NC}"

    echo -e "${GREEN}Balance Check Completed${NC}"
}

# Execution
ca_wa_ba

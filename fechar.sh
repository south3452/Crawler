#!/bin/bash
clear

while true
do
    teste=$(ps -e | grep node)
    
    if [[ $? == 1 ]]; then 
        virgula=$(tail -n1 final.json | grep ,)
        if [[$? == 0]]; then
            $(sed '$d' final.json >> final.json)
            $(tail -n1 final.json | sed "s/,//" >> final.json)
            
            
        elif [[ $? == 1 ]]; then 
            echo -e "\t}\n}" >> final.json
        fi 
        break
    elif [[ $? == 0 ]]; then
        echo "não está em exec" 
    fi
    echo "não foi"
done
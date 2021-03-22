#!/bin/bash
 
#Escrever no arquivo caso ele esteja vazio#
function comeco(){
    #1.colocar a chave no arquivo
    echo "{" > final.json

    #2. colocar o dia com os ":{"
    var=$(cat retorno.txt | grep Day: | cut -d" " -f1)

    var2=$(echo '":{') &> /dev/null
    echo -e "\t$var$var2" >> final.json

    #3. colocar a hora + porcentagem
    #3.1 Pegar a HORA
    hora=$(cat retorno.txt | grep Day: | cut -d" " -f2 | cut -d'"' -f1)
    #3.2 Pegar a porcentagem
    var3=$(cat retorno.txt | sed "s/percentage/$hora/" | grep "$hora.:")

    #Verificar se tem que fechar o arquivo
    final=$(cat retorno.txt | grep final | cut -d']' -f2 )
    
    if [[ $final == 'final' ]]; then
        echo -e "\t$var3" >> final.json  
        echo -e "\t}" >> final.json  
        echo -e '}' >> final.json
    else
        echo -e "\t$var3," >> final.json
    fi

    
}

function meio(){

#pegar a data do retorno.txt
data=$(cat retorno.txt | grep Day: | cut -d" " -f1 | sed 's/"//')

teste=$(cat final.json | grep $data)
#se não achar uma data no arquivo retorna 1 se achar retorna 0

if [[ $? == 0 ]]; then

    ultima=$(tail -n1 final.json)
    # vai verificar se a ultima linha é a }
    
    #se a ultima linha for a } faça 
    if [[ $ultima == "}" ]]; then
        
        # esse bloco vai tirar a } e vai colocar uma virgula no final da ultima porcentagem 
        $(cat final.json | sed '$d' | sed '$d' > qq.json)
        ttail=$(tail -n1 qq.json)
        $(cat qq.json | sed "s/$ttail/$ttail,/"  > final.json)
        $(rm -rf qq.json)
        # esse bloco vai tirar a } e vai colocar uma virgula no final da ultima porcentagem 

        # pegar a hora
        hora2=$(cat retorno.txt | grep Day: | cut -d" " -f2 | cut -d'"' -f1)

        # mandar a hora e a porcentagem pro final.json
        echo -e "\t$(cat retorno.txt | sed "s/percentage/$hora2/" | grep "$hora2.:")," >> final.json
    else
        # se a ultima linha não for a } colocar a hora e a porcentagem no final.json
        hora2=$(cat retorno.txt | grep Day: | cut -d" " -f2 | cut -d'"' -f1)
        echo -e "\t$(cat retorno.txt | sed "s/percentage/$hora2/" | grep "$hora2.:")," >> final.json
    fi 

elif [[ $? == 1 ]]; then 
    
    ultima=$(tail -n1 final.json)
    # vai verificar se a ultima linha é a }
    
    #se a ultima linha for a } faça
    if [[ $ultima == "}" ]]; then
        
        # esse bloco vai tirar a } e colocar a ultima chave com uma "," no final 
        $(cat final.json | sed '$d' > qq.json)
        ttail=$(tail -n1 qq.json)
        $(cat qq.json | sed "s/$ttail/$ttail,/"  > final.json)
        $(rm -rf qq.json)
        # esse bloco vai tirar a } e colocar a ultima chave com uma "," no final 

        
        var=$(cat retorno.txt | grep Day: | cut -d" " -f1)

        var2=$(echo '":{') &> /dev/null
        echo -e "\t$var$var2" >> final.json
        hora2=$(cat retorno.txt | grep Day: | cut -d" " -f2 | cut -d'"' -f1)
        # mandar a hora e a porcentagem pro final.json
        echo -e "\t$(cat retorno.txt | sed "s/percentage/$hora2/" | grep "$hora2.:")," >> final.json
    fi
fi
}

qntdlinhajson=$(wc -l final.json | cut -d" " -f1)

#verificar se o arquivo está vazio 
if [[ $qntdlinhajson == 0 ]]; then 
    comeco
else
    meio
fi

echo "DONE"









#ultima=$(tail -n1 final.json)
#if [[ $ultima == "}" ]]; then
#   cat final.json | sed 's/}$//' > qq.json
#fi
    

#tirar a ultima chave 
#$(cat teste.txt | sed 's/}$//')

#essa linha é quando acabar o arquivo 
#echo -e "\t}\n}" >> final.json



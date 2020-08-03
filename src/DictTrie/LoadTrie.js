const trieFile = require('./Trie.js');


export default function main(){

    //const url = "./wordLists/test_wordlist.txt";
    const url = "./wordLists/enable_wordlist.txt";

    return new Promise( (resolve, reject) => {

        //Load Trie
        var dictTrie = new trieFile.Trie();
        
        //Load File
        var rawFile = new XMLHttpRequest();

        rawFile.open("GET", url, false);
        

        rawFile.onreadystatechange = () => {

            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {

                    var allText = rawFile.responseText;
                    allText = allText.split("\r\n");


                    for (var i = 0; i < allText.length; i++){
                        dictTrie.insert(allText[i])
                    }

                    resolve(dictTrie);
                }
            }

            reject("error bruh")
        };      
        
        

        rawFile.send(null);

    });

}

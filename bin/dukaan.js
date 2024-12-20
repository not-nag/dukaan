#!/usr/bin/env node

const { setKeyValue, getKeyValue, deleteKey, showAllKeys, getAndCopyKeyValue } = require('../lib/store');
const [command, key, value, ...extraArgs] = process.argv.slice(2);

switch (command){
    case 'sikhao':
        console.log("")
        console.log('Sahi use karne ka tareeka:');
        console.log('  dukaan andar <key> <value>  # Ek mast key-value set karo');
        console.log('  dukaan baahar <key>         # Apni key ka value dekh lo');
        console.log('  dukaan dikhao               # Saare keys dekh lo, kya pata kuch chhupa ho!');
        console.log('  dukaan fenko                # Agar koi key kaam ka nahi hai, to usse fenko!');
        break;

    case 'andar':
        if(!key || !value){
            console.error("Arre yaar! Key aur value dono dene padenge, sahi syntax ke saath!");
        }else{
            setKeyValue(key, value);
        }
        break;

    case 'baahar':
        if(!key){
            console.error("Bhai, key to chahiye thi! Sahi syntax mein likho!")
        }else{
            getKeyValue(key)
        }
        break;
    
    case 'dikhao':
        showAllKeys();
        break;

    case 'fenko':
        if(!key){
            console.error("Key chahiye tha! Sahi syntax mein likho aur firse try karo!")
        }else{
            deleteKey(key)
        }
        break

    default:    
        console.log('Arre yaar, galat command! Sahi use karne ka tareeka:');
        console.log('  dukaan andar <key> <value>  # Ek mast key-value set karo');
        console.log('  dukaan baahar <key>         # Apni key ka value dekh lo');
        console.log('  dukaan dikhao               # Saare keys dekh lo, kya pata kuch chhupa ho!');
        console.log('  dukaan fenko                # Agar koi key kaam ka nahi hai, to usse fenko!');
        console.log('')
        break;
}
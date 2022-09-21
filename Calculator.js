import React, { useState } from 'react';
import {  Text, TouchableOpacity, View, Platform } from 'react-native';

var {vw, vh} = require('react-native-viewport-units');
const Calculator=()=>
{
    const bg = '#243441'
    const mainColor = '#ED802E'
    const txtColor = "#FFFFFF"

    const [calculation, setCalculations] = useState("")
    const [answer, setAnswer] = useState("")
    const [lastSymbol, setLastSymbol] = useState("")

    let calculationFont = 290

    const updateCalc=(symb)=>
    {
        if(symb == 'AC')
        {
            setCalculations('')
            setAnswer('')
            setLastSymbol('')
            return
        }
        if(symb == "+")
        {
            setCalculations(prev => prev + symb)
            setLastSymbol(symb)
            return
        }
        if(symb == "-")
        {
            setCalculations(prev => prev + symb)
            setLastSymbol(symb)
            return
        }
        if(symb == "x")
        {
            setCalculations(prev => prev + symb)
            setLastSymbol(symb)
            return
        }
        if(symb == "÷")
        {
            setCalculations(prev => prev + symb)
            setLastSymbol(symb)
            return
        }
        if(symb == "%")
        {
            setCalculations(prev => prev + symb)
            return
        }
        if(symb == ".")
        {
            setCalculations(prev => prev + symb)
            return
        }

        let detectAlreadyUpdate = false

        if(lastSymbol == "+")
        {
            let arr = calculation.split("+")
            let n = arr[arr.length - 1] + symb
            let b = arr[arr.length - 2] + "+"

            n = formatNum(n)

            let f = ''

            for(var i = 0; i < arr.length - 2; i++){
                f += arr[i] + "+"
            }

            console.log("arr " + arr)
            console.log(f + "" + b + " " + n)
            
            setCalculations(f + b + n)
            detectAlreadyUpdate = true

        }
        if(lastSymbol == "-")
        {
            let arr = calculation.split("-")
            let n = arr[arr.length - 1] + symb
            let b = arr[arr.length - 2] + "-"

            n = formatNum(n)

            let f = ''

            for(var i = 0; i < arr.length - 2; i++){
                f += arr[i] + "-"
            }

            console.log("arr " + arr)
            console.log(f + "" + b + " " + n)
            
            setCalculations(f + b + n)
            detectAlreadyUpdate = true
        }
        if(lastSymbol == "x")
        {
            let arr = calculation.split("x")
            let n = arr[arr.length - 1] + symb
            let b = arr[arr.length - 2] + "x"

            n = formatNum(n)

            let f = ''

            for(var i = 0; i < arr.length - 2; i++){
                f += arr[i] + "x"
            }

            console.log("arr " + arr)
            console.log(f + "" + b + " " + n)
            
            setCalculations(f + b + n)
            detectAlreadyUpdate = true
        }
        if(lastSymbol == "÷")
        {
            let arr = calculation.split("÷")
            let n = arr[arr.length - 1] + symb
            let b = arr[arr.length - 2] + "÷"

            n = formatNum(n)

            let f = ''

            for(var i = 0; i < arr.length - 2; i++){
                f += arr[i] + "÷"
            }

            console.log("arr " + arr)
            console.log(f + "" + b + " " + n)
            
            setCalculations(f + b + n)
            detectAlreadyUpdate = true
        }

        if(detectAlreadyUpdate == false)
        {
            setCalculations(prev => formatNum(prev + symb))

        }

    }

    const formatNum=(number)=>
    {
        number = parseFloat(number.replace(/,/g, '')) 
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const escapeRegExp=(string) =>{
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
      }

    const replaceAll=(str, find, replace)=> {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
      }

    async function solve()
    {
        let newCalc = replaceAll(calculation, ",", '')
        newCalc = replaceAll(newCalc, "x", '*')
        newCalc = replaceAll(newCalc, "÷", '/')
        newCalc = replaceAll(newCalc, "%", '/100')
        console.log('calc')
        console.log(newCalc)
        setAnswer(formatNum(JSON.stringify(eval(newCalc))))
    }
    
    const deleteLastSymbol=()=>
    {
        setCalculations(calculation.slice(0, -1))
    }

    if(Platform.OS == 'web')
    {
        calculationFont = 270
    }



    return(
        <View style={{ width: 100*vw, height: 133*vh,backgroundColor: bg,marginTop:270}}>
            
            <View style={{position: 'absolute', top: calculationFont, right: 30}}>
                <Text style={{color: txtColor, fontSize: 20, fontWeight: 'bold', opacity: 0.5}}>{calculation}</Text>
            </View>
            <View style={{position: 'absolute', top: 200, right: 30}}>
                <Text style={{color: txtColor, fontSize: 50, fontWeight: 'bold', opacity: 1}}>{answer}</Text>
            </View>
            
            <View style={{height: 100*vh,margin: 20, flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', bottom: -40, justifyContent: 'center', alignItems: 'center'}}>                

                <TouchableOpacity onPress={() => updateCalc('AC')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteLastSymbol()} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>x</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('%')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('÷')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>÷</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => updateCalc('7')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('8')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('9')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('x')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>*</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateCalc('4')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('5')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('6')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('-')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateCalc('1')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('2')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('3')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('+')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: mainColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => updateCalc('0')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCalc('.')} style={{backgroundColor: '#243441', width: 60, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>.</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => solve()} style={{backgroundColor: mainColor, width: 140, height: 60, margin: 10, shadowColor: "#000", borderRadius: 10, shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
                    <Text style={{color: txtColor, fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>=</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{backgroundColor: '#243441', width:50*vw,height: 50, position: 'absolute', bottom: -20, zIndex: -1000}}> */}

            {/* </View> */}

        </View>
    )
}

export default Calculator;
import React from 'react';

import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import axios from "axios";
import auth from 'firebase/auth'

import {getAuth, signInAnonymously} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, getDocs, setDoc,addDoc, Timestamp, collection, query } from "firebase/firestore";
import {useDocumentData} from "react-firebase-hooks/firestore";

//https://prices.splinterlands.com/prices

function FromHE({data, hive, coin}) {
    
//    console.log('fromHiveEngine', hive)
    for (var i=0; i < data.length; i++) {
        if (data[i].symbol === coin) {
            var price = parseFloat(data[i].lastPrice)
            var toFix = 4
            if (coin === 'DEC') 
                toFix = 5

            return (price * hive).toFixed(toFix) + ' (' + data[i].priceChangePercent +')  ' +  price.toFixed(toFix) + ' HIVE'
        }
    }
    
    const ret = 'no coin name ' + coin
    return (
        ret
    );
}

async function GetFromFireBase() {
/*    
    console.log('before auth')
    const auth = getAuth();
    console.log('before sign in')
    await signInAnonymously(auth) 
*/
    console.log('after sign in')
    const db = getFirestore();

    const docRef = doc(db, "smon-related", "chaos-pack", "2022-02-18", '11');
    const docSnap = await getDoc(docRef);

    console.log('after doc')
    const data = docSnap.data()
    console.log(data.date, data.qty)

/*
    const docSnap = await getDocs(docRef);

    console.log('after getDocs')
    console.log(docSnap)

    docSnap.forEach((doc) => {
        console.log(doc)
        const data = doc.data()
        console.log('in data', `${doc.id} => ${doc.data()}`);
        console.log(data.date, data.qty)
      });
       */
  

/*
    const q = query(collection(db, 'smon-related'))

    console.log('collection', q)
    const querySnapshot = await getDocs(query);
    const [product] = useDocumentData(query, {idField:'id'})
    console.log(product)
/*
    console.log('login ok')
    const q = query(collection(db, 'smon-related'))
    console.log('after query', q)

    const querySnapshot = await getDocs(q);
    var arry = []

    console.log('after snapshot')
    await querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arry.push(doc.data());      
    });
    console.log(arry);
*/
}

function GetPriceFromSmon({data, hive}) {
//    GetFromFireBase()

    return (
        <div>
        <table  border="0.5" align="left">
            <tbody>
                <tr>
                    <td> DEC </td> <td> &nbsp;<FromHE data={data} hive={hive} coin='DEC'/> </td>
                </tr>                                    
                <tr>
                    <td> SPS </td> <td> &nbsp;<FromHE data={data} hive={hive} coin='SPS'/> </td>
                </tr>
                <tr>
                    <td> CHAOS </td> <td> &nbsp;<FromHE data={data} hive={hive} coin='CHAOS'/> </td>
                </tr>
                <tr>
                    <td> VOUCHER </td> <td> &nbsp;<FromHE data={data} hive={hive} coin='VOUCHER'/> </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default GetPriceFromSmon;
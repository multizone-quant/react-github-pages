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

    return [data]

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
                                <td> &nbsp;{info.data().date.toLocaleString()} &nbsp;</td>  
                                <td> &nbsp;{new Date(info.data().date).toLocaleString()} &nbsp;</td>  

                                <td> &nbsp;{info.data().date.toLocaleString()} &nbsp;</td>  
                                <td> &nbsp;{info.data().qty.toLocaleString()} &nbsp;</td> 

                                */
}

function GetChaosInfo({data}) {
    var limit = 24
    if (data.lenght < 24) 
        limit = data.length

    const sold_24_hour = data[0].qty - data[limit-1].qty

    return (
        <div>
            <h3 style={{textAlign:"center"}}> # sold (last 24h) : {sold_24_hour.toLocaleString()} packs</h3>
            <table border="1" align="center">
                <thead>
                    <th> Date </th>
                    <th> Qty </th>
                    <th> &nbsp; Increase &nbsp;</th>
                </thead>
                <tbody>
                    {data.map((info, index) => (
                            <tr key={index} align="center"> 
                                <td> &nbsp;{info.date} &nbsp;</td>  
                                <td> &nbsp; &nbsp;{info.qty.toLocaleString()} &nbsp;</td> 
                                <td> &nbsp;{info.diff.toLocaleString()} &nbsp;</td> 
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetChaosInfo;
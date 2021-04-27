import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DBclient from './DBclient'

function Connect() {
    const [value, setValue] = useState("");

    useEffect(() => {
        axios.put("http://localhost:7536/api/post/user/78/alex/waters/awaters/1234")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            })
        //var resp = DBclient.getUserbyID(57)
        //resp.then((res) => {
        //    setValue(res.data)
        //})
        //resp.catch( (err) => {
        //    console.error(err);
        //});
        
        
    }, []);
    
    return (
        <div className="test">
            <p>{JSON.stringify(value)}</p>
        </div>
    );
}

export default Connect;

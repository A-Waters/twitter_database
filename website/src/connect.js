import React, { useState, useEffect } from 'react';


function Connect() {
    const [value, setValue] = useState("");

    useEffect(() => {
        fetch(`http://localhost:7536/test`)
            .then((response) => {
                response.json().then(
                    (rezs)=> {setValue(rezs)})
            })
            
    }, []);
    
    return (
        <div className="test">
            <p>{JSON.stringify(value)}</p>
        </div>
    );
}

export default Connect;

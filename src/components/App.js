import React, {useState} from 'react';


export const App = () => {
    const [counter, setCounter] = useState(0);

    const updateCounter = (value) => setCounter(counter + value)

    return(
        <div>
            <h1> This is a React Component </h1>
            <h2> Count: {counter} </h2>
            <button onClick={() => updateCounter(+1)}>+1</button>
            <button onClick={() => updateCounter(-1)}>-1</button>
        </div>
    )
}
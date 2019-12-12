import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createStore } from "redux";

const count = useSelector(state => state.count);
const dispatch = useDispatch();
const handleClick = (() => {
    dispatch({ type: 'INCREMENT' })
})

function reducer() {

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => { handleClick(); }}>
                inc
      </button>
        </div>
    );
};

export const store = createStore(reducer);

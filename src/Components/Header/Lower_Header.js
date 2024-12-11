import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import classes from'./Header.module.css'
function Lower_Header() {
return (
    <div className={classes.lower_container}>
        <ul>
            <li>
            <CiMenuBurger />
                <p>All</p>
            </li>
            <li>Today's Deals</li>
            <li>Costmer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
)
}

export default Lower_Header
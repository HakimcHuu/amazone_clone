import React,{useContext} from 'react';
import classes from './Header.module.css';
import { BiCart } from 'react-icons/bi'; // Import cart icon
import { SlLocationPin } from 'react-icons/sl'; // Import location pin icon
import { BsSearch } from 'react-icons/bs'; // Import search icon
import Lower_Header from './Lower_Header';
import {Link} from "react-router-dom"
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'

function Header() {
    const [{user,basket},dispatch]=useContext(DataContext)
    // console.log(basket.length);
    const totalItems=basket?.reduce((amount, item) =>{
        return item.amount+amount
    },0)
    
    return (
        <section className={classes.fixed}>
            <section>
                <div className={classes.Header_container}>
                    {/* Logo */}
                    <div className={classes.logo_container}>
                        <Link to="/">
                            <img 
                                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                                alt="amazon logo" 
                            />
                        </Link>

                        {/* Delivery Info */}
                        <div className={classes.delivery}>
                            <span>
                                <SlLocationPin /> {/* Location pin icon */}
                            </span>
                            <div>
                                <p>Delivered To</p>
                                <span>Ethiopia</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className={classes.search}>
                        <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            placeholder='search product' 
                        />
                        <BsSearch size={48} /> {/* Search icon */}
                    </div>

                    {/* Order Section */}
                    <div className={classes.order_container}>
                        <Link to="" className={classes.language}> 
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png" 
                                alt="" 
                            />
                            <select name="" id="">
                                <option value="">EN</option>
                            </select>
                        </Link>
                        
                        {/* Sign In */}
                        <Link to={!user && "/auth"}>
                        <div>
                            {
                                user?(
                                    <>
                                    <p>Hello {user?.email?.split("@")[0]}</p>
                                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                                    </>
                                ):(
                                    <>
                                    <p>Hello, Sign In</p>
                                    <span>Account & Lists</span>

                                    </>
                                    
                                )}

                        </div>

                        </Link>

                        {/* Returns & Orders */}
                        <Link to="/Orders">
                            <div>
                                <p>Returns</p>
                                <span>& Orders</span>
                            </div>
                        </Link>

                        {/* Cart */}
                        <Link to="/Cart" className={classes.cart}>
                            <BiCart size={35} /> {/* Cart icon */}
                            <span>{totalItems}</span>
                        </Link>
                    </div>
                </div>
            </section>
            <Lower_Header /> {/* Lower Header component */}
        </section>
    );
};

export default Header;


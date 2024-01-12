import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch=useDispatch()

  const user=useSelector((state)=>state.user)
  const isSignIn = useSelector((state) => state.user.isSignIn);

  const handleSignOut=()=>{
    signOut(auth)
    .then(() => {})
    .catch((error) => {
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: email.split('@')[0] }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-screen z-10">
      <div className="flex justify-between text-white">
        <div>
            <img src={LOGO} alt="logo" className="h-[100px] w-[90px] ml-5" />
        </div>

        <div>
          <ul className="flex flex-row mx-7 my-10">
            <Link to="/">
              <li className="px-3 hover:text-gray-500">Home</li>
            </Link>

            <Link to={isSignIn ? "/products" : "/login"}>
              <li className="px-3 hover:text-gray-500">Products</li>
            </Link>
            
            <Link to="/cart">
              <li className="px-3 hover:text-gray-500">Cart</li>
            </Link>

            <Link to="/login">
              <li className="px-3 hover:text-gray-500">Login</li>
            </Link>
            
              {isSignIn && <button onClick={handleSignOut}>Sign Out</button>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
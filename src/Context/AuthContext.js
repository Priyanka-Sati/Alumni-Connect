import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";

export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user); 
      setLoading(false);
    });
    return () => {
      unsub();   
    };
  }, []);

  const uploadpostdata = (postdata, userData) => {
    // database.collection("posts").add(postdata);

    // console.log("from contextAPI = ", user);

    database.posts.add(postdata).then(async (ref) => {
      let res = await database.users.doc(user.uid).collection("postID").add({id : ref.id});
    });
  };

  const store = {
    user,
    uploadpostdata,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

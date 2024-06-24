import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import '../index.css'
const Spinner = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#d52222");

  return (
    <div className="spinner">

      <HashLoader color="#36d7b7"  size={80}/>
      
    </div>
  );
};

export default Spinner;

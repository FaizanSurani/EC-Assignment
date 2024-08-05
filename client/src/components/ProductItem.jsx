import React from "react";

const ProductItem = ({ id, title, url, price }) => {
  return (
    <>
      <div key={id} className="bg-white p-4 rounded shadow-md relative">
        <img src={url} alt="" className="w-full object-cover h-32 mb-4" />
        <p className="textlg font-bold">{title}</p>
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded transform rotate-12">
          ${price}
        </div>
      </div>
    </>
  );
};

export default ProductItem;

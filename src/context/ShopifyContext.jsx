import { createContext, useState } from "react";

const ShopifyContext = createContext();

const ShopifyProvider = ({ children }) => {
  const [shopifyToken, setShopifyToken] = useState(
    localStorage.getItem("shopifyToken" || null),
  );
  const [shopifyId, setShopifyId] = useState(
    localStorage.getItem("shopifyId" || null),
  );
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || "");
  const [_id, set_id] = useState(localStorage.getItem("_id") || null);
  return (
    <ShopifyContext.Provider
      value={{
        shopifyToken,
        setShopifyToken,
        shopifyId,
        setShopifyId,
        cartId,
        setCartId,
        _id,
        set_id,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export { ShopifyProvider, ShopifyContext };

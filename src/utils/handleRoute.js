import { Navigate } from "react-router-dom";

// Old private route script | Usage: import the function to every pages and put the tag element at stage of page. ↴
// import { useNavigate } from "react-router-dom";
// const PrivateRoute = (token, trueCondition) => {
//   const navigation = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigation(trueCondition);
//     }
//   }, [token, trueCondition]);
//   return null;
// };
// export { PrivateRoute };

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access-token");

  if (!accessToken)
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ msg: "Please, login first", isRedirected: true }}
      />
    );
  return children;
};

const PreventBackPage = ({ children }) => {
  const accessToken = localStorage.getItem("access-token");
  if (accessToken)
    return (
      <Navigate
        to="/"
        replace={true}
        state={{ msg: "You have logged in", isRedirected: true }}
      />
    );
  return children;
};

export { PrivateRoute, PreventBackPage };

import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>Opps!! SomeThing Went Wrong!!</h1>
      <p>
        {" "}
        {err.status}: {err.statusText}
      </p>
    </div>
  );
};
export default Error;

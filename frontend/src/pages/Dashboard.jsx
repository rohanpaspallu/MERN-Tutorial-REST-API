import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("value of user is  :", user);
  useEffect(() => {
    if (isError) console.log("error message is  : ", message);
    console.log("comes here");
    if (!user) navigate("/login");

    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <>
            <div className="goals">
              {goals.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          </>
        ) : (
          <h3>you dont have any goals as of date</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;

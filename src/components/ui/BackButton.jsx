import { useNavigate } from "react-router-dom";
import classes from "./BackButton.module.css";

export const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
  };
  
  return (
    <button className={classes.button} onClick={handleBack}>
      Back to Menu
    </button>
  );
};

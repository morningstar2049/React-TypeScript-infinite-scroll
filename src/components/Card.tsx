import React from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

type CardProps = {
  id: number;
  name: string;
  lastName: string;
  title: string;
  prefix: string;
  imageUrl: string;
};

const Card: React.FC<CardProps> = (props) => {
  const navigate = useNavigate();

  function navigateToUser() {
    navigate(`/user/${props.id}`);
  }

  return (
    <div className={styles.card} onClick={navigateToUser}>
      <img className={styles.cardImg} src={props.imageUrl} alt="animalImage" />
      <div>
        {props.prefix} {props.name} {props.lastName}
      </div>
      <div>{props.title}</div>
    </div>
  );
};

export default Card;

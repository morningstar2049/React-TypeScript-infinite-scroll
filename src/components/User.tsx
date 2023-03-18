import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./User.module.css";
import { useParams } from "react-router-dom";
import Card from "./Card";

type UserType = {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
  jobDescriptor?: string;
  jobArea?: string;
  jobType?: string;
  email?: string;
  ip?: string;
  company?: {
    name: string;
    suffix: string;
  };
  address?: {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
  };
};

function User() {
  const [user, setUser] = useState<UserType>();
  const [friends, setFriends] = useState<Array<UserType>>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const { id } = useParams();

  const fetchFriends = useCallback(async () => {
    const res = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/20`
    );
    const data = await res.json();
    setFriends((prev) => [...prev, ...data.list]);
  }, [id, page]);

  const fetchUser = useCallback(async () => {
    const res = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    );
    const data = await res.json();
    setUser(data);
  }, [id]);

  useEffect(() => {
    setFriends([]);
  }, [id]);

  useEffect(() => {
    fetchUser();
    fetchFriends();
  }, [fetchUser, fetchFriends]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "30px",
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.userImage} src={`${user?.imageUrl}?v=${id}`} />
        <fieldset>
          <legend>Info</legend>
          <div>
            <strong>
              {user?.prefix} {user?.name} {user?.lastName}
            </strong>
          </div>
          <div>{user?.title}</div>
          <div>Email: {user?.email}</div>
          <div>Ip Address: {user?.ip}</div>
          <div>Job Area: {user?.jobArea}</div>
          <div>Job Type: {user?.jobType}</div>
          <div></div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <div>
            <strong>
              {user?.company?.suffix} {user?.company?.name}
            </strong>
          </div>
          <div>City: {user?.address?.city}</div>
          <div>Country: {user?.address?.country}</div>
          <div>State: {user?.address?.state}</div>
          <div>Street Address: {user?.address?.streetAddress}</div>
          <div>ZIP: {user?.address?.zipCode}</div>
        </fieldset>
      </div>
      <div style={{ fontWeight: "bold", marginTop: "30px", fontSize: "24px" }}>
        Friends:
      </div>
      <div className={styles.friends}>
        {friends.length
          ? friends.map((user) => (
              <React.Fragment key={user.id + Math.random()}>
                <Card
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  imageUrl={`${user.imageUrl}?v=${user.id}`}
                  prefix={user.prefix}
                  title={user.title}
                />
              </React.Fragment>
            ))
          : null}
      </div>
      <div ref={loader} />
    </div>
  );
}

export default User;

import React, { useCallback, useEffect, useState, useRef } from "react";
import Card from "./Card";
import styles from "./UserList.module.css";

type User = {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
};

function UserList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<Array<User>>([]);
  const loader = useRef(null);

  const fetchUsers = useCallback(async () => {
    const res = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`
    );
    const data = await res.json();
    setUsers((prev) => [...prev, ...data.list]);
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    <div className={styles.userList}>
      {users.length
        ? users.map((user) => (
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
      <div ref={loader} />
    </div>
  );
}

export default UserList;

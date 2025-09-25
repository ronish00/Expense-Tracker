"use client";

import Guest from "@/components/shared/Guest";
import { useUser } from "@/context/UserContext";
const Home = () => {
  const user = useUser();

  if (user) {
    return <div>Hello {user.username}</div>;
  }

  return <Guest />;
};

export default Home;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunities } from "../features/communities/communitySlice";

const CommunitiesList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.community );

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {items.map(c => <li key={c.id}>{c.name}</li>)}
    </ul>
  );
};

export default CommunitiesList;

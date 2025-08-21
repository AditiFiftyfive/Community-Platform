import React, { useEffect, useState } from "react";
import api from "../../api";

export default function CommunityEvents() {
  const [events, setEvents] = useState([]);
  const [communities, setCommunities] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/Events");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchCommunities = async () => {
    try {
      const response = await api.get("/Communities");
      setCommunities(response.data);
    } catch (err) {
      console.error("Error fetching communities:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCommunities();
  }, []);
  
  return (
    <div>
      <h2>Events</h2>
      {events.map(event => (
        <p key={event.id}>
          {event.subtitle} — {event.date}
        </p>
      ))}

      <h2>Communities</h2>
      {communities.map(c => (
        <p key={c.id}>
          {c.name} — {c.location}
        </p>
      ))}
    </div>
  );
}
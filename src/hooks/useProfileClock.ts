import { useEffect, useState } from "react";

const profileTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "Asia/Karachi",
});

const getProfileTime = () => profileTimeFormatter.format(new Date());

export function useProfileClock() {
  const [profileTime, setProfileTime] = useState(getProfileTime);

  useEffect(() => {
    const interval = window.setInterval(() => setProfileTime(getProfileTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return profileTime;
}

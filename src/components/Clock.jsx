import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function Clock({ className }) {
  const [now, setNow] = useState(() => fmt.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="relative mr-1.5 inline-flex size-1.5 align-middle">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-spot opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-spot" />
      </span>
      IST {now}
    </span>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function Map() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true); // render hanya setelah mount
  }, []);

  return showMap ? (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6983128379943!2d107.02354057488817!3d-6.303312261688578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6991e89717fbb5%3A0xbedeef8d6f425758!2sGPdI%20Shekinah%20GRAHA%20HARAPAN!5e0!3m2!1sid!2sid!4v1748864872601!5m2!1sid!2sid"
      width="100%"
      height="100%"
      aria-label="Gereja GPdI"
      loading="lazy"
      style={{ border: 0 }}
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  ) : (
    <div style={{ width: "100%", height: "400px", backgroundColor: "#eee" }}>
      Loading map…
    </div>
  );
}

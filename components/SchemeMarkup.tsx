"use client";

export default function SchemaMarkup() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["PlaceOfWorship", "Organization"],
        "name": "GPdI Shekinah Graha Harapan",
        "description": "Gereja Pentakosta di Indonesia (GPdI) Shekinah berlokasi di Mustika Jaya, Bekasi. Menyelenggarakan ibadah Minggu dan kegiatan rohani lainnya sepanjang minggu.",
        "image": "https://www.gpdishekinah.online/logoGPdI.jpeg",
        "url": "https://www.gpdishekinah.online",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Graha Harapan Blok E 13 No 2",
          "addressLocality": "Mustika Jaya",
          "addressRegion": "Jawa Barat",
          "postalCode": "17158",
          "addressCountry": "ID"
        },
        "telephone": "+6281316145742",
        "openingHours": [
          "Mo 00:00-23:59",
          "Tu 00:00-23:59",
          "We 00:00-23:59",
          "Th 00:00-23:59",
          "Fr 00:00-23:59",
          "Sa 00:00-23:59",
          "Su 00:00-23:59"
        ],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-6.303093633833016",
          "longitude": "107.02616911398482"
        },
        "hasMap": "https://maps.google.com/?q=-6.303093633833016,107.02616911398482",
        "religiousAffiliation": {
          "@type": "Religion",
          "name": "Gereja Pentakosta di Indonesia (GPdI)"
        },
        "service": [
          {
            "@type": "Service",
            "name": "Ibadah Minggu 1 (Pagi)",
            "startTime": "06:00",
            "endTime": "08:00",
            "dayOfWeek": "Sunday"
          },
          {
            "@type": "Service",
            "name": "Ibadah Minggu 2 (Siang)",
            "startTime": "10:00",
            "endTime": "12:00",
            "dayOfWeek": "Sunday"
          },
          {
            "@type": "Service",
            "name": "Ibadah Minggu 3 (Malam)",
            "startTime": "17:00",
            "endTime": "19:00",
            "dayOfWeek": "Sunday"
          },
          {
            "@type": "Service",
            "name": "Persekutuan Doa Jumat",
            "description": "Persekutuan Doa untuk Pelayan-pelayan dan Jemaat",
            "startTime": "19:00",
            "endTime": "21:00",
            "dayOfWeek": "Friday"
          }
        ],
        "sameAs": [
          "https://facebook.com/GPdI.Shekinah.GrahaHarapan"
        ]
      })}
    </script>
  );
}
import { useEffect } from "react";

function AdSlot({
  className = "",
  label = "Advertisement",
  slot = "",
  format = "auto",
  responsive = true,
}) {
  const publisherId =
    import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "";

  useEffect(() => {
    if (!publisherId || !slot) {
      return;
    }

    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error(
        "AdSense error:",
        error
      );
    }
  }, [publisherId, slot]);

  /*
   * Until the real AdSense Publisher ID and
   * Ad Slot IDs are configured, show the
   * development placeholder.
   */

  if (!publisherId || !slot) {
    return (
      <div
        className={`ad-slot ${className}`}
        aria-label={label}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      className={`ad-slot ${className}`}
      aria-label={label}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "90px",
          width: "100%",
        }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={
          responsive ? "true" : "false"
        }
      />

    </div>
  );
}

export default AdSlot;
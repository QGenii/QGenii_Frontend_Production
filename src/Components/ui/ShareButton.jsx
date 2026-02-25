import React, { useEffect, useRef, useState } from "react";
import {
  SiWhatsapp,
  SiInstagram,
  SiGithub,
  SiFacebook,
  SiLinkedin,
} from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-hot-toast";

const platforms = [
  { Icon: SiWhatsapp, label: "WhatsApp" },
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiGithub, label: "GitHub" },
  { Icon: SiFacebook, label: "Facebook" },
  { Icon: SiLinkedin, label: "LinkedIn" },
  { Icon: RiTwitterXLine, label: "Twitter" },
];

export default function ShareButton({ url }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast("Copied To Clipboard Successfully !");
    setOpen(false);
  };

  // Share
  const handleShare = (platform) => {
    // const url = `${window.location.origin}/blog/view/${post._id}`;
    // navigator.clipboard.writeText(url);
    // toast("Link copied to clipboard!");

    if (platform === "WhatsApp") {
      const textToShare = encodeURIComponent(url);
      const whatsappUrl = `whatsapp://send?text=${textToShare}`;
      window.location.href = whatsappUrl;
    }

    
  };

  return (
    <div ref={ref} className="relative inline-flex items-center">
      {/* Share Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <IoIosSend size={16} />
        <span>Share</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full left-1/ -translate-x-1/2 mb-2 z-50">
          {/* Popup */}
          <div className="flex items-center gap-4 bg-white border rounded-full shadow-lg px-5 py-2">
            {platforms.map(({ Icon, label }) => (
              <button
                key={label}
                title={label}
                onClick={() => handleShare(label)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                <Icon className="w-4.5 h-4.5" />
              </button>
            ))}
          </div>

          {/* Arrow (Centered) */}
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-white border-l border-b rotate-45 -mt-1" />
          </div>
        </div>
      )}
    </div>
  );
}

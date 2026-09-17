import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInstantDB } from "../hooks/useInstantDB";

const FloatingButtons = () => {
  const { data } = useInstantDB();

  const phoneNum = data.contact?.phone ? data.contact.phone.replace(/[^0-9]/g, "") : "919876543210";
  const whatsappNum = data.contact?.whatsapp || phoneNum;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3">
      {/* WhatsApp Action Button */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/${whatsappNum}?text=Hello%20Solar%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20a%20solar%20rooftop%20system.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          w-11 h-11 sm:w-14 sm:h-14
          rounded-full
          bg-emerald-500
          text-white
          flex items-center
          justify-center
          shadow-lg
          hover:bg-emerald-600
          transition-all
          border-2
          border-white
        "
      >
        <FaWhatsapp className="text-2xl sm:text-3xl" />
      </motion.a>

      {/* Direct Call Button */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href={`tel:${phoneNum}`}
        aria-label="Call Solar Enterprises"
        className="
          w-11 h-11 sm:w-14 sm:h-14
          rounded-full
          bg-teal-600
          text-white
          flex items-center
          justify-center
          shadow-lg
          hover:bg-teal-700
          transition-all
          border-2
          border-white
        "
      >
        <FaPhoneAlt className="text-xl sm:text-2xl" />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
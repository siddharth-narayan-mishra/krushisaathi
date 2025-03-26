import { fadeInUp } from "@/config/landingPageConfig";
import {motion} from "motion/react"

export default function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <motion.div
            className="text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
            <div className="text-gray-600">{label}</div>
        </motion.div>
    );
}
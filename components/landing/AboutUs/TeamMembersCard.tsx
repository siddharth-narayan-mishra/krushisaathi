import { fadeInUp } from '@/config/landingPageConfig';
import { Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeamMemberCard({ name, role }: { name: string; role: string }) {
    return (
        <motion.div
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </motion.div>
    );
}
export const StatCard = ({
  title,
  value,
  icon: Icon,
  color
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => {
  return (
    <div className="rounded-xl shadow-lg p-6 w-full md:w-[280px] bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    </div>
  );
};

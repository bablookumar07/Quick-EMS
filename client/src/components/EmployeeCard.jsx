import {
  BriefcaseBusiness,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* Top Section */}
      <div className="relative h-32 bg-slate-100 flex items-center justify-center">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
          {employee.firstName?.charAt(0)}
          {employee.lastName?.charAt(0)}
        </div>

        {/* Department */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm">
          <BriefcaseBusiness size={15} className="text-indigo-600" />

          <span className="text-xs font-medium text-slate-600">
            {employee.department}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition">

          <button
            onClick={() => onEdit(employee)}
            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-indigo-600"
          >
            <Pencil size={15} />
          </button>

          <button
            onClick={() => onDelete(employee)}
            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>

        </div>
      </div>

      {/* Employee Details */}
      <div className="p-5">

        <h3 className="text-lg font-semibold text-slate-800">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {employee.position}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100">

          <p className="text-xs text-slate-400">
            Email
          </p>

          <p className="text-sm text-slate-600 mt-1 truncate">
            {employee.email}
          </p>

        </div>

      </div>

    </div>
  );
};

export default EmployeeCard;
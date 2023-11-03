export default function StatusColumn({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "InUse":
        return "bg-yellow-100 text-yellow-800";
      case "Disposed":
        return "bg-red-100 text-red-800";
      case "Return":
        return "bg-purple-100 text-purple-800";
      case "Maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "";
    }
  };

  const statusColor = getStatusColor(status);

  if (!statusColor) {
    return null;
  }

  return (
    <span
      className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${statusColor}`}
    >
      {status}
    </span>
  );
}

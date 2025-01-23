import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoadingSpinner({
  message = "Loading...",
  size = "large",
}) {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#1677ff" }} spin />
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-white/95">
      <Spin indicator={antIcon} size={size} />
      <div className="mt-4 text-lg font-medium text-blue-500">{message}</div>
    </div>
  );
}

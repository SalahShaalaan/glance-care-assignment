import { Pagination as AntPagination } from "antd";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div
      style={{
        marginTop: 24,
        marginBottom: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AntPagination
        current={currentPage}
        total={totalPages * 10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

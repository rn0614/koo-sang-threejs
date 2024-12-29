import React from "react";
import toast, { Toaster } from "react-hot-toast";

type ConfirmModalProps = {
  type: "confirm-cancel" | "confirm-only";
  onConfirm: () => void;
  onCancel?: () => void;
};

// confirmModal 컴포넌트 정의
const confirmModal = ({ type, onConfirm, onCancel }: ConfirmModalProps) => {
  toast.custom((t) => (
    <div
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <p>Are you sure you want to proceed?</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          style={{
            background: "#d33",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
          onClick={() => {
            onConfirm(); // 확인 클릭 시 동작 실행
            toast.dismiss(t.id); // 알림 닫기
          }}
        >
          Confirm
        </button>
        {type === "confirm-cancel" && (
          <button
            style={{
              background: "#bbb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (onCancel) onCancel(); // 취소 클릭 시 동작 실행
              toast.dismiss(t.id); // 알림 닫기
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  ));
};

const handleConfirmAction = (
  type: "confirm-cancel" | "confirm-only" = "confirm-cancel",
  onConfirm:any,
  onCancel = () => null
) => {
  confirmModal({
    type: type, // 확인과 취소 버튼 모두 표시
    onConfirm: onConfirm,
    onCancel: onCancel,
  });
};

export { handleConfirmAction };

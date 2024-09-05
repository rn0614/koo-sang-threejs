"use client"
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";

type ExcalidrawCanvasProps ={
  isOwner:boolean;
  socket:Socket|null;
  chatId:string;
}

export default function ExcalidrawCanvas({ isOwner, socket, chatId }:ExcalidrawCanvasProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI|null>(null);

  useEffect(() => {
    if (socket) {
      // 서버에서 방장의 현재 그린 내용을 초기화로 받음
      socket.on("initializeDrawing", (elements) => {
        if (excalidrawAPI) {
          excalidrawAPI.updateScene({ elements });
        }
      });

      socket.on("drawingUpdate", (elements) => {
        if (excalidrawAPI) {
          excalidrawAPI.updateScene({ elements });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("initializeDrawing");
        socket.off("drawingUpdate");
      }
    };
  }, [socket, excalidrawAPI]);

  const handleChange = (elements:readonly ExcalidrawElement[]) => {
    if (isOwner && socket) {
      socket.emit("drawingUpdate", { chatId, elements });
    }
  };

  return (
    <Excalidraw
      onChange={(elements) => handleChange(elements)}
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
      isCollaborating={true}
      viewModeEnabled={!isOwner}
    />
  );
}
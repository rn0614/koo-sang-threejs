// 전역 타입 선언
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

// react native app 환경인지 판단
export const isApp = () => {
  let isApp = false;

  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    isApp = true;
  }

  return isApp;
};

// ReactNative Webview에 postMessage 요청
const sendRouterEvent = (path: string): void => {
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: "ROUTER_EVENT", data: path })
  );
};

// 뒤로가기 하는 경우
export const stackRouterBack = (router: any) => {
  if (isApp()) {
    sendRouterEvent("back");
  } else {
    router.back();
  }
};

// push 하는 경우
export const stackRouterPush = (router: any, url: string) => {
  if (isApp()) {
    sendRouterEvent(url);
  } else {
    router.push(url);
  }
};

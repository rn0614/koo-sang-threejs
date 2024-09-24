// 전역 타입 선언, react-natvie-webview 안에는 ReactNativeWebview 객체가 있음. 있으면 postMessage를 사용하려고 타입설정
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

// react native app 환경인지 판단
export const isApp = () => {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
};

// ReactNative Webview에 postMessage 요청
const sendRouterEvent = (path: string): void => {
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: "ROUTER_EVENT", data: path })
  );
};

// 뒤로가기 하는 경우
export const stackRouterBack = (router: any) => {
  isApp() ? sendRouterEvent("back") : router.back();
};


// push 하는 경우
export const stackRouterPush = (router: any, url: string) => {
  isApp() ? sendRouterEvent(url) : router.push(url);
};


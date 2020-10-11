import { RecoilRoot } from "recoil";
import "leaflet/dist/leaflet.css";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}

export default MyApp;

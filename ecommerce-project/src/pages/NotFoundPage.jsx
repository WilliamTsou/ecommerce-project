import { Header } from "../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
      <title>404 Page Not Found</title>

      <Header />
      <link rel="icon" type="image/svg+xml" href="not-found.png" />

      <div className="not-found-message">Page not found</div>
    </>
  );
}

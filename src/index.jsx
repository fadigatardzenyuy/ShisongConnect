import React, { useState } from "react";
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasHospitalBook, setHasHospitalBook] = useState(false);

  const navigate = (path) => {
    setCurrentPath(path);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const createHospitalBook = () => {
    setHasHospitalBook(true);
  };

  return {
    currentPath,
    navigate,
    isAuthenticated,
    hasHospitalBook,
    login,
    createHospitalBook,
  };
};

const SHICOApp = () => {
  const router = useRouter();

  const renderPage = () => {
    switch (router.currentPath) {
      case "/":
        return <LandingPage navigate={router.navigate} />;
      case "/login":
        return <LoginPage />;
      case "/hospital-book":
        return router.isAuthenticated ? <HospitalBookPage /> : <LoginPage />;
      case "/dashboard":
        return router.isAuthenticated && router.hasHospitalBook ? (
          <DashboardPage />
        ) : (
          <HospitalBookPage />
        );
      default:
        return <LandingPage navigate={router.navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        currentPath={router.currentPath}
        navigate={router.navigate}
        isAuthenticated={router.isAuthenticated}
      />

      <main>{renderPage()}</main>

      <Footer />
    </div>
  );
};

export default SHICOApp;

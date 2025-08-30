import React, { useState, useEffect } from "react";
import apiClient, { checkTokenValidity, logout } from "../../utils/ApiClient";

const AuthDebug = () => {
  const [authInfo, setAuthInfo] = useState({});
  const [testResult, setTestResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    setAuthInfo({
      hasToken: !!token,
      hasRefreshToken: !!refreshToken,
      hasUser: !!user,
      tokenValid: checkTokenValidity(),
      token: token ? `${token.substring(0, 20)}...` : "No token",
      user: user ? JSON.parse(user) : null,
    });
  };

  const testAPI = async () => {
    setLoading(true);
    setTestResult("Testing...");

    try {
      const response = await apiClient.get("/auth/me");
      setTestResult(
        `✅ API Test Successful: ${JSON.stringify(response.data, null, 2)}`
      );
    } catch (error) {
      setTestResult(
        `❌ API Test Failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.clear();
    setTestResult("🧹 Auth data cleared");
    checkAuthStatus();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">🔍 Auth Debug Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auth Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Auth Status</h2>
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 ${
                  authInfo.hasToken ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{authInfo.hasToken ? "✅" : "❌"}</span>
                <span>Token: {authInfo.hasToken ? "Present" : "Missing"}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  authInfo.hasRefreshToken ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{authInfo.hasRefreshToken ? "✅" : "❌"}</span>
                <span>
                  Refresh Token:{" "}
                  {authInfo.hasRefreshToken ? "Present" : "Missing"}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  authInfo.tokenValid ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{authInfo.tokenValid ? "✅" : "❌"}</span>
                <span>Token Valid: {authInfo.tokenValid ? "Yes" : "No"}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  authInfo.hasUser ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{authInfo.hasUser ? "✅" : "❌"}</span>
                <span>
                  User Data: {authInfo.hasUser ? "Present" : "Missing"}
                </span>
              </div>
            </div>

            {authInfo.user && (
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <h3 className="font-semibold text-blue-800">User Info:</h3>
                <p>ID: {authInfo.user.id}</p>
                <p>Role: {authInfo.user.role}</p>
                <p>Email: {authInfo.user.email}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Actions</h2>
            <div className="space-y-3">
              <button
                onClick={checkAuthStatus}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                🔄 Refresh Status
              </button>

              <button
                onClick={testAPI}
                disabled={loading}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? "⏳ Testing..." : "🧪 Test API Call"}
              </button>

              <button
                onClick={clearAuth}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                🧹 Clear Auth Data
              </button>

              <button
                onClick={logout}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Test Results</h2>
            <pre className="whitespace-pre-wrap text-sm bg-white p-3 rounded border overflow-auto max-h-60">
              {testResult}
            </pre>
          </div>
        )}

        {/* Token Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Token Preview</h2>
          <code className="block bg-white p-3 rounded border text-xs break-all">
            {authInfo.token}
          </code>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;

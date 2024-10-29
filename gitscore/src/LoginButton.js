import React from 'react';

function LoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5001/auth/github';
  };

  return (
    <button onClick={handleLogin}>
      Login with GitHub
    </button>
  );
}

export default LoginButton;

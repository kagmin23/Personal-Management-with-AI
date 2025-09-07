export async function loginApi(email: string, password: string) {
    
  if (email === "admin@example.com" && password === "123456") {
    return {
      user: { name: "Admin", email },
      token: "fake-jwt-token",
    };
  }
  throw new Error("Invalid credentials");
}

export async function logoutApi() {
  // Xoá token từ backend nếu cần
  return true;
}

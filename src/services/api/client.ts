class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `API Error: ${response.statusText}`,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async post<T>(
    endpoint: string,
    body: any,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `API Error: ${response.statusText}`,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async put<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `API Error: ${response.statusText}`,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `API Error: ${response.statusText}`,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }
}

const getBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"
  );
};

export const apiClient = new ApiClient(getBaseUrl());

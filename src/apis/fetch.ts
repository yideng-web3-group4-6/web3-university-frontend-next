const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...restOptions } = options;
  
  // 处理查询参数
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...restOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 
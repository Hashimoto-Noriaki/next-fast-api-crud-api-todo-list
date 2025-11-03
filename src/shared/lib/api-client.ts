// API クライアント設定
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  token?: string;
}

/**
 * 共通の fetch wrapper（204/空本文/非JSONにも強い）
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers: h, body, ...rest } = options;

  // ヘッダ組み立て：ボディがある時だけ Content-Type を既定化
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(h || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: rest.credentials ?? "include",
    cache: rest.cache ?? "no-store",
    ...rest,
    headers,
    body,
  });

  // 204/205 は本文なし → そのまま成功扱いで undefined を返す
  if (res.status === 204 || res.status === 205) {
    // @ts-expect-error: 呼び出し側で void/undefined を想定
    return undefined;
  }

  // 本文をテキストで取り出してから、安全にJSONパース
  const text = await res.text().catch(() => "");
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = text
    ? (isJson ? safeJsonParse(text) : text)
    : undefined;

  if (!res.ok) {
    const message =
      (isJson && data?.message) ||
      data ||
      res.statusText ||
      "APIエラーが発生しました";
    const code = isJson ? data?.code : undefined;
    throw new ApiError(String(message), res.status, code);
  }

  return data as T;
}

function safeJsonParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return s; // 壊れたJSONでも落とさない
  }
}

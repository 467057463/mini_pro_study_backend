import type { FetchOptions } from "ofetch";
import { ElMessage } from 'element-plus'
export function useRequest<T>(url: string, options: FetchOptions){
  return useNuxtApp().$api<T>(url, options as any).catch((err) => {
    ElMessage({
      type: "error",
      message: err?.msg ?? err?.message ?? '发送了错误'
    })
    console.error(err)
    return Promise.reject(err)
  })
}
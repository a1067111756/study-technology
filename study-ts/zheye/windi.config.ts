import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  preflight: false,
  shortcuts: {
    'btn-plain': 'py-2 px-4 text-[#0d6efd] !font-normal bg-transparent border-1px border-[#0d6efd] border-solid !rounded'
  }
})
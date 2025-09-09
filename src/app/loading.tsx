import LogoLoader from '@/components/LogoLoader'

export default function Loading() {
  // This file provides a global fallback while route segments load
  return <LogoLoader fullScreen label="Đang tải nội dung..." size="md" />
}

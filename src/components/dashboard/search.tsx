import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useRouter } from "next/navigation"

export function Search() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce((value: string) => {
    if (value) {
      router.push(`/dashboard/search?q=${value}`)
    }
  }, 300)

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-8"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          debouncedSearch(e.target.value)
        }}
      />
    </div>
  )
}
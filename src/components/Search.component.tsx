
interface SearchProps {
    search: string;
    setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
    return (
        <div className="Search-box">
          <input type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search task" />
        </div>
    )
}

export default Search

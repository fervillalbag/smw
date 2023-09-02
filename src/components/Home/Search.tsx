import { useRef } from "react";

export default function Search() {
  const inputRef = useRef<any>(null);

  return (
    <div className="px-5 mt-2">
      <div className="relative">
        <input
          ref={inputRef}
          placeholder="Buscar"
          className="pl-12 rounded-md shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.08)] bg-white h-[54px] w-full focus-visible:outline-@sura-primary-700"
        />

        <button
          onClick={() => inputRef.current.focus()}
          className="absolute left-[14px] top-1/2 -translate-y-1/2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0616C18.7932 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94942 18.7932 8.90911 18.3912 7.93848C17.9891 6.96785 17.3998 6.08591 16.657 5.34302C15.9141 4.60014 15.0321 4.01084 14.0615 3.6088C13.0909 3.20675 12.0506 2.99982 11 2.99982C9.94936 2.99982 8.90905 3.20675 7.93842 3.6088C6.96779 4.01084 6.08585 4.60014 5.34296 5.34302C3.84263 6.84335 2.99976 8.87824 2.99976 11C2.99976 13.1218 3.84263 15.1567 5.34296 16.657C6.84329 18.1574 8.87818 19.0002 11 19.0002C13.1217 19.0002 15.1566 18.1574 16.657 16.657Z"
              stroke="#A9ABB0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

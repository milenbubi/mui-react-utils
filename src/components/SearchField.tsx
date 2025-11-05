import { ChangeEvent, useRef, useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import { Iconify } from "./Iconify";
import { C180Form } from "./C180Form";
import { Centered } from "./Centered";
import { useChan180Colors } from "../mui";

interface IProps {
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  name?: string;
  placeholder?: string;
  maxWidth?: number;
}

const SearchButton = () => (
  <IconButton type="submit" sx={{
    opacity: 0.7,
    position: "absolute",
    left: 4,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1
  }}
  >
    <Iconify icon="fa-solid:search" />
  </IconButton>
);

const DeleteButton = () => (
  <IconButton
    type="reset"
    color="primary"
    sx={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1
    }}
  >
    <Iconify width={10} icon="streamline:delete-1-solid" />
  </IconButton>
);



/**
 * Search input field component for Chan180 projects.
 *
 * Provides a responsive search box with built-in submit and reset controls.
 * The field automatically handles value trimming, form submission, and clearing
 * while preserving focus and notifying the parent via `onChange` and `onSubmit` callbacks.
 *
 * Includes:
 * - A search icon button on the left (`SearchButton`)
 * - A delete/reset button on the right (`DeleteButton`)
 * - Integrated `C180Form` and `Centered` layout wrappers
 * - Theme-aware background via `useChan180Colors()`
 *
 * @component
 * @example
 * ```tsx
 * import { SearchField } from "@ffilip/mui-react-utils";
 *
 * function Example() {
 *   const handleSearchChange = (value: string) => console.log("Search:", value);
 *   const handleSearchSubmit = (value: string) => console.log("Submit:", value);
 *
 *   return (
 *     <SearchField
 *       onChange={handleSearchChange}
 *       onSubmit={handleSearchSubmit}
 *       placeholder="Search..."
 *       maxWidth={300}
 *     />
 *   );
 * }
 * ```
 *
 * @param {object} props - Component props.
 * @param {(value: string) => void} props.onChange - Triggered on input change with the current value.
 * @param {(value: string) => void} props.onSubmit - Triggered on form submit with the trimmed value.
 * @param {string} [props.name] - Optional input name attribute.
 * @param {string} [props.placeholder="Search ..."] - Placeholder text for the input field.
 * @param {number} [props.maxWidth=250] - Maximum width (in pixels) for the input field.
 *
 * @returns {JSX.Element} The search field component with built-in form handling.
 */
function SearchField({ onChange, onSubmit, name, placeholder = "Search ...", maxWidth = 250 }: IProps): JSX.Element {
  const { bgrC } = useChan180Colors();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);
    onChange(value);
  };


  const handleSubmit = () => {
    const trimmedSearch = search.trim();
    setSearch(trimmedSearch);
    onSubmit(trimmedSearch);
  };


  const handleDelete = () => {
    inputRef.current?.focus();
    setSearch("");
    onChange("");
  };



  return (
    <Centered>
      <C180Form onSubmit={handleSubmit} onReset={handleDelete}>
        <Box sx={{ position: "relative" }}>

          <SearchButton />

          <TextField
            inputRef={inputRef}
            size="small"
            value={search}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-input": {
                maxWidth,
                borderRadius: "6px",
                px: "44px",
                background: bgrC
              }
            }}
          />

          {search && <DeleteButton />}

        </Box>
      </C180Form>
    </Centered>
  );
}



export { SearchField };
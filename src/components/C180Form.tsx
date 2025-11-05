import { FormEvent, ReactNode } from "react";

interface IProps {
  id?: string;
  name?: string;
  children?: ReactNode;
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => void;
  onReset?: (event?: FormEvent<HTMLFormElement>) => void;
  className?: string;
}



/**
 * Reusable form wrapper component for Chan180 projects.
 *
 * Provides a consistent base for handling form submissions and resets
 * without reloading the page (via `event.preventDefault()`).
 *
 * The component automatically prevents the default browser submit behavior
 * and triggers the provided `onSubmit` callback, if available.
 *
 * @component
 * @example
 * ```tsx
 * import { C180Form } from "@ffilip/mui-react-utils";
 *
 * function ExampleForm() {
 *   const handleSubmit = (e) => {
 *     console.log("Form submitted", e);
 *   };
 *
 *   return (
 *     <C180Form onSubmit={handleSubmit}>
 *       <input type="text" name="username" />
 *       <button type="submit">Send</button>
 *     </C180Form>
 *   );
 * }
 * ```
 *
 * @param {object} props - Component props.
 * @param {string} [props.id] - Optional form identifier.
 * @param {string} [props.name] - Optional form name attribute.
 * @param {ReactNode} [props.children] - Form contents.
 * @param {(event?: FormEvent<HTMLFormElement>) => void} [props.onSubmit] - Handler called on form submit.
 * @param {(event?: FormEvent<HTMLFormElement>) => void} [props.onReset] - Handler called on form reset.
 * @param {string} [props.className] - Optional custom CSS class.
 *
 * @returns {JSX.Element} A `<form>` element with default submit prevention.
 */
function C180Form({ children, onSubmit, onReset, ...props }: IProps): JSX.Element {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };


  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}
      onReset={onReset}
      {...props}
    >
      {children}
    </form>
  );
}



export { C180Form };
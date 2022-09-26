import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "..";

beforeEach(() => {
  render(<SignUp />);
});
test("input fields are initially empty", () => {
  const inputEmail = screen.getByRole("textbox");
  const inputPassword = screen.getByLabelText("Password");
  const inputConfirmPassword = screen.getByLabelText(/confirm Password/i);
  expect(inputEmail.value).toBe("");
  expect(inputPassword.value).toBe("");
  expect(inputConfirmPassword.value).toBe("");
});

test("user can type in email input", () => {
  const inputEmail = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(inputEmail, "jandoe@gmail.com");
  expect(inputEmail.value).toBe("jandoe@gmail.com");
});

test("user can type in password input", () => {
  const inputPassword = screen.getByLabelText("Password");
  userEvent.type(inputPassword, "password");
  expect(inputPassword.value).toBe("password");
});

test("user can type in confirm password input", () => {
  const inputConfirmPassword = screen.getByLabelText(/Confirm password/i);
  userEvent.type(inputConfirmPassword, "confirm-password");
  expect(inputConfirmPassword.value).toBe("confirm-password");
});

test("check that error displays for wrong input", () => {
  const inputEmail = screen.getByRole("textbox", { name: /email/i });
  const errorText = screen.queryByText(/please enter a valid email/i);
  expect(errorText).not.toBeInTheDocument();

  userEvent.type(inputEmail, "jandoe.com");

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  const newErrorText = screen.queryByText(/please enter a valid email/i);

  expect(newErrorText).toBeInTheDocument();
});

test("check password length is not less than 5", () => {
  const inputPassword = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  const inputEmail = screen.getByRole("textbox", { name: /email/i });

  userEvent.type(inputEmail, "jandoe@gma.com");
  const passwordErr = screen.queryByText(
    /password must contain 5 or more characters/i
  );
  expect(passwordErr).not.toBeInTheDocument();
  userEvent.type(inputPassword, "ente");
  userEvent.click(submitBtn);
  const newPasswordErr = screen.queryByText(
    /password must contain 5 or more characters/i
  );

  expect(newPasswordErr).toBeInTheDocument();
});


import getCurrentUser from "@/src/actions/getCurrentUser";
import SignUpForm from "@/src/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up | E-Shop',
  description: 'Sign in to your account'
}

const SignUp = async () => {
  const currentUser = await getCurrentUser();
  return (
    <SignUpForm currentUser={currentUser}/>
  )
}

export default SignUp;

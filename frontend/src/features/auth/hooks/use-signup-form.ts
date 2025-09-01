import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/core/services";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "@/store/auth";
// import authService from "@/services/api/auth-service";

const signupFormSchema = z
  .object({
    userName: z
      .string({ error: "First name is required" })
      .min(1, "First name is required"),
    email: z.email({ error: "Please enter a valid email address" }),
    phone: z
      .string({ error: "Phone number is required" })
      .min(1, "Phone number is required."),
    password: z
      .string()
      .min(8, "Password should be atleast 8 characters long."),
    confirmPassword: z.string().min(1, "Please re-enter the password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;

const useSignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormValues) => {
    const res = await authService.signup(data);

    if (res.success && res.data) {
      toast.success(res.message);
      const { token } = res.data;
      dispatch(authActions.setAuth({ token }));

      navigate("/");

      return;
    }

    toast.error(res.message || "Something went wrong, please try again later.");
  };

  return { form, onSubmit };
};

export default useSignupForm;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authService } from "@/core/services";
import { authActions } from "@/store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    const res = await authService.login(data);

    if (res.success && res.data) {
      toast.success(res.msg);
      const { token, role } = res.data;
      dispatch(authActions.setAuth({ token, role }));

      if (role === "admin") {
        navigate("/admin/products");
        return;
      }

      navigate("/");

      return;
    }

    toast.error(res.msg || "Something went wrong, please try again later.");
  };

  return { form, onSubmit };
};

export default useLoginForm;

import { authService, jwtService } from "@/core/services";
import React, { useEffect, useState } from "react";
import { authActions } from "@/store/auth";
import { useDispatch } from "react-redux";
import PageSpinner from "../components/ui/page-spinner";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = jwtService.getAccessToken();

    if (token) {
      authService
        .getUserDetailsByToken()
        .then((res) => {
          if (res) {
            dispatch(authActions.setUser({ user: res }));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return children;
};

export default AuthProvider;

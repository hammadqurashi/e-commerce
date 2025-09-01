import LoadingSpinner from "@/shared/components/ui/loading-spinner";
import { Button } from "@/shared/components/ui/button";

// import useGoogleAuth from "../hooks/useGoogleAuth";

const GoogleAuthBtn = ({ text = "Continue with Google" }) => {
  //   const { googleLogin, isGLogging } = useGoogleAuth();

  const googleLogin = () => {};
  const isGLogging = false;

  return (
    <Button
      variant="outline"
      disabled={isGLogging}
      className="w-full flex items-center justify-center gap-2 py-6 border-gray-200 hover:bg-gray-50 transition-colors"
      onClick={googleLogin}
    >
      {isGLogging ? (
        <LoadingSpinner size="sm" />
      ) : (
        <>
          <svg width={20} height={20} viewBox="0 0 20 20" className="mr-2">
            <g>
              <path
                fill="#4285F4"
                d="M18.64 10.2045c0-.6391-.0573-1.2527-.1645-1.837h-8.48v3.4815h4.8418a4.1377 4.1377 0 01-1.7991 2.7182l2.9138 2.2668c1.7026-1.5681 2.688-3.88 2.688-6.6295z"
              />
              <path
                fill="#34A853"
                d="M9.9991 19.0005c2.43 0 4.4682-.8062 5.9571-2.1906l-2.9138-2.2668c-.8084.54-1.8379.8577-3.0433.8577-2.3389 0-4.3197-1.5808-5.0311-3.7084H1.9344v2.3298A9.9972 9.9972 0 009.9991 19.0005z"
              />
              <path
                fill="#FBBC05"
                d="M4.968 11.6924A5.9776 5.9776 0 014.6049 10c0-.5857.1009-1.1512.2764-1.6924V5.9775H1.9344a9.9972 9.9972 0 000 8.0449l3.0336-2.3298z"
              />
              <path
                fill="#EA4335"
                d="M9.9991 4.0626c1.3234 0 2.5088.4551 3.4422 1.3472l2.5776-2.5776C14.4628 1.8099 12.4287 1 9.9991 1A9.9972 9.9972 0 001.9344 5.9775l3.0336 2.3298c.7114-2.1276 2.6922-3.7084 5.0311-3.7084z"
              />
            </g>
          </svg>
          {text}
        </>
      )}
    </Button>
  );
};

export default GoogleAuthBtn;

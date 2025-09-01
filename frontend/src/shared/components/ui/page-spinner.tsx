import LoadingSpinner from "./loading-spinner";

const PageSpinner = () => {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export default PageSpinner;

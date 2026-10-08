import { GoogleLogin } from "@react-oauth/google"

function GoogleAuthButton({
  onSuccess,
  onError,
  disabled = false,
}) {
  return (
    <div className="flex w-full justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={false}
        theme="filled_black"
        size="large"
        text="continue_with"
        shape="rectangular"
        disabled={disabled}
      />
    </div>
  )
}

export default GoogleAuthButton
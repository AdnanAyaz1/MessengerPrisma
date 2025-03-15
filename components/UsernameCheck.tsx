import { useEffect, useState } from "react";
import { UseFormReturn} from "react-hook-form";

import { api } from "@/lib/api";

interface UsernameCheckProps {
  form: UseFormReturn;
}

const UsernameCheck = ({ form }: UsernameCheckProps) => {
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(
    null
  );
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);

  const username = form.watch("username");

  useEffect(() => {
    if (!username) {
      setUsernameAvailable(null);
      form.clearErrors("username");
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const res = await api.auth.check_username(username as string);
        setUsernameAvailable(res.success);

        if (!res.success) {
          form.setError("username", {
            type: "manual",
            message: "This username is already taken",
          });
        } else {
          form.clearErrors("username");
        }
      } catch (error) {
        console.log(error);
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username, form]);

  return (
    <div className="mt-1">
      {checkingUsername ? (
        <p className="text-blue-400 text-sm">Checking...</p>
      ) : usernameAvailable ? (
        <p className="text-green-500 text-sm">
          Username {username as string} is available
        </p>
      ) : null}
    </div>
  );
};

export default UsernameCheck;

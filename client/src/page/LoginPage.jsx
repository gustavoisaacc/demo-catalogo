import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";

import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Label from "../components/ui/Label";
import MessageError from "../components/MessageError";

export default function LoginPage() {
  const { signin, errors: errorLogin, isAuth } = useAuth();

  const navegate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => await signin(data));

  useEffect(() => {
    if (isAuth) {
      navegate("/dashboard");
    }
  }, [isAuth]);

  return (
    <Container>
      <Card>
        {Array.isArray(errorLogin) ? (
          errorLogin.map((error, index) => (
            <MessageError key={index} props={error} />
          ))
        ) : (
          <MessageError props={errorLogin} />
        )}

        <h2 className=" mb-6 text-center text-2xl font-bold">Inisiar Sesion</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label name="Email" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "El campo es obligatorio",
              })}
            />
            {errors.email && <MessageError props={errors.email.message} />}
          </div>
          <div className="mb-4">
            <Label name="Contraseña" />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: "El campo es obligatorio" })}
            />
            {errors.password && (
              <MessageError props={errors.password.message} />
            )}
          </div>
          <Button className="bg-secondary hover:bg-secondaryDarck text-white mr-2 w-full">
            Inisiar Sesion
          </Button>
        </form>
      </Card>
    </Container>
  );
}

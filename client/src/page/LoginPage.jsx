import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Label from "../components/ui/Label";
import { useAuth } from "../context";
import MessageError from "../components/MessageError";

export default function LoginPage() {
  const { signin, errors: errorLogin } = useAuth();
  console.log(errorLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signin(data);
    console.log(res);
  });
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
          <Button>Inisiar Sesion</Button>
        </form>
      </Card>
    </Container>
  );
}

import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Label from "../components/ui/Label";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Container>
      <Card>
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
          </div>
          <div className="mb-4">
            <Label name="Contraseña" />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <Button>Inisiar Sesion</Button>
        </form>
      </Card>
    </Container>
  );
}

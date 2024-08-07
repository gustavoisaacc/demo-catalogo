import { Button } from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

export default function RegisterPage() {
  return (
    <Container>
      <Card>
        <h2 className=" mb-6 text-center text-2xl font-bold">
          Crear un nuevo usuario
        </h2>
        <form>
          <div className="mb-4">
            <Label name="Nombre de usuario" />
            <Input type="test" placeholder="Nombre de usuario" />
          </div>
          <div className="mb-4">
            <Label name="Email" />
            <Input type="email" placeholder="Email" />
          </div>
          <div className="mb-4">
            <Label name="Contraseña" />
            <Input type="password" placeholder="Contraseña" />
          </div>
          <Button className="bg-secondary hover:bg-secondaryDarck text-white mr-2 w-full">
            Registrarse
          </Button>
        </form>
      </Card>
    </Container>
  );
}

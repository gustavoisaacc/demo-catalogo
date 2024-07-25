import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

export default function LoginPage() {
  return (
    <Container>
      <Card>
        <h2 className=" mb-6 text-center text-2xl font-bold">Inisiar Sesion</h2>
        <form>
          <div className="mb-4">
            <Label name="Email" />
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <Label name="Contraseña" />
            <Input type="password" placeholder="Enter your password" />
          </div>
          <Button>Inisiar Sesion</Button>
        </form>
      </Card>
    </Container>
  );
}

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ForgotPasswordProps {
  email: string;
  firstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ForgotPassword = (props: ForgotPasswordProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Réinitialisez votre mot de passe</Preview>
        <Body className="bg-gray-100 py-2">
          <Container className="border border-gray-200 bg-white p-12">
            <Img
              src={`${baseUrl}/vercel.svg`}
              width="50"
              height="50"
              alt="app logo"
            />
            <Section>
              <Text className="text-lg font-light leading-7 text-gray-600">
                Bonjour {props.firstname},
              </Text>
              <Text className="text-lg font-light leading-7 text-gray-600">
                Quelqu'un a récemment demandé un changement de mot de passe pour
                votre compte. Si c'était vous, vous pouvez définir un nouveau
                mot de passe ici :
              </Text>
              <Button
                className="my-2 block w-52 rounded bg-[#E11C49] py-3 text-center font-sans text-sm text-white"
                href={props.resetPasswordLink}
              >
                Réinitialiser le mot de passe
              </Button>
              <Text className="text-lg font-light leading-7 text-gray-600">
                Si vous ne souhaitez pas changer votre mot de passe ou ne l'avez
                pas fait demandez-le, ignorez et supprimez simplement ce
                message.
              </Text>
              <Text className="text-lg font-light leading-7 text-gray-600">
                Pour assurer la sécurité de votre compte, veuillez ne
                transmettre cet e-mail à personne. Consultez notre centre d'aide
                pour{" "}
                <Link className="underline" href="https://dropbox.com">
                  plus de conseils de sécurité.
                </Link>
              </Text>
              <Text className="text-lg font-light leading-7 text-gray-600">
                Happy Dropboxing!
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ForgotPassword.PreviewProps = {
  firstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
  email: "email@dropbox.com",
} as ForgotPasswordProps;

export default ForgotPassword;

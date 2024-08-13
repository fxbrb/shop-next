import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ContactProps {
  firstname?: string;
  lastname?: string;
  email?: string;
  message?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const Contact = (props: ContactProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Log in with this magic link.</Preview>
      <Body className="bg-white font-sans">
        <Container
          className="mx-auto bg-bottom bg-no-repeat p-6"
          style={{ backgroundImage: 'url("/assets/raycast-bg.png")' }}
        >
          <Img
            src={`${baseUrl}/static/raycast-logo.png`}
            width={48}
            height={48}
            alt="Raycast"
            className="size-12"
          />
          <Heading className="mt-12 text-4xl font-bold">
            🪄 Your magic link
          </Heading>
          <Section className="my-6">
            <Text className="text-lg leading-7">
              <Link className="text-red-500" href={""}>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text className="text-lg leading-7">
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text className="text-lg leading-7">
            Best,
            <br />- Raycast Team
          </Text>
          <Hr className="mt-12 border-gray-300" />
          <Img
            src={`${baseUrl}/static/raycast-logo.png`}
            width={32}
            height={32}
            className="mx-auto my-5 size-8 grayscale"
          />
          <Text className="ml-1 text-sm text-gray-500">
            Raycast Technologies Inc.
          </Text>
          <Text className="ml-1 text-sm text-gray-500">
            2093 Philadelphia Pike #3222, Claymont, DE 19703
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default Contact;

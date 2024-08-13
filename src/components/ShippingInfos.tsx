import { Mail, Package, Shield } from "lucide-react";
import { Section } from "./Section";

export const ShippingInfos = () => {
  const incentives = [
    {
      name: "Lorem ipsum",
      icon: <Package className="mx-auto size-16 stroke-foreground" />,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Lorem ipsum",
      icon: <Shield className="mx-auto size-16 stroke-foreground" />,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Une question ?",
      icon: <Mail className="mx-auto size-16 stroke-foreground" />,

      description: "mariebarbier3896@neuf.fr",
    },
  ];

  return (
    <Section>
      <div className="rounded-2xl bg-accent px-6 py-16 sm:p-16">
        <div className="mx-auto max-w-xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Infos</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div
                key={incentive.name}
                className="text-center sm:flex sm:text-left lg:block lg:text-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    {/* <img
                      className="mx-auto h-16 w-16"
                      src={incentive.icon}
                      alt=""
                    /> */}
                    {incentive.icon}
                  </div>
                </div>
                <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium ">{incentive.name}</h3>
                  <p className="mt-2 text-sm ">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
